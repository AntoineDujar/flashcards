import { Input } from "@chakra-ui/react";
import { StackDivider, Box, Stack, Button } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabaseClient";

function InsertFlashCard({ cards, setCards, selectedGroup, session }) {
  const [firstSide, setFirstSide] = useState("");
  const [secondSide, setSecondSide] = useState("");
  const inputRef = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

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
    let { data: card, error } = await supabase
      .from("card")
      .select("*")
      .order("id", { ascending: true })
      .eq("group_name", selectedGroup);
    if (error) {
      console.log(error);
    } else {
      console.log(card);
      setCards(card);
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
    databaseSync();
  };

  useEffect(() => {
    databaseSync();
  }, []);

  return (
    <>
      <Button ref={btnRef} colorScheme="green" onClick={onOpen}>
        Insert new card
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Insert New Card</DrawerHeader>

          <DrawerBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Input
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
                <Button colorScheme="green" onClick={() => databaseInsert()}>
                  Insert
                </Button>
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default InsertFlashCard;
