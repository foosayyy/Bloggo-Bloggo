import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    Username : {
        type : String,
        required : true,
        unique : true
    },
    Password : {
        type : String,
        required : true
    }
})

//it is the collection name. It can be seen in mongoDB 

const user = mongoose.model('Krishanu', userSchema);

export default user;