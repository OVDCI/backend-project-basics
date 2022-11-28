import  express  from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoute from "./routes/userRoute.js"



dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES

app.use("/users", userRoute);

//GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

app.get('/',(req,res)=>{
    res.send("Hello world");
})

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`)
.then( ()=>{
    console.log(`Database connected`);
})
.catch(err =>{
    console.log(err);
});
app.listen(PORT,()=>{
    console.log(`listening to ${PORT}  port`);
})