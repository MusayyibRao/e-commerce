import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
})


const verifyJwt = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    
    if(!authHeader) return res.sendStatus(401);
    console.log(authHeader);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOCKEN_SECRET,
        (err,decoded)=>{
            if(err) return res.sendStatus(403); 
            req.email =decoded.email;
            next();
        }
    )
    
}


export default verifyJwt;