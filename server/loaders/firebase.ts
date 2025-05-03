import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

export const getFirebase = () => {
  const firebase = initializeApp({
    credential: cert({
      projectId: process.env.GCP_PROJECT_ID,
      clientEmail: process.env.GCP_CLIENT_EMAIL,
      privateKey: process.env.GCP_PRIVATE_KEY,
    })
  });

  const auth = getAuth(firebase);

  return { firebase, auth };
}
