// eslint-disable-next-line import/no-extraneous-dependencies
import { deleteObject, getStorage, ref } from "@firebase/storage";
import firebaseApp from "../config";

const storage = getStorage(firebaseApp);

export default async function deleteFile(path: string) {
  let result = null;
  let error = null;

  try {
    result = await deleteObject(ref(storage, path));
  } catch (_error) {
    error = _error;
  }

  return { result, error };
}
