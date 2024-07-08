import FlashCard from "./FlashCard";
import InsertFlashCard from "./InsertFlashCard";
import { ChakraProvider, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import Groups from "./Groups";
import Cards from "./Cards";

function Home({ session }) {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const clearSelectedGroup = () => {
    setSelectedGroup(null);
  };

  return (
    <ChakraProvider>
      {selectedGroup ? (
        <>
          <Cards selectedGroup={selectedGroup} />
          <Button onClick={() => clearSelectedGroup()}>
            Clear selected group
          </Button>
        </>
      ) : (
        <Groups setSelectedGroup={setSelectedGroup} session={session} />
      )}
    </ChakraProvider>
  );
}

export default Home;
