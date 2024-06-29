import React from "react";
import { MenuMenu, MenuItem, Menu } from "semantic-ui-react";

export default () => {
  return (
    <Menu style={{ marginTop: '10px' }}>
      <MenuItem>CrowdCoin</MenuItem>
      <MenuMenu position="right">
        <MenuItem>Campaigns</MenuItem>
        <MenuItem>+</MenuItem>
      </MenuMenu>
    </Menu>
  );
};
