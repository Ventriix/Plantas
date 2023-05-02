// eslint-disable-next-line import/no-extraneous-dependencies
import { deleteDoc, doc, getFirestore } from "@firebase/firestore";
import firebaseApp from "../config";

const firestore = getFirestore(firebaseApp);

export default async function deleteDocument(collection: string, id: string) {
  let result = null;
  let error = null;

  try {
    result = await deleteDoc(doc(firestore, collection, id));
  } catch (_error) {
    error = _error;
  }

  return { result, error };
}
