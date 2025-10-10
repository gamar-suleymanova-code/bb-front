import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Nav from './Nav';

function Layout() {
  const navbarHeight = useSelector(state => state.main.navHeight);
  
  return (
    <>
      <Nav />
      <main style={{ paddingTop: navbarHeight }}>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
