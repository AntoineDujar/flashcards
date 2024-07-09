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

import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabaseClient";

function InsertFlashCard({ cards, setCards, selectedGroup, session }) {
  const itemsOnPage = 20;
  const [firstSide, setFirstSide] = useState("");
  const [secondSide, setSecondSide] = useState("");
  const inputRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);

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

  const databaseSync = async (newCurrentPage) => {
    let { data: card, error } = await supabase
      .from("card")
      .select("*")
      .range(newCurrentPage, newCurrentPage + itemsOnPage - 1)
      .order("id", { ascending: true })
      .eq("group_name", selectedGroup);
    if (error) {
      console.log(error);
    } else {
      console.log(card);
      setCards(card);
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + itemsOnPage);
    databaseSync(currentPage + itemsOnPage);
  };

  const handlePrev = () => {
    if (currentPage - 10 >= 0) {
      setCurrentPage(currentPage - itemsOnPage);
      databaseSync(currentPage - itemsOnPage);
    }
  };

  const databaseInsert = async () => {
    const { user } = session;
    const { data, error } = await supabase
      .from("card")
      .insert([
        {
          first_side: firstSide,
          second_side: secondSide,
          group_name: selectedGroup,
          user_id: user.id,
        },
      ])
      .select();
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
    setFirstSide("");
    setSecondSide("");
    inputRef.current.focus();
    setCurrentPage(0);
    databaseSync(0);
  };

  useEffect(() => {
    databaseSync(currentPage);
  }, []);

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
                autoFocus
                ref={inputRef}
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
      <Card>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Button
                colorScheme="green"
                size="xs"
                onClick={() => handlePrev()}
              >
                prev
              </Button>
              <Text>{currentPage}</Text>
              <Button
                colorScheme="green"
                size="xs"
                onClick={() => handleNext()}
              >
                next
              </Button>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}

export default InsertFlashCard;
