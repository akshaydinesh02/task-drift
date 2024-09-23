import { Session, User } from "@supabase/supabase-js";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { auth } from "./../lib/supabase";

const AuthContext = createContext<{
  session: Session | null | undefined;
  user: User | null | undefined;
  signOut: () => void;
}>({ session: null, user: null, signOut: () => {} });

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signOut = async () => {
    const { error } = await auth.signOut({ scope: "local" });
    console.error("error: ", error);
    if (!error) {
      setUser(null);
      setSession(null);
    }
    return { error };
  };

  useEffect(() => {
    const { data: listener } = auth.onAuthStateChange((_event, session) => {
      // console.log("session onAuthStateChange: ", session);
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : `<div>Loading...</div>`}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
