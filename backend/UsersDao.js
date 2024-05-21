const URI = "mongodb+srv://henshawImmanuel:EkC96yNB4mlDLL94@cluster0.oipnzfc.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0"
let Users 

export default class UsersDao{
    static async injectDB(conn){
        if(Users){
            return
        }try {
          Users =   await conn.db("sample_mflix").collection("User")  
        } catch (error) {
           console.error(`Unable to establish a connection ${error}`) 
        }

    }

    static async Register(name,email,password){

        try {
        const user = await Users.insertOne({name,email,password})
        console.log(user)
         return "User added"
        } catch (error) {
            console.log(error)
        }
    }
    static async findUser(email){
       
       
        try {
            const mail =  await Users.findOne({email})
            console.log(mail)
            if(!mail){
                return {fine:"Go ahead"}
            }else{
                return {error:"No",password:mail.password}
            }
        } catch (error) {
            console.log(error)
            return {error:error.message}
        }
    }
}