import { Input } from "@chakra-ui/react";
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
import { supabase } from "./supabaseClient";

function InsertFlashCard({ card, setCards }) {
  const [firstSide, setFirstSide] = useState("");
  const [secondSide, setSecondSide] = useState("");
  const handleFirstSideChange = (event) => {
    if (event) {
      setFirstSide(event.target.value);
    }
  };

  const handleSecondSideChange = (event) => {
    if (event) {
      setSecondSide(event.target.value);
    }
  };

  const printScreen = () => {
    console.log(cards);
    console.log(firstSide);
    console.log(secondSide);
  };

  const databaseSync = async () => {
    let { data: card, error } = await supabase.from("card").select("*");
    if (error) {
      console.log(error);
    } else {
      console.log(card);
      setCards(card);
    }
  };

  const databaseInsert = async () => {
    const { data, error } = await supabase
      .from("card")
      .insert([{ first_side: firstSide, second_side: secondSide }])
      .select();
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
    setFirstSide("");
    setSecondSide("");
    databaseSync();
  };

  return (
    <>
      <Card>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Insert New Card
              </Heading>
              <Input
                placeholder="First Side"
                onChange={handleFirstSideChange}
                value={firstSide}
              />
              <Input
                placeholder="Second Side"
                onChange={handleSecondSideChange}
                value={secondSide}
              />
              <Button
                colorScheme="blue"
                size="lg"
                onClick={() => databaseInsert()}
              >
                Insert
              </Button>
              <Button
                colorScheme="blue"
                size="lg"
                onClick={() => databaseSync()}
              >
                Sync
              </Button>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}

export default InsertFlashCard;
