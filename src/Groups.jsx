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
  Wrap,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { supabase } from "./supabaseClient";
import GroupCard from "./GroupCard";

function Groups({ setSelectedGroup, session }) {
  const [groups, setGroups] = useState([]);

  const groupsSync = async () => {
    let { data: data, error } = await supabase.from("groups").select("*");
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      setGroups(data);
    }
  };

  const groupsInsert = async () => {
    const { user } = session;
    const { data, error } = await supabase
      .from("groups")
      .insert([{ group_name: "vocab", user_id: user.id }])
      .select();
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  };

  const handleSelectGroup = (name) => {
    console.log("clicked");
    setSelectedGroup(name);
  };

  useEffect(() => {
    groupsSync();
  }, []);

  return (
    <>
      <Wrap>
        {groups.map((group) => (
          <GroupCard
            key={`gc_wrap${group.id}`}
            groupName={group.group_name}
            onClick={() => handleSelectGroup(group.group_name)}
          />
        ))}
      </Wrap>
      <Button onClick={() => groupsInsert()}>Add Group</Button>
      <Button onClick={() => groupsSync()}>Sync Group</Button>
    </>
  );
}

export default Groups;
