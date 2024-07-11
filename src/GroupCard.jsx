import { Card, CardHeader, Heading, WrapItem } from "@chakra-ui/react";

function GroupCard({ groupName, onClick, background, color }) {
  return (
    <>
      <WrapItem>
        <Card
          _hover={{ cursor: "pointer" }}
          onClick={onClick}
          backgroundColor={background}
          color={color}
        >
          <CardHeader>
            <Heading fontSize="2xl">{groupName}</Heading>
          </CardHeader>
        </Card>
      </WrapItem>
    </>
  );
}

export default GroupCard;
