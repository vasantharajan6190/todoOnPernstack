const express = require("express");
const app = express();
const cors = require("cors");
const path=require("path");
const port = process.env.PORT || 5000
//middleware

app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"client/build")))
}


//routes

app.use("/authentication", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"client/build/index.html"))
}) 

app.listen(port, () => {
  console.log(`Server is starting on port ${port}`);
});
