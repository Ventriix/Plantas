// eslint-disable-next-line import/no-extraneous-dependencies
import { createUserWithEmailAndPassword, getAuth } from "@firebase/auth";
import firebaseApp from "../config";

const auth = getAuth(firebaseApp);

export default async function signUp(email: string, password: string) {
  let result = null;
  let error = null;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (_error) {
    error = _error;
  }

  return { result, error };
}
