import { ChakraProvider, Wrap, Button, useBoolean } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import FlashCard from "./FlashCard";
import InsertFlashCard from "./InsertFlashCard";
import RecallMode from "./RecallMode";
function Cards({ selectedGroup, session }) {
  const [cards, setCards] = useState([]);
  const [recallInProgress, setRecallInProgress] = useState(false);

  const handleRecallInProgress = () => {
    setRecallInProgress(!recallInProgress);
  };

  return (
    <>
      <Button onClick={() => handleRecallInProgress()}>Recall all</Button>
      {!recallInProgress ? (
        <>
          <InsertFlashCard
            cards={cards}
            setCards={setCards}
            selectedGroup={selectedGroup}
            session={session}
          />
          <Wrap>
            {cards.map((card) => (
              <FlashCard
                key={`fc_wrap_${card.id}`}
                firstSide={card.first_side}
                secondSide={card.second_side}
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
