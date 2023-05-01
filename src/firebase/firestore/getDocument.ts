// eslint-disable-next-line import/no-extraneous-dependencies
import { doc, getDoc, getFirestore } from "@firebase/firestore";
import firebaseApp from "../config";

const firestore = getFirestore(firebaseApp);

export default async function getDocument(collection: string, id: string) {
  let result = null;
  let error = null;

  try {
    result = await getDoc(doc(firestore, collection, id));
  } catch (_error) {
    error = _error;
  }

  return { result, error };
}
