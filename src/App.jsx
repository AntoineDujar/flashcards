import { ChakraProvider } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Wrap, WrapItem } from "@chakra-ui/react";

import { createClient } from "@supabase/supabase-js";

import { useState, useEffect } from "react";

import FlashCard from "./FlashCard";
import InsertFlashCard from "./InsertFlashCard";

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [cards, setCards] = useState([]);

  return (
    <ChakraProvider>
      <Wrap>
        {cards.map((card) => (
          <WrapItem>
            <FlashCard
              key={card.id}
              firstSide={card.first_side}
              secondSide={card.second_side}
            />
          </WrapItem>
        ))}
      </Wrap>

      <InsertFlashCard cards={cards} setCards={setCards} />
    </ChakraProvider>
  );
}

export default App;
