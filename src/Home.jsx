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
    <>
      {selectedGroup ? (
        <>
          <Button onClick={() => clearSelectedGroup()}>Groups</Button>
          <Cards selectedGroup={selectedGroup} session={session} />
        </>
      ) : (
        <Groups setSelectedGroup={setSelectedGroup} session={session} />
      )}
    </>
  );
}

export default Home;
