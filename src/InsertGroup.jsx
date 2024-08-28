import { supabase } from "./supabaseClient";
import { Button, Text } from "@chakra-ui/react";

import { useState, useEffect, useRef } from "react";

import {
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";

const groupLimit = 50;

function InsertGroup({ session, groupsSync, groups }) {
  const [groupName, setGroupName] = useState("");
  const inputRef = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const groupsInsert = async () => {
    if (groups.length < groupLimit) {
      const { user } = session;
      const { data, error } = await supabase
        .from("groups")
        .insert([{ group_name: groupName, user_id: user.id }])
        .select();
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
      setGroupName("");
      inputRef.current.focus();
      groupsSync();
    } else {
      alert("Group limit reached");
    }
  };

  useEffect(() => {
    groupsSync();
  }, []);
  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="green"
        onClick={onOpen}
        leftIcon={<MdAdd />}
      >
        Add
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay bg="blackAlpha.000" />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add a new group</DrawerHeader>

          <DrawerBody>
            <Input
              ref={inputRef}
              placeholder="Group Name"
              onChange={handleGroupNameChange}
              value={groupName}
            />
            <Button colorScheme="green" onClick={() => groupsInsert()}>
              Add Group
            </Button>
          </DrawerBody>
          <DrawerFooter>
            <Text>
              {groups.length} out of {groupLimit}
            </Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default InsertGroup;
