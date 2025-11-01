import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import connectDB from "./db/index.js";
import { app } from "./app.js";

// Connect to database and start server
connectDB()
  .then(() => {
    console.log("Database connected successfully");
    
    // Start server (for Render, Railway, etc.)
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo DB connection failed ", err);
    process.exit(1);
  });

// Export for Vercel serverless
export default app;

  
 
