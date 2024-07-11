import { ChakraProvider, Button } from "@chakra-ui/react";
import { supabase } from "./supabaseClient";
import { SettingsIcon, ChevronDownIcon } from "@chakra-ui/icons";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

function SettingsButton() {
  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
  };
  return (
    <>
      <Menu>
        <MenuButton as={Button}>
          <SettingsIcon />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleLogOut()}>Log out</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

export default SettingsButton;
