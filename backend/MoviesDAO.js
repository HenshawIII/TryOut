const URI = "mongodb+srv://henshawImmanuel:<password>@cluster0.oipnzfc.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0"
let movies 

export default class MoviesDao{
    static async injectDB(conn){
        if(movies){
            return
        }try {
          movies =   await conn.db("sample_mflix").collection("movies")  
        } catch (error) {
           console.error(`Unable to establish a connection ${error}`) 
        }

    }

    static async getMovies(){
        let cursor 
        try {
            cursor = await movies.find({})
        } catch (error) {
            console.error(error)
            return "Cannot get movies at this time"
        }
        const dcur = cursor.limit(3)
        try {
            const List = await dcur.toArray()
            const Total = await movies.countDocuments({})
            return {List,Total}
        } catch (error) {
            console.error(error)
        }
    }

   
}
