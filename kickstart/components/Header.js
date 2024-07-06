import React from 'react';
import Link from 'next/link';
import { MenuMenu, MenuItem, Menu } from 'semantic-ui-react';

export default () => {
  return (
    <Menu style={{ marginTop: '10px' }}>
      <Link href='/' className='item'>
        CrowdCoin
      </Link>
      <MenuMenu position='right'>
        <Link href='/' className='item'>
          Campaigns
        </Link>
        <Link href='/campaigns/new' className='item'>
          +
        </Link>
      </MenuMenu>
    </Menu>
  );
};
