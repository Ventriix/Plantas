// eslint-disable-next-line import/no-extraneous-dependencies
import { collection, getDocs, getFirestore } from "@firebase/firestore";
import firebaseApp from "../config";

const firestore = getFirestore(firebaseApp);

export default async function getAllDocuments(_collection: string) {
  let result = null;
  let error = null;

  try {
    result = await getDocs(collection(firestore, _collection));
  } catch (_error) {
    error = _error;
  }

  return { result, error };
}
