const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const register = async(req, res)=>{
    try {
        const {username,email, password, role} = req.body;
        const checkExistingUser = await User.findOne({$or: [{username}, {email}]});
        if(checkExistingUser){
            return res.status(400).json({
                success:false,
                message:'username or email already in use, please use different username or email'
            })
        }
        else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newlyCreatedUser = await User.create({
                username,
                email,
                password:hashedPassword,
                role: role || 'user'
            });
            if(newlyCreatedUser){
                return res.status(201).json({
                    success:true,
                    message:'registered new user successfully.'
                })
            }
            else{
                return res.status(400).json({
                    success:false,
                    message:'failed to register user, make sure data was entered in correct format'
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'something went wrong. Please try again later.'
        });
    }
};

const login = async(req, res)=>{
    try {
       const {username, password} = req.body;
       const user = await User.findOne({username});
       if(!user){
        return res.status(400).json({
            success:false,
            message:'could not find the requested user'
        })
       }   
       const isCorrectPassword = await bcrypt.compare(password, user.password);
       if(!isCorrectPassword){
             return res.status(400).json({
                success:false,
                message: 'Invalid credentials, Please try again with correct credentials.'
             })        
       }
       
       const accessToken = jwt.sign({
        userId : user._id,
        username: user.username,
        role: user.role
       }, process.env.JWT_SECRET_KEY, {expiresIn: '15m'});
       
       if(accessToken){
        return res.status(200).json({
            success: true,
            message: 'login successfully',
            accessToken
        })
       }
       return res.status(400).json({
        success:false,
        message:'error in generating token'
       })
       
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'something went wrong. Please try again later.'
        });
    }
};

module.exports ={register, login}