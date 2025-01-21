import 'dotenv/config';
import { onRequest } from 'firebase-functions/v2/https';
import app from './core/app';

exports.api = onRequest(app);
