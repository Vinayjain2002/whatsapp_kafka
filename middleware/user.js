
const jwt= require('jsonwebtoken')
const User= require('../models/userModel')

export const Auth= async(req, res, next)=>{
    try{
        let token = req.headers.authorization.split(' ')[0];

        if(token.length < 500){
            const verifiedUser= jwt.verify(token, process.env.SECRET);
            const rootUser= await User.findOne({
                _id: verifiedUser.id
            }).select('-password');

            req.token= token;
            req.rootUser= rootUser;
            req.rootUserId= rootUser._id;
        }
        else{
            let data= jwt.decode(token);
            req.rootUserEmail= data.email;
            const googleUser= await User.findOne({email: req.rootUserEmail}).select('-password');
            req.rootUser= googleUser;
            req.token= token;
            req.rootUserId= googleUser._id;
        }
        next();
    }
    catch(err){
        res.json({error: 'Invalid Token'});
    }
}