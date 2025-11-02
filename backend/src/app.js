// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import session from "express-session";
// import MongoStore from "connect-mongo";

// const app = express();

// //some of the major configurations done in express
// //configurations are done using app.use()

// //for cors
// //it says from which all ports/sites the request should be accepted
// const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like mobile apps or curl requests)
//       if (!origin) return callback(null, true);
      
//       if (allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true,
//   })
// );

// //the below line limits the incoming data in json format to only be a max of 16 bytes
// //applies only if the data is in json format
// app.use(express.json({ limit: "512kb" }));

// //this line indicates express to read and understand the data
// //submitted from the form
// // extended:true indicates to read the nested data like
// //{ user: { name: "Sumanth", age: "21" } }
// //limit is user for limiting the maximum size of the incoming data
// app.use(express.urlencoded({ extended: true, limit: "512kb" }));

// app.use(express.static("public"));

// //cookie-parser
// //it lets the express app to read and understand the cookies coming along with the data or user requests
// app.use(cookieParser());



// app.use(
//     session({
//         name: 'roam.sid',
//         secret: process.env.SESSION_SECRET,
//         resave: false,
//         saveUninitialized: true,
//         store: MongoStore.create({
//             mongoUrl: process.env.MONGODB_URI,
//             collectionName: 'sessions',
//             ttl: 15 * 60, // 15 minutes in seconds
//         }),
//         cookie: {
//             maxAge: 15 * 60 * 1000, // 15 minutes
//             httpOnly: true,
//             secure: true, // Always true for HTTPS
//             sameSite: "None" // Required for cross-origin cookies
//         }
//     })
// )



// //routes import

// import userRouter from './routes/user.routes.js'

// //routes declaration
// app.use("/api/v1/users",userRouter)
// //   https://localhost:8000/api/v1/users/ register or login it will depend on userRouter


// import tripRouter from './routes/trip.routes.js'

// app.use("/api/v1/trips",tripRouter)




// import { ApiError } from './utils/ApiError.js';

// app.use((err, req, res, next) => {
//   // If the error is an instance of our custom ApiError, use its properties
//   if (err instanceof ApiError) {
//     return res.status(err.statusCode).json({
//       success: false,
//       message: err.message,
//       errors: err.errors,
//       data: null
//     });
//   }

//   // For any other kind of error, return a generic 500 server error
//   console.error(err); // Log the unexpected error to the console for debugging
//   return res.status(500).json({
//     success: false,
//     message: 'Internal Server Error',
//   });
// });




// export { app };






import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();

// Determine if we're in production
const isProduction = process.env.NODE_ENV === 'production';

// CORS Configuration
const allowedOrigins = process.env.CORS_ORIGIN?.split(',').map(origin => origin.trim()) || ['http://localhost:5173'];

console.log('Allowed CORS Origins:', allowedOrigins);
console.log('Environment:', isProduction ? 'Production' : 'Development');

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman, or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log('CORS blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  })
);

// Handle preflight requests
// app.options('*', cors());

// Body parsers
app.use(express.json({ limit: "512kb" }));
app.use(express.urlencoded({ extended: true, limit: "512kb" }));
app.use(express.static("public"));

// Cookie parser - must be before session middleware
app.use(cookieParser());

// Session Configuration
app.use(
  session({
    name: 'roam.sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // Don't create session until something is stored
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: 'sessions',
      ttl: 15 * 60, // 15 minutes in seconds
      touchAfter: 24 * 3600, // Lazy session update
    }),
    cookie: {
      maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
      httpOnly: true,
      secure: isProduction, // true only in production (HTTPS)
      sameSite: isProduction ? "none" : "lax", // "none" for cross-origin in production
      path: '/',
    },
    proxy: isProduction, // Trust first proxy in production
    rolling: true, // Reset maxAge on every request
  })
);

// Debug middleware - helps track session issues (remove in production after testing)
app.use((req, res, next) => {
  console.log('--- Incoming Request ---');
  console.log('URL:', req.method, req.url);
  console.log('Origin:', req.get('origin'));
  console.log('Session ID:', req.session?.id);
  console.log('Cookies:', req.cookies);
  console.log('Session Data:', req.session?.registrationData ? 'Present' : 'None');
  console.log('----------------------');
  next();
});

// Routes import
import userRouter from './routes/user.routes.js';
import tripRouter from './routes/trip.routes.js';
import { ApiError } from './utils/ApiError.js';

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/trips", tripRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    environment: isProduction ? 'production' : 'development',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  // If the error is an instance of our custom ApiError, use its properties
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
      data: null
    });
  }

  // For any other kind of error, return a generic 500 server error
  console.error('Unhandled Error:', err);
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: isProduction ? undefined : err.message, // Only show error details in development
  });
});

export { app };