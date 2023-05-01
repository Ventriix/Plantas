// eslint-disable-next-line import/no-extraneous-dependencies
import { getStorage, ref, uploadBytesResumable } from "@firebase/storage";
import firebaseApp from "../config";

const storage = getStorage(firebaseApp);

export default async function uploadFile(
  file: File,
  path: string,
  metadata: any
) {
  let task = null;
  let error = null;

  try {
    const storageRef = ref(storage, path);
    task = uploadBytesResumable(storageRef, file, { customMetadata: metadata });
  } catch (_error) {
    error = _error;
  }

  return { task, error };
}
