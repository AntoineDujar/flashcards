import { Input } from "@chakra-ui/react";
import {
  StackDivider,
  Box,
  Stack,
  Button,
  Textarea,
  Heading,
  Text,
  useBoolean,
} from "@chakra-ui/react";
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

import { Spinner } from "@chakra-ui/react";

import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabaseClient";
import { MdAdd } from "react-icons/md";
import { openai } from "./openaiClient";

function InsertFlashCard({
  cards,
  setCards,
  selectedGroup,
  session,
  databaseSync,
  toastMessage,
}) {
  const [loading, setLoading] = useBoolean();

  const [firstSide, setFirstSide] = useState("");
  const [secondSide, setSecondSide] = useState("");
  const [aiInput, setAiInput] = useState("");
  const inputRef = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const chatCompletion = async () => {
    setLoading.toggle();
    const msg = aiInput.toString();
    console.log(msg);
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant who creates flash cards for english speakers and puts them in JSON, the maximum objects you can create is 50, for each object there is a variable first_side and a variable second_side. first_side will always be in english, second_side will be according to the request of the user",
        },
        { role: "user", content: msg },
      ],
      response_format: { type: "json_object" },
      model: "gpt-3.5-turbo",
    });

    const content = response.choices[0].message.content;
    // console.log(content);

    console.log(JSON.parse(content));
    const aiResponse = JSON.parse(content);

    const { user } = session;

    const formattedObjects = Object.keys(aiResponse).map((key) => ({
      first_side: aiResponse[key].first_side,
      second_side: aiResponse[key].second_side, // Assuming both sides are the same for simplicity
      group_name: selectedGroup,
      user_id: user.id,
    }));

    console.log(formattedObjects);

    const { data, error } = await supabase
      .from("card")
      .insert(formattedObjects)
      .select();
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
    setAiInput("");
    databaseSync();
    setLoading.toggle();
  };

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

  const handleAiInputChange = (event) => {
    setAiInput(event.target.value);
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
    toastMessage({
      title: "Card Inserted",
      description: "",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    databaseSync();
  };

  return (
    <>
      <Button
        leftIcon={<MdAdd />}
        ref={btnRef}
        colorScheme="green"
        onClick={onOpen}
      >
        Add
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
          <DrawerHeader>Add new card</DrawerHeader>

          <DrawerBody>
            <Stack spacing="4">
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
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Text>Create cards with AI</Text>
                  <Textarea
                    placeholder="Example: Numbers 1 to 10 in French"
                    onChange={handleAiInputChange}
                    value={aiInput}
                  />
                  <Button colorScheme="blue" onClick={() => chatCompletion()}>
                    Request AI
                  </Button>
                  {loading ? (
                    <Spinner color="blue.500" thickness="4px" speed="1s" />
                  ) : (
                    <></>
                  )}
                </Box>
              </Stack>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default InsertFlashCard;
