import express from 'express';
import fetchOutlet from './controller';
const router = express.Router();

router.post('/fetch-outlet-for-location', fetchOutlet);

export default router