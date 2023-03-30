import mongoose from "mongoose"

const Connection = async (username , password) => {
    const URL = `mongodb://${username}:${password}@ac-gvdak6h-shard-00-00.jbxjv82.mongodb.net:27017,ac-gvdak6h-shard-00-01.jbxjv82.mongodb.net:27017,ac-gvdak6h-shard-00-02.jbxjv82.mongodb.net:27017/?ssl=true&replicaSet=atlas-9lt4x9-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
        mongoose.connect(URL , {useNewUrlParser : true});
        console.log(`Database connected successfully`);
    } catch (error) {
        console.log(`Error while connecting to the database`, error);
    }   
}
export default Connection;