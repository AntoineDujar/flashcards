import { Wrap } from "@chakra-ui/react";
import { useState } from "react";

import GroupCard from "./GroupCard";
import InsertGroup from "./InsertGroup";

function Groups({ setSelectedGroup, session }) {
  const [groups, setGroups] = useState([]);

  const handleSelectGroup = (name) => {
    console.log("clicked");
    setSelectedGroup(name);
  };

  return (
    <>
      <InsertGroup setGroups={setGroups} session={session} />
      <Wrap>
        {groups.map((group) => (
          <GroupCard
            key={`gc_wrap${group.id}`}
            groupName={group.group_name}
            onClick={() => handleSelectGroup(group.group_name)}
          />
        ))}
      </Wrap>
    </>
  );
}

export default Groups;
