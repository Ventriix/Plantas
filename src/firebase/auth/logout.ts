// eslint-disable-next-line import/no-extraneous-dependencies
import { getAuth, signOut } from "@firebase/auth";
import firebaseApp from "../config";

const auth = getAuth(firebaseApp);

export default async function logout() {
  let result = null;
  let error = null;

  try {
    result = await signOut(auth);
  } catch (_error) {
    error = _error;
  }

  return { result, error };
}
