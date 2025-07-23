import express from'express';
import userRouter from './routes/User_router.js';


const app =express();


app.use(express.json());
app.use(express.urlencoded());


app.use("/e-commerce/v1",userRouter);


export {app};
