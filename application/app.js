'use strict';

import express from 'express';
import process from 'node:process';
import Router from './src/routes/Router.js';

const PORT = process.env.APP_PORT || 80;
const app = express();

app.use(express.json());

const router = new Router(app);
router.setRoutes();

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
});