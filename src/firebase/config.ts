// eslint-disable-next-line import/no-extraneous-dependencies
import { getApps, initializeApp } from "firebase/app";
// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeAppCheck, ReCaptchaV3Provider } from "@firebase/app-check";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

if (typeof window !== "undefined") {
  const appCheck = initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider(
      process.env.NEXT_PUBLIC_FIREBASE_RECAPTCHA_V3_SITE_KEY!
    ),
    isTokenAutoRefreshEnabled: true,
  });
}

export default firebaseApp;
