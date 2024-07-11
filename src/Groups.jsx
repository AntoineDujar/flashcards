import {
  Wrap,
  Button,
  useBoolean,
  Heading,
  Flex,
  Spacer,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "./supabaseClient";
import { MdEdit } from "react-icons/md";
import { Spinner } from "@chakra-ui/react";

import GroupCard from "./GroupCard";
import InsertGroup from "./InsertGroup";
import SettingsButton from "./SettingsButton";

function Groups({ setSelectedGroup, session }) {
  const [loading, setLoading] = useBoolean();
  const [groups, setGroups] = useState([]);
  const [editMode, setEditMode] = useBoolean();

  const handleSelectGroup = (name) => {
    console.log("clicked");
    setSelectedGroup(name);
  };

  const groupsSync = async () => {
    const { user } = session;
    setLoading.toggle();
    let { data: data, error } = await supabase
      .from("groups")
      .select("*")
      .eq("user_id", user.id);
    if (error) {
      console.log(error);
    } else {
      setLoading.toggle();
      console.log(data);
      setGroups(data);
    }
  };

  const groupsDelete = async (id) => {
    if (confirm("Are you sure you want to delete group?")) {
      console.log(`delete ${id}`);
      const response = await supabase.from("groups").delete().eq("id", id);
      console.log(response);
      groupsSync();
    }
  };

  return (
    <>
      <Flex>
        <SettingsButton />
        <Spacer />
        <InsertGroup
          setGroups={setGroups}
          session={session}
          groupsSync={groupsSync}
        />
        <Button
          onClick={setEditMode.toggle}
          variant="outline"
          leftIcon={<MdEdit />}
          colorScheme={editMode ? "red" : ""}
        >
          Edit
        </Button>
      </Flex>
      <Heading>Flash card groups</Heading>

      {loading ? (
        <Center>
          <Spinner thickness="4px" speed="1s" />
        </Center>
      ) : (
        <>
          <Wrap>
            {groups.map((group) => (
              <GroupCard
                key={`gc_wrap${group.id}`}
                groupName={group.group_name}
                onClick={() => {
                  editMode
                    ? groupsDelete(group.id)
                    : handleSelectGroup(group.group_name);
                }}
                background={editMode ? "#E53E3E" : ""}
                color={editMode ? "#fff" : ""}
              />
            ))}
          </Wrap>
        </>
      )}
    </>
  );
}

export default Groups;
