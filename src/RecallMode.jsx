import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  StackDivider,
  Box,
  Heading,
  Stack,
  Button,
  Text,
  useBoolean,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";

function RecallMode({ cards, handleRecall }) {
  const [testCards, setTestCards] = useState(cards);
  const [flipCard, setFlipCard] = useState(false);
  const [cardsLeft, setCardsLeft] = useState(testCards.length - 1);
  const [incorrectCount, setIncorrectCount] = useState(0);
  console.log(testCards);

  const handleFlipCard = () => {
    setFlipCard(!flipCard);
  };

  const handleCardsLeft = () => {
    setCardsLeft(cardsLeft - 1);
    setFlipCard(!flipCard);
  };

  const handleIncorrect = () => {
    setIncorrectCount(incorrectCount + 1);
    handleCardsLeft();
  };
  console.log(`cardsLeft: ${cardsLeft}`);
  console.log(`incorrectCount: ${incorrectCount}`);

  useEffect(() => {
    if (cardsLeft < 0) {
      alert(
        `${testCards.length - incorrectCount} correct out of ${
          testCards.length
        } `
      );
      handleRecall();
    }
  }, [cardsLeft]);
  return (
    <>
      <Heading>Recall mode</Heading>
      {cardsLeft >= 0 ? (
        <Card>
          {!flipCard ? (
            <CardBody
              onClick={() => handleFlipCard()}
              _hover={{ cursor: "pointer" }}
            >
              <Heading size="xs" textTransform="uppercase">
                First Side
              </Heading>
              <Text pt="2" fontSize="sm">
                {testCards[cardsLeft].first_side}
              </Text>
            </CardBody>
          ) : (
            <CardBody>
              <Heading size="xs" textTransform="uppercase">
                Second Side
              </Heading>
              <Text pt="2" fontSize="sm">
                {testCards[cardsLeft].second_side}
              </Text>
              <Button onClick={() => handleCardsLeft()}>Correct</Button>
              <Button onClick={() => handleIncorrect()}>Incorrect</Button>
            </CardBody>
          )}
        </Card>
      ) : (
        <></>
      )}
    </>
  );
}

export default RecallMode;
