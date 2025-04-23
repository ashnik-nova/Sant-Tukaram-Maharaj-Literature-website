import connectDB from './src/db/index.js';
import { app } from './src/app.js';
import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
})
const port = `${process.env.PORT}` || 4000

connectDB()
    .then(() => { app.listen(port, () => console.log(`⚙️ Server is running at port: ${port}`)) })
    .catch((err) => {
        console.log("MongoDB connection failed with: ", err);
    })

