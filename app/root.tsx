import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { Header } from './components';
import { ThemeProvider } from './contexts';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

function Layout() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <link rel="stylesheet" href="styles/reset.css" />
        <link rel="stylesheet" href="styles/main.css" />
        <Links />
      </head>
      <body>
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ThemeProvider mode="LIGHT">
      <Layout />
    </ThemeProvider>
  );
}
