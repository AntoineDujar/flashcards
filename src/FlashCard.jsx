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

function FlashCard({ firstSide, secondSide }) {
  const [cardVisible, setCardVisible] = useBoolean();

  const styleHidden = {
    visibility: "hidden",
  };

  const styleVisible = {
    visibility: "visible",
  };

  return (
    <>
      <Card onClick={setCardVisible.toggle}>
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
                style={cardVisible ? styleVisible : styleHidden}
              >
                {secondSide}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}

export default FlashCard;
