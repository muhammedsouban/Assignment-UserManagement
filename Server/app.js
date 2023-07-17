import express from "express";
import cors from 'cors'
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import Route from "./routes/Route.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT
const mongoUrl = process.env.MONGO_URL

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB!');
}).catch((err) => {
  console.log('Failed to connect to MongoDB:', err);
});
mongoose.set('strictQuery', true);


const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public/images',express.static('public/images'));

app.get('/', (req, res) => {
    res.status(201).json("Home GET Request")
})

app.use('/',Route)

app.listen(port, () => [
    console.log(`server connected to http://localhost:${port}`)
])
