import mongoose from "mongoose";

const Connection = async () => {
    const URL = "mongodb+srv://fuse:6096@cluster0.dt8hugi.mongodb.net/bloggo?retryWrites=true&w=majority";

    try {
        await mongoose.connect(URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while connecting to the database", error);
    }
};

export default Connection;