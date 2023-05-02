// eslint-disable-next-line import/no-extraneous-dependencies
import { doc, getFirestore, setDoc } from "@firebase/firestore";
import firebaseApp from "../config";

const firestore = getFirestore(firebaseApp);

export default async function setDocument(
  collection: string,
  id: string,
  document: any
) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(firestore, collection, id), document);
  } catch (_error) {
    error = _error;
  }

  return { result, error };
}
