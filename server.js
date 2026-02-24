import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routers/foodRoutes.js';


// app config
const app = express();
const port = 4000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// db conection
connectDB();

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))

app.get("/",(req,res)=> {
    res.send("API WORKING");
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})


