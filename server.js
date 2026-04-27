import express from "express";
import statesRoute from "./routes/states.js"
import contactRoute from "./routes/contact.js";
const app=express()
const PORT=process.env.PORT ||3000;

app.use(express.json());
app.use(express.static(
    "public"
));
app.use("/states",statesRoute);
app.use("/contact", contactRoute);
app.use((err,req,res,next)=>{
    res.status(500).json({
        success:false,
        message:"Something went wrong"
    })
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})