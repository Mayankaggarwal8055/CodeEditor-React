import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 4444;
import cookieParser from 'cookie-parser';

import SignUpRoute from './http/routes/signUp.js';
import loginRoute from './http/routes/login.js';
import verifyRoute from './http/routes/verify.js';
import projectDataRoute from './http/routes/projectDataRoute.js'

app.use(
    cors({
        origin: "https://codesphere-mayank.netlify.app", // your frontend domain
        credentials: true, // allow cookies/JWT
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/signup', SignUpRoute)
app.use('/api/login', loginRoute)
app.use('/api/verify', verifyRoute)
app.use('/api/projectData', projectDataRoute)





app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})