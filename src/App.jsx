import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { ChakraProvider, Button } from "@chakra-ui/react";

import Auth from "./Auth";
import Home from "./Home";
import { Children } from "react";

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

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
  };

  return (
    <ChakraProvider>
      {!session ? (
        <Auth />
      ) : (
        <>
          <Button onClick={() => handleLogOut()}>Log out</Button>
          <Home key={session.user.id} session={session} supabase={supabase} />
        </>
      )}
    </ChakraProvider>
  );
}

export default App;
