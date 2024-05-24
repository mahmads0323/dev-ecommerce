import { Request, Response } from "express"
import GenerateHash from "../../utils/password/generateHash";
import USER from "../../models/user";
import GenerateToken from "../../utils/authentication/generateToken";

const PostUser = async(req:Request, res: Response)=>{
    const userDetails = req.body.userDetails;
    if(!userDetails){
        return res.json({message: "error: body do not contain userDetails"})
    }
    const {hash, salt} = GenerateHash(userDetails.password);
    try{
        const createdUser = await USER.create({
            name: userDetails.name,
            email: userDetails.email,
            role: ["user"],
            hash: hash,
            salt: salt
        })
        const token = GenerateToken({name: createdUser.name, userId: createdUser._id.toString(), role: createdUser.role})
        return res.json({message: token});
    }
    catch(err){
        return res.json({message: "error: in creating user " + err});
    }
}

export default PostUser;