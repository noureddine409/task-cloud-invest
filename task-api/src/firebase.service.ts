import * as admin from 'firebase-admin';
import { config } from 'dotenv';
config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string); // Directly access environment variable

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
