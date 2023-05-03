// eslint-disable-next-line import/no-extraneous-dependencies
import { getStorage, listAll, ref } from "@firebase/storage";
import deleteFile from "@/firebase/storage/deleteFile";
import firebaseApp from "../config";

const storage = getStorage(firebaseApp);

export default async function deletePlantIcons(path: string) {
  let result = null;
  let error = null;

  try {
    listAll(ref(storage, path)).then((list) => {
      const promises = list.prefixes.map((prefix) => {
        return deleteFile(`${prefix.fullPath}/0`);
      });

      result = Promise.all(promises);
    });
  } catch (_error) {
    error = _error;
  }

  return { result, error };
}
