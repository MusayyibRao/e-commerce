import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { trasport } from '../middleware/verify_mail/sendMail.js';
import { hmacProcess } from '../utils/hashing.js';


const userRegister = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        console.log(password);

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists !' });
        let hashPass = await bcrypt.hash(password, 10);
        console.log(hashPass);
        const createNewUser = { name, email, 'password': hashPass, role };
        const createUser = await User.create(createNewUser);
        res.status(200).json({ createUser });
    }
    catch (err) {
        console.log(err);

    }
}




const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    }
    catch (err) {
        console.log(err);

    }

}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);
        console.log(deletedUser);

        if (deletedUser) {
            res.status(200).json('User deleted !');
        }
        else {
            res.status(404).json({ message: 'User not found!' })
        }
    }
    catch (err) {
        console.log(err);

    }
}


const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const accessToken = jwt.sign(
                { id: user._id, role: user.role },
                process.env.ACCESS_TOCKEN_SECRET,
                { expiresIn: '1h' }
            );
            //  const refreshToken = jwt.sign(
            //     {id:user._id,role:user.role},
            //     process.env.REFRESH_TOCKEN_SECRET,
            //     {expiresIn: '1d'}
            //  );
            res.status(200).cookie("accessToken", accessToken, { httpOnly: true, secure: true,}).json({ accessToken })
        }
        else {
            return res.status(401).json({ message: 'invalid password' });

        }
    }
    catch (err) {
        console.log(err);

    }

}

const passwordChange = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        console.log("user.id:", req.user.id);

        if (!oldPassword || !newPassword) return res.status(400).json({ message: 'Please enter old and new password' })
        const user = await User.findById(req.user.id);
        console.log("user ", user);

        if (!user) return res.status(404).json({ message: 'user not found' });
        const matchPassword = await bcrypt.compare(oldPassword, user.password);
        if (!matchPassword) return res.status(400).json({ message: 'Please enter correct old password' });

        user.password = await bcrypt.hash(newPassword, 10);
        const updatePass = await user.save();
        return res.status(200).json({ message: 'Password changed successfully !' })
    }
    catch (err) {
        console.log(err);

    }
}
const logout =  (req, res) => {
     res.clearCookie("accessToken");
    return res.status(200).json('user logout successfully!')
}


const sendVerficationCode = async(req,res)=>{

    const {email} =req.body;
    
    try{
       const existUser = await User.findOne({email});
       console.log(existUser);
       if(!existUser) return res.status(404).json({message:'User not found!!'});
       if(existUser.verified) return res.status(400).json({message:'User already verified!!'});
       const generateCode = Math.floor(Math.random()*1000000).toString();
       console.log(generateCode);
       
       const info = await trasport.sendMail({
        from: process.env.NODE_EMAIL,
        to: existUser.email,
        subject:'email verfication code',
        html:'<h1>'+generateCode+'</h1>'
       })
       console.log("info---:"+info);
       
       if(info.accepted[0]=== existUser.email)
       {
        const hashCodeValue = hmacProcess(
            generateCode,
            process.env.HMAC_VERIFICATION_CODE
        );

        console.log(hashCodeValue);
        
       existUser.verificationCode,
       existUser.verificationCodeValidation  =Date.now();
       await existUser.save();
       return res.status(200).json({message:'Verification code sent your email!!'})
    }
       return res.status(400).json({message:'please check try again!!'});
    }
    catch(err){
        console.log(err);
        
    }

}

export { userRegister, loginUser, deleteUser, logout, getAllUsers, passwordChange,sendVerficationCode };