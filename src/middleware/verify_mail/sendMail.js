import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
})

const trasport = nodemailer.createTransport({

    service:'gmail',
    auth:{
        user:process.env.NODE_EMAIL,
        pass:process.env.NODE_EMAIL_PASSWORD
    }
})


export {trasport};