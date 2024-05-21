import express from "express";
import cors from "cors";
import MoviesDao from "./MoviesDAO.js";
import UsersDao from "./UsersDao.js";
import { hashPassword,comparePass } from "./auth.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"

const app = express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))



app.get("/",async (req,res)=>{
    const {List,Total} = await MoviesDao.getMovies()
    res.status(200).json({List,Total})
})



app.post("/register",async (req,res)=>{
    let {name,email,password} =  req.body
    if(!name){
        return res.json({
            error:"Kindly enter name"
        })
    }
    if(!password || password.length < 6){
        return res.json({
            error:"Kindly use a password that is more than 6"
        })
    }
    const exist = await UsersDao.findUser(email)
    if(exist.error){
        return res.json({
            error:"Mail is already taken"
        })
    }
    password = await hashPassword(password)
    const result =  await UsersDao.Register(name,email,password)

    return res.json({result})

})



app.post("/login",async (req,res)=>{

    try {
        const {name,email,password} = req.body;
        const exist = await UsersDao.findUser(email)
        if(!exist.error){
            return res.json({
                error:"No user found"
            })
        }

        const match = await comparePass(password,exist.password)
        if(match){
            jwt.sign({email,password:exist.password},"MySecret",{expiresIn:"1h"},(err,token)=>{
                    if(err)throw err;
                   return res.cookie("token2",token,{httpOnly:true,maxAge:3000000}).json({success:"User logged in"})
            })
            //  return   res.json({success:"passwords match"})
        }else{
            return res.json({error:"Passwords do not match"})
        }
    } catch (error) {
        console.log(error)
    }
})



app.get("/profile",(req,res)=>{
    const {token2} = req.cookies
    if(token2){
        jwt.verify(token2,"MySecret",{},(err,user)=>{
            if(err) throw err;
            res.json(user)
        })
    }else{
        res.json(null)
    }
})


    
app.use("*",(req,res)=>{
    res.status(404).send({error:"not found"})
})

export default app