


// server/app.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import session from 'express-session';
import donateRoutes from './routes/donateRequestRoute.js';

// import other routes...

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({
  origin: 'https://nextplayinternshipclient.onrender.com',
  credentials: true,
}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
  },
}));




app.use('/donate', donateRoutes);
// Add the rest of your routes here...



export default app;