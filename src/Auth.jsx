import { useState } from "react";
import { supabase } from "./supabaseClient";

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
  Input,
} from "@chakra-ui/react";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    if (event) {
      setEmail(event.target.value);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert("Check your email for the login link!");
      window.close();
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <Heading>Login with Magic Links</Heading>
        </CardHeader>
        <CardBody>
          <Input
            placeholder="Your Email"
            onChange={handleEmailChange}
            value={email}
          />
          <Button colorScheme="blue" size="lg" onClick={() => handleLogin()}>
            {loading ? <span>Loading</span> : <span>Send magic link</span>}
          </Button>
        </CardBody>
      </Card>
    </>
  );
}
