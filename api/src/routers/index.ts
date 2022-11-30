// eslint-disable-next-line import/no-import-module-exports
import { Request, Response } from 'express';

import express from 'express';

const tasksRouter = require('./tasksRouter');
const userRouter = require('./userRouter');
const organisationRouter = require('./organisationRouter');

const router = express.Router();

router.get('/', (_, res: Response) => {
  res.json({
    status: 200,
    message: 'Hello from router'
  });
});

router.use('/users', userRouter);
router.use('/tasks', tasksRouter);
router.use('/organisations', organisationRouter);

module.exports = router;
