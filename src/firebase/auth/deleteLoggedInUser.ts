// eslint-disable-next-line import/no-extraneous-dependencies
import { deleteUser, getAuth } from "@firebase/auth";
import firebaseApp from "../config";

const auth = getAuth(firebaseApp);

export default async function deleteLoggedInUser() {
  let result = null;
  let error = null;

  try {
    if (auth.currentUser) {
      result = await deleteUser(auth.currentUser!);
    } else {
      throw new Error("Not logged in.");
    }
  } catch (_error) {
    error = _error;
  }

  return { result, error };
}
