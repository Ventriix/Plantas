// eslint-disable-next-line import/no-extraneous-dependencies
import { addDoc, collection, getFirestore } from "@firebase/firestore";
import firebaseApp from "../config";

const firestore = getFirestore(firebaseApp);

export default async function addDocument(_collection: string, document: any) {
  let result = null;
  let error = null;

  try {
    result = await addDoc(collection(firestore, _collection), document);
  } catch (_error) {
    error = _error;
  }

  return { result, error };
}
