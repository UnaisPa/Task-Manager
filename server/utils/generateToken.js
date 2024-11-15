import  jwt  from "jsonwebtoken";
import  ObjectId  from "mongoose";
export const generateToken = async (userId) =>{
    try {
        //console.log(userId);
        const token = jwt.sign({ userId }, process.env.JWT_SECRET,{
            expiresIn:'30d'
        })
        //console.log('Token generated successfully',token);

        if (token) {
            return token
        }

        //console.log('kiu')
    } catch (error) {
        console.error('Error generating token:', error);
    }
} 

