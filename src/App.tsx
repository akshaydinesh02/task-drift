import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./lib/supabase";
import { Session } from "@supabase/supabase-js";

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <div>NOT LOGGED IN</div>;
  } else {
    return (
      <div>
        <p>Logged in!</p>
      </div>
    );
  }
}

export default App;
