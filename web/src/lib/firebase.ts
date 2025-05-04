import { PUBLIC_FIREBASE_API_KEY, PUBLIC_FIREBASE_AUTH_DOMAIN } from "$env/static/public";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const app = initializeApp({
  apiKey: PUBLIC_FIREBASE_API_KEY,
  authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN
});

export const auth = getAuth(app);
