import mongoose from 'mongoose';

const Database_Connection = async (DATABASE_URL) => {

    try {
      const  DATABASE_OPTION = {
            dbName: 'ecommerce'
        }
        await mongoose.connect(DATABASE_URL, DATABASE_OPTION)
            .then(() => {
                console.log('Database connected !');
            })

    }
    catch (err) {
        console.log(err);

    }
}


export default Database_Connection;