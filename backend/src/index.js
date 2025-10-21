import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import connectDB from "./db/index.js";
import { app } from "./app.js";

// app.get("/",(req,res)=>{
//     res.send("Hey")
// })

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo DB connection failed ", error);
  });

  
 
