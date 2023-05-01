// eslint-disable-next-line import/no-extraneous-dependencies
import { getDownloadURL, getStorage, ref } from "@firebase/storage";
import firebaseApp from "../config";

const storage = getStorage(firebaseApp);

export default async function getFile(path: string) {
  let result = null;
  let error = null;

  try {
    result = await getDownloadURL(ref(storage, path));
  } catch (_error) {
    error = _error;
  }

  return { result, error };
}
