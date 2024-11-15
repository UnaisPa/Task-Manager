import express from "express";
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import session, { MemoryStore } from "express-session";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
 import userRoutes from "./routes/userRoutes.js"
 import taskRoutes from "./routes/taskRoutes.js"
// import postRoutes from "./adapters/routes/postRoutes.js";
// import adminRoutes from "./adapters/routes/adminRoutes.js";
// import portfolioRoutes from "./adapters/routes/portfolioRoutes.js";
// import chatRoutes from "./adapters/routes/chatRoutes.js";


import http from "http";

const app = express();
const port = process.env.PORT || 3000;

// Create an HTTP server
const server = http.createServer(app);

// Connect to the database
connectDB();


// Middleware 
app.use(cors({
    origin: ['https://paperpro.site',"http://localhost:5173"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: new MemoryStore(),
    resave: false,
    saveUninitialized: true,
}));

// Routes
app.use('/api/users', userRoutes); 
app.use('/api/tasks',taskRoutes)
// app.use('/api/post', postRoutes(dependencies));
// app.use('/api/admin', adminRoutes(dependencies));
// app.use('/api/portfolio', portfolioRoutes(dependencies));
// app.use('/api/chat', chatRoutes(dependencies));

// Error handler middlewares
app.use(notFound);
app.use(errorHandler);


// Start the server
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
