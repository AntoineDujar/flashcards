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
} from "@chakra-ui/react";

import { useState, useEffect } from "react";

function FlashCard({ firstSide, secondSide }) {
  const [cardHidden, setCardHidden] = useState(true);

  const styleHidden = {
    visibility: "hidden",
  };

  const styleVisible = {
    visibility: "visible",
  };

  const handleCardHidden = () => {
    setCardHidden(!cardHidden);
  };

  return (
    <>
      <Card>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                First Side
              </Heading>
              <Text pt="2" fontSize="sm">
                {firstSide}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Second Side
              </Heading>

              <Text
                pt="2"
                fontSize="sm"
                id="second_side"
                style={cardHidden ? styleHidden : styleVisible}
              >
                {secondSide}
              </Text>

              <Button
                colorScheme="gray"
                size="lg"
                onClick={() => handleCardHidden()}
              >
                Reveal
              </Button>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}

export default FlashCard;
