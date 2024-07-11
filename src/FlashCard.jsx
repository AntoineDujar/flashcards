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

function FlashCard({
  firstSide,
  secondSide,
  onClick,
  background,
  color,
  hover,
}) {
  return (
    <>
      <Box>
        <Card
          onClick={onClick}
          _hover={hover}
          backgroundColor={background}
          color={color}
        >
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

                <Text pt="2" fontSize="sm" id="second_side">
                  {secondSide}
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </>
  );
}

export default FlashCard;
