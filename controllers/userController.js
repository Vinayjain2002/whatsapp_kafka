import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs'

export const register= async(req, res)=>{
    try{
        const {firstName, lastName, email, password}= req.body;
        const existingUser = await User.findOne({"email": email})
        if(existingUser){
            return res.status(400).json({"error": "User already exists"})
        }

        const fullName= firstName+" "+ lastName;
        const newUser= new User({email: email, password: password,name: fullName})
        const token = await newUser.generateAuthToken();
        await newUser.save();
        return res.json({"message": "Success", token: token})
    }
    catch(err){
        console.log("Error in register User", err);
    }
}

export const login= async(req,res)=>{
    try{
        const {email, password}= req.body;

        const valid= await User.findOne({email: email})
        if(!valid){
            return res.status(200).json({"message": "User does not exists"})
        }
        // compairing the password of the user with the stored in the database
        const validPassword= await bcryptjs.compare(password, valid.password)
        if(!validPassword){
            return res.status(200).json({"message": "Invalid Credentials"})
        }
        const token= await valid.generateAuthToken();
        await valid.save();

        res.cookie('userToken', token, {
            httpOnly: true,
            maxAge: 24*60*60*1000
        });
        return res.status(200).json({"message": "User Login Successfully", token: token});
    }
    catch(err){
        return res.status(500).json({"message": err})
    }
}

export const validUser= async (req,res)=>{
    try{
        const validUser= await User.findOne({
            _id: req.rootUserId
        })

        if(!validUser){
            res.json({"message": "User is not valid"});
        }
        res.status(201).json({"user": validUser, token: req.token});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({"message": "Internal Server Error"})
    }
}

export const logout= async(req,res)=>{
    try{
        // removing the user token from the list of the tokens the user have
        req.rootUser.tokens= req.rootUser.tokens.filter((e)=>{
            e.token != req.token
        });
        return res.status(200).json({"message": "user logout Successfully"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({"message": "Internal Server Error"});
    }
}

export const searchUser= async(req,res,next)=>{
    try{
        const search= req.query.search ? {
            $or: [
                {name: {$regex: req.query.search, $options: 'i'}},
                {email: {$regex: req.query.search, $options: 'i'}}
            ]
        } : {}
        // finding all the users except the user itself
        const users= await User.find(search).find({_id: {$ne: req.rootUserId}});
        return res.status(200).json({"message": "Users fetched Successfully", "data": users})
    }
    catch(err){
        return res.status(500).json({"message": "Internal Server Error"});
    }
}

export const getUserById= async(req,res)=>{
    try{
        const {id}= req.params;

        const selectedUser= await User.findOne({_id: id}).select('-password')
        return res.status(200).json({"message": "Details fetched Successfully"});
    }
    catch(err){
        return res.status(500).json({"message": "Internal Server Error"});
    }
}

export const updateInfo = async(req,res,next)=>{
    try{    
        const {id}= req.params;
        const {bio, name}= req.body;

        const updatedUser= await User.findByIdAndUpdate(id, {name: name, "bio": bio});
        return res.status(200).json({"message": "Data Updated Successfully", "data": updatedUser})
    }catch(err){
        return res.status(500).json({"message": "Internal Server Error"});
    }
}