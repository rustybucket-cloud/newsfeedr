import React, { useState } from 'react';
import { Link } from '@remix-run/react';
import styled from '@emotion/styled';
import { useTheme, Typography } from '@mui/material';

interface Color {
  theme: {
    primary: {
      main: string;
      contrastText: string;
    }
    secondary: {
      main: string;
      contrastText: string;
    }
  }
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: ${({ theme }: Color) => theme.secondary.main};
`;

const Nav = styled.nav`
  ul {
    display: none
  }
  ul.open {
    position: fixed;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    * {
      color: white;
      z-index: 99;
    }
    font-size: 2rem;
  }
  ul.open::after {
    z-index: 9;
    content: '';
    position: fixed;
    inset: 0;
    background-color: black;
    opacity: 0.75;
  }
  li {
    list-style-type: none;
  }
  a {
    text-decoration: none;
    color: ${({ theme }: Color) => theme.primary.contrastText};
    &: hover {
      color: ${({ theme }: Color) => theme.secondary.contrastText};
    }
  }

  @media only screen and (min-width: 650px) {
    ul {
      display: flex;
      gap: 8px;
    }
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  z-index: 999;
  @media only screen and (min-width: 650px) {
    & {
      display: none;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 999;
  img {
    height: 35px;
  }
`;

const BAR_HEIGHT = 4;
const BAR_WIDTH = 35;
const SVG_HEIGHT = BAR_HEIGHT * 6;

export default function Header() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <Wrapper theme={theme.palette}>
      <Typography variant="h4" component="p">Stay Informed</Typography>
      <Nav theme={theme.palette}>
        <ul className={open ? 'open' : ''}>
          <li><Link to="/">Trending</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
        {open
          ? <CloseButton onClick={() => setOpen((curr) => !curr)}><img src="/assets/icons/close.svg" alt="close" /></CloseButton>
          : (
            <MenuButton type="button" onClick={() => setOpen((curr) => !curr)}>
              <svg height={SVG_HEIGHT} width={BAR_WIDTH * 2}>
                <rect x={24 + BAR_WIDTH / 3} y={BAR_HEIGHT} width={BAR_WIDTH * (2 / 3)} height={BAR_HEIGHT} fill="black" />
                <rect x={24 + BAR_WIDTH * (1 / 6)} y={BAR_HEIGHT * 3} width={BAR_WIDTH * (5 / 6)} height={BAR_HEIGHT} fill="black" />
                <rect x="24" y={BAR_HEIGHT * 5} width={BAR_WIDTH} height={BAR_HEIGHT} fill="black" />
              </svg>
            </MenuButton>
          )}
      </Nav>
    </Wrapper>
  );
}