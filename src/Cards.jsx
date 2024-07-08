import FlashCard from "./FlashCard";
import InsertFlashCard from "./InsertFlashCard";
import { ChakraProvider, Wrap } from "@chakra-ui/react";
import { useState, useEffect } from "react";

function Cards({ selectedGroup }) {
  const [cards, setCards] = useState([]);

  return (
    <>
      <InsertFlashCard cards={cards} setCards={setCards} />
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
  );
}

export default Cards;
