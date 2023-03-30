import bcrypt from 'bcrypt';

import User from "../model/user.js";

export const signupUser = async(request,response) => {
    try{

        // const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(request.body.Password , 10);

        const user = { Username: request.body.Username, Name: request.body.Name, Password: hashedPassword } 
        // const user = request.body;

        const newUser = new User(user);

        await newUser.save();
        console.log('Data is saved in database');

        return response.status(200).json({msg : 'signup successful' });
    }
     catch (error) {
        console.log("Entry not saved in database");
        console.error('Save error:', error);
        return response.status(500).json({ msg : 'Error while signup the user' });
    }
}

