

import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';


import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { Server } from 'socket.io';
import http from 'http';
import session from 'express-session';


import connectMongoDB from './configuration/mongodb.js';


import eventRegisterRoutes from './routes/eventRoute.js';
import contactInquiriesRoutes from './routes/contactRoute.js';
import adminLoginRoutes from './routes/adminLoginRoute.js';
import adminLogoutRoutes from './routes/adminLogoutRoute.js';
import adminAuthenticationRoutes from './routes/adminAuthRoute.js';
import adminRecoveryLogin from './routes/adminLostEmailRoute.js';
import calendarEventRoutes from './routes/calendarEventsRoute.js';
import volunteerRoutes from './routes/volunteerRoute.js';
import donateRoutes from './routes/donateRequestRoute.js';


import adminErrorLogDataRoutes from './errorLogData/adminErrorLog.js';
import adminDashboardErrorLogDataRoutes from './errorLogData/adminDashboardErrorLog.js';
import donateErrorRoutes from './errorLogData/donateNextPlayErrorLog.js';
import eventRegisterErrorRoutes from './errorLogData/eventRegisterErrorLog.js';
import inquiryErrorRoutes from './errorLogData/generalInquiriesErrorLog.js';
import adminLoginRecoveryErrorRoutes from './errorLogData/adminEmailRecoverErrorLog.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});




app.use(cookieParser());
app.use(express.json());
app.use(helmet());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, 
    httpOnly: true,
    sameSite: 'lax',
  },
}));




app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));




connectMongoDB();


app.locals.io = io;





io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('calendarChange', () => {
    io.emit('calendarChange');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});





app.use('/', adminErrorLogDataRoutes);
app.use('/', adminDashboardErrorLogDataRoutes);
app.use('/', donateErrorRoutes);
app.use('/', eventRegisterErrorRoutes);
app.use('/', inquiryErrorRoutes);
app.use('/', adminLoginRecoveryErrorRoutes);

// Admin & feature routes
app.use('/admin', adminLoginRoutes);
app.use('/email', adminRecoveryLogin);
app.use('/auth', adminAuthenticationRoutes);
app.use('/logout', adminLogoutRoutes);

app.use('/register', eventRegisterRoutes);
app.use('/contact', contactInquiriesRoutes);
app.use('/calendar', calendarEventRoutes);
app.use('/coach', volunteerRoutes);
app.use('/donate', donateRoutes);






const OUR_TEAM = [
  { data: 'MEET OUR TEAM' }
];

const typeDefs = gql`
  type TEAM_DATA {
    data: String
  }

  type Query {
    OUR_TEAM: [TEAM_DATA]
  }
`;

const resolvers = {
  Query: {
    OUR_TEAM: () => OUR_TEAM,
  },
};




const startApolloServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    cache: "bounded",
    introspection: process.env.NODE_ENV !== 'production', 
    plugins: process.env.NODE_ENV !== 'production'
      ? [ApolloServerPluginLandingPageLocalDefault({ embed: true })]
      : [], 
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });
};

startApolloServer();





app.use(express.static(path.join(__dirname, 'client/build')));



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});





app.get('/', (req, res) => {
  res.end('backend server');
});





const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});