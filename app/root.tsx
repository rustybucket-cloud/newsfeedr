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
import { withSentry } from '@sentry/remix';
import { Header } from './components';
import { ThemeProvider, AuthProvider } from './contexts';

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
        <link rel="icon" type="image/svg+xml" href="/assets/icons//favicon/favicon.svg" />
        <link rel="icon" type="image/png" href="/assets/icons//favicon/favicon.png" />
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

function App() {
  return (
    <AuthProvider>
      <ThemeProvider mode="LIGHT">
        <Layout />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default withSentry(App);
