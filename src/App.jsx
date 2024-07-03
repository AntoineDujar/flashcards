import { ChakraProvider } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

import { createClient } from "@supabase/supabase-js";

import { useState, useEffect } from "react";

import FlashCard from "./FlashCard";

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [firstSide, setFirstSide] = useState("");
  const [secondSide, setSecondSide] = useState("");
  const [cards, setCards] = useState([]);

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
    <ChakraProvider>
      <Stack spacing={3}>
        {cards.map((card) => (
          <>
            <FlashCard
              key={card.id}
              firstSide={card.first_side}
              secondSide={card.second_side}
            ></FlashCard>
          </>
        ))}
      </Stack>

      <Text fontSize="md">Insert New Card</Text>
      <Input placeholder="First Side" onChange={handleFirstSideChange} />
      <Input placeholder="Second Side" onChange={handleSecondSideChange} />
      <Button colorScheme="blue" size="lg" onClick={() => databaseInsert()}>
        Insert
      </Button>
      <Button colorScheme="orange" size="lg" onClick={() => databaseSync()}>
        Sync
      </Button>
      <Button colorScheme="green" size="lg" onClick={() => printScreen()}>
        Print
      </Button>
    </ChakraProvider>
  );
}

export default App;
