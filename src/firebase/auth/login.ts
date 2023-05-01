// eslint-disable-next-line import/no-extraneous-dependencies
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import firebaseApp from "../config";

const auth = getAuth(firebaseApp);

export default async function login(email: string, password: string) {
  let result = null;
  let error = null;

  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (_error) {
    error = _error;
  }

  return { result, error };
}
