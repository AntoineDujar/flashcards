import {
  Wrap,
  Button,
  useBoolean,
  Heading,
  SimpleGrid,
  Flex,
  Spacer,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";

import FlashCard from "./FlashCard";
import InsertFlashCard from "./InsertFlashCard";
import RecallMode from "./RecallMode";

import { SettingsIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { MdEdit } from "react-icons/md";
import { MdMenuBook } from "react-icons/md";

import { supabase } from "./supabaseClient";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

function Cards({ selectedGroup, session, selectedGroupSet }) {
  const toast = useToast();
  const [cards, setCards] = useState([]);
  const [recallInProgress, setRecallInProgress] = useState(false);
  const [editMode, setEditMode] = useBoolean();
  const [loading, setLoading] = useBoolean();

  const clearSelectedGroup = () => {
    selectedGroupSet(null);
  };

  const handleRecallInProgress = () => {
    setRecallInProgress(!recallInProgress);
  };

  const databaseSync = async () => {
    setLoading.toggle();

    let { data: card, error } = await supabase
      .from("card")
      .select("*")
      .order("id", { ascending: true })
      .eq("group_name", selectedGroup);
    if (error) {
      console.log(error);
    } else {
      setLoading.toggle();

      console.log(card);
      setCards(card);
    }
  };

  const databaseDelete = async (id) => {
    if (confirm("Are you sure you want to delete card?")) {
      console.log(`delete ${id}`);
      const response = await supabase.from("card").delete().eq("id", id);
      console.log(response);
      toast({
        title: "Card Deleted",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      databaseSync();
    }
  };

  return (
    <>
      <Flex>
        <Button onClick={() => clearSelectedGroup()}>
          <ChevronLeftIcon boxSize={6} />
        </Button>
        <Spacer />
        <Button
          colorScheme="blue"
          onClick={() => handleRecallInProgress()}
          leftIcon={<MdMenuBook />}
        >
          Study
        </Button>
        {!recallInProgress ? (
          <>
            <InsertFlashCard
              cards={cards}
              setCards={setCards}
              selectedGroup={selectedGroup}
              session={session}
              databaseSync={databaseSync}
              toastMessage={toast}
            />
            <Button
              onClick={setEditMode.toggle}
              variant="outline"
              leftIcon={<MdEdit />}
            >
              Edit
            </Button>
          </>
        ) : (
          <></>
        )}
      </Flex>
      {!recallInProgress ? (
        <>
          <Heading>{selectedGroup} flash cards</Heading>
          {loading ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <>
              <SimpleGrid columns={[2, 3, 4, 5]} spacing="20px">
                {cards.map((card) => (
                  <FlashCard
                    key={`fc_wrap_${card.id}`}
                    firstSide={card.first_side}
                    secondSide={card.second_side}
                    onClick={() => {
                      editMode ? databaseDelete(card.id) : "";
                    }}
                    background={editMode ? "#E53E3E" : false}
                    color={editMode ? "#fff" : ""}
                    hover={editMode ? { cursor: "pointer" } : ""}
                  />
                ))}
              </SimpleGrid>
            </>
          )}
        </>
      ) : (
        <RecallMode cards={cards} handleRecall={handleRecallInProgress} />
      )}
    </>
  );
}

export default Cards;
