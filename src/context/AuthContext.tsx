// eslint-disable-next-line import/no-extraneous-dependencies
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import firebaseApp from "@/firebase/config";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const auth = getAuth(firebaseApp);
export const AuthContext = createContext<User | null>(null);
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (_user) => {
      setUser(_user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const memoizedUser = useMemo(() => user, [user]);

  return (
    <AuthContext.Provider value={memoizedUser}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
