// eslint-disable-next-line import/no-extraneous-dependencies
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "@firebase/firestore";
import firebaseApp from "../config";

const firestore = getFirestore(firebaseApp);

export default async function queryDocumentsWhere(
  _collection: string,
  property: string,
  value: string
) {
  let result = null;
  let error = null;

  try {
    result = await getDocs(
      query(collection(firestore, _collection), where(property, "==", value))
    );
  } catch (_error) {
    error = _error;
  }

  return { result, error };
}
