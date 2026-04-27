import express from "express";
import statesRoute from "./routes/states.js"
const app=express()
const PORT=process.env.PORT || 0;

app.use(express.json());
app.use(express.static(
    "public"
));
app.use("/states",statesRoute);

app.use((err,req,res,next)=>{
    res.status(500).json({
        success:false,
        message:"Something went wrong"
    })
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})