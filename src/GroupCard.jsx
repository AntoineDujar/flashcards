import { Card, CardHeader, Heading, WrapItem } from "@chakra-ui/react";

function GroupCard({ groupName, onClick }) {
  return (
    <>
      <WrapItem>
        <Card _hover={{ cursor: "pointer" }} onClick={onClick}>
          <CardHeader>
            <Heading>{groupName}</Heading>
          </CardHeader>
        </Card>
      </WrapItem>
    </>
  );
}

export default GroupCard;
