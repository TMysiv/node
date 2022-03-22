import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { apiRouter } from './routes/apiRouter';
import { config } from './config/config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

app.listen(config.PORT, async () => {
    console.log(`Server has started!!!!!! on PORT:${config.PORT}`);
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('DATABASE Connect');
        }
    } catch (err) {
        if (err) {
            console.log(err);
        }
    }
});
