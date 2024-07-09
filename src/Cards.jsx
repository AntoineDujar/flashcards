import { ChakraProvider, Wrap, Button, useBoolean } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import FlashCard from "./FlashCard";
import InsertFlashCard from "./InsertFlashCard";
import RecallMode from "./RecallMode";

import { supabase } from "./supabaseClient";

function Cards({ selectedGroup, session }) {
  const [cards, setCards] = useState([]);
  const [recallInProgress, setRecallInProgress] = useState(false);
  const [editMode, setEditMode] = useBoolean();

  const handleRecallInProgress = () => {
    setRecallInProgress(!recallInProgress);
  };

  const databaseSync = async () => {
    let { data: card, error } = await supabase
      .from("card")
      .select("*")
      .order("id", { ascending: true })
      .eq("group_name", selectedGroup);
    if (error) {
      console.log(error);
    } else {
      console.log(card);
      setCards(card);
    }
  };

  const databaseDelete = async (id) => {
    if (confirm("Are you sure you want to delete card?")) {
      console.log(`delete ${id}`);
      const response = await supabase.from("card").delete().eq("id", id);
      console.log(response);
      databaseSync();
    }
  };

  return (
    <>
      <Button onClick={setEditMode.toggle}>Edit</Button>
      <Button colorScheme="blue" onClick={() => handleRecallInProgress()}>
        Study All
      </Button>
      {!recallInProgress ? (
        <>
          <InsertFlashCard
            cards={cards}
            setCards={setCards}
            selectedGroup={selectedGroup}
            session={session}
            databaseSync={databaseSync}
          />
          <Wrap>
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
          </Wrap>
        </>
      ) : (
        <RecallMode cards={cards} handleRecall={handleRecallInProgress} />
      )}
    </>
  );
}

export default Cards;
