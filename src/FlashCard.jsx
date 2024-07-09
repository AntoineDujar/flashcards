import {
  Card,
  CardBody,
  StackDivider,
  Box,
  Heading,
  Stack,
  Text,
  useBoolean,
  WrapItem,
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
      <WrapItem>
        <Card onClick={setCardVisible.toggle} _hover={{ cursor: "pointer" }}>
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
                  style={!cardVisible ? styleVisible : styleHidden}
                >
                  {secondSide}
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </WrapItem>
    </>
  );
}

export default FlashCard;
