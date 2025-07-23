import {app} from'./app.js';
import Database_Connection from'./config/db/Db_Connection.js';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
})

 const PORT = process.env.PORT 
 const database_Url = process.env.DATABASE_URL


Database_Connection(database_Url)
.then(()=>{

    app.on("Error",(err)=>{
        throw err;
    })
    app.listen(PORT,()=>{
        console.log(`Server running on port: ${PORT}`);
        
    })
})
.catch((err)=>{
    console.log('connection failed...',err);
    
})