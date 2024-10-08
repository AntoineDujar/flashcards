import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { ChakraProvider, Flex, Box } from "@chakra-ui/react";

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
    <ChakraProvider>
      <link rel="manifest" href="/manifest.json" />
      <Flex direction="column" w="100%" align="center">
        <Box w="85%" my="1%">
          {!session ? (
            <Auth />
          ) : (
            <>
              <Home
                key={session.user.id}
                session={session}
                supabase={supabase}
              />
            </>
          )}
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
