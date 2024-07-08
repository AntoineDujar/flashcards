import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

import Auth from "./Auth";
import Home from "./Home";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      {!session ? <Auth /> : <Home key={session.user.id} session={session} />}
    </>
  );
}

export default App;
