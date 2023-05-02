// eslint-disable-next-line import/no-extraneous-dependencies
import { doc, getFirestore, updateDoc } from "@firebase/firestore";
import firebaseApp from "../config";

const firestore = getFirestore(firebaseApp);

export default async function updateDocument(
  collection: string,
  id: string,
  document: any
) {
  let result = null;
  let error = null;

  try {
    result = await updateDoc(doc(firestore, collection, id), document);
  } catch (_error) {
    error = _error;
  }

  return { result, error };
}
