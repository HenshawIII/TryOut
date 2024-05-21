import { MongoClient,ServerApiVersion} from "mongodb";
import dotenv from "dotenv"
import app from "./server.js"
import MoviesDao from "./MoviesDAO.js";
import UsersDao from "./UsersDao.js";

dotenv.config()
const URI = "mongodb+srv://henshawImmanuel:EkC96yNB4mlDLL94@cluster0.oipnzfc.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0"
MongoClient.connect(URI,{
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  })
.then( async (client)=>{
     await MoviesDao.injectDB(client)
     await UsersDao.injectDB(client)
    app.listen(3200,()=>console.log("app running"))
})
.catch((e)=>{
    console.log(e)
    process.exit(1)
})
