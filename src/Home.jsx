import FlashCard from "./FlashCard";
import InsertFlashCard from "./InsertFlashCard";
import { ChakraProvider, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { SettingsIcon, ArrowBackIcon } from "@chakra-ui/icons";

import Groups from "./Groups";
import Cards from "./Cards";
import SettingsButton from "./SettingsButton";

function Home({ session }) {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const clearSelectedGroup = () => {
    setSelectedGroup(null);
  };

  return (
    <>
      {selectedGroup ? (
        <>
          <Button onClick={() => clearSelectedGroup()}>
            <ArrowBackIcon />
          </Button>
          <Cards selectedGroup={selectedGroup} session={session} />
        </>
      ) : (
        <>
          <SettingsButton />
          <Groups setSelectedGroup={setSelectedGroup} session={session} />
        </>
      )}
    </>
  );
}

export default Home;
