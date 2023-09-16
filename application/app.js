'use strict';

import express from 'express';
import {env} from 'node:process';
import router from './src/routes/router.js';

const app = express();

app.use(express.json());
router(app);

const PORT = env.APP_PORT || 80;
app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
});

export default app;