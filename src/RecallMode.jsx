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
  Flex,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";

function shuffleArray(originalArray) {
  let shuffledArray = [...originalArray];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function RecallMode({ cards, handleRecall }) {
  const [testCards, setTestCards] = useState(shuffleArray(cards));
  const [flipCard, setFlipCard] = useState(false);
  const [cardsLeft, setCardsLeft] = useState(testCards.length - 1);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

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
      onOpen();
      // alert(
      //   `${testCards.length - incorrectCount} correct out of ${
      //     testCards.length
      //   } `
      // );
    }
  }, [cardsLeft]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleRecall}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Study result</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {testCards.length - incorrectCount} correct out of{" "}
              {testCards.length}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleRecall}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Heading>Recall mode</Heading>
      {cardsLeft >= 0 ? (
        <>
          <Card>
            {!flipCard ? (
              <CardBody
                onClick={() => handleFlipCard()}
                _hover={{ cursor: "pointer" }}
              >
                <Stack spacing="4">
                  <Heading size="md" textTransform="uppercase">
                    First Side
                  </Heading>
                  <Text fontSize="2xl">{testCards[cardsLeft].first_side}</Text>
                </Stack>
              </CardBody>
            ) : (
              <>
                <CardBody>
                  <Stack spacing="4">
                    <Heading size="md" textTransform="uppercase">
                      Second Side
                    </Heading>
                    <Text fontSize="2xl">
                      {testCards[cardsLeft].second_side}
                    </Text>
                  </Stack>
                </CardBody>
              </>
            )}
          </Card>
          {flipCard ? (
            <Flex>
              <Button onClick={() => handleCardsLeft()} colorScheme="green">
                Correct
              </Button>
              <Button onClick={() => handleIncorrect()} colorScheme="red">
                Incorrect
              </Button>
            </Flex>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default RecallMode;
