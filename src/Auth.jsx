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
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleEmailChange = (event) => {
    if (event) {
      setEmail(event.target.value);
    }
  };
  const handlePasswordChange = (event) => {
    if (event) {
      setPassword(event.target.value);
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) alert(error.error_description || error.message);
    setLoading(false);
  };

  const handleSignUp = async () => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) alert(error.error_description || error.message);
    else alert("Check your email for the sign up verification");
    setLoading(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <Heading>Sign in or sign up</Heading>
        </CardHeader>
        <CardBody>
          <Input
            placeholder="email@email.com"
            onChange={handleEmailChange}
            value={email}
          />
          <InputGroup size="md">
            <Input
              placeholder="Password"
              onChange={handlePasswordChange}
              type={show ? "text" : "password"}
              value={password}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button colorScheme="blue" size="lg" onClick={() => handleSignIn()}>
            {loading ? <span>Loading</span> : <span>Sign In</span>}
          </Button>
          <Button size="lg" onClick={() => handleSignUp()}>
            {loading ? <span>Loading</span> : <span>Sign Up</span>}
          </Button>
        </CardBody>
      </Card>
    </>
  );
}
