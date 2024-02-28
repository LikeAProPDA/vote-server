import express from 'express';
import cors from 'cors';
import dbSetUp from './db/dbSetup.js';
import dotenv from 'dotenv';
import router from './router/router.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: ['http://3.36.78.175 '],
    })
);

app.use('/api/restaurants', router);

const SERVER_PORT = process.env.SERVER_PORT;

// DB ENV
const DB_HOST = process.env.DB_HOST;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_COLLECTION = process.env.DB_COLLECTION;

app.listen(SERVER_PORT, () => {
    console.log(`Server Listening on Port ${SERVER_PORT}`);
    dbSetUp(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_COLLECTION);
});
