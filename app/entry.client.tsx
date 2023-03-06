import { RemixBrowser, useLocation, useMatches } from '@remix-run/react';
import React, { startTransition, StrictMode, useEffect } from 'react';
import * as Sentry from '@sentry/remix';
import { hydrateRoot } from 'react-dom/client';

Sentry.init({
  dsn: process.env.NODE_ENV === 'production' ? 'https://9730f0db32c143548414db179aa9052c:13de9d83e3ed4a238e2c71309f0baf2f@o4504302330839040.ingest.sentry.io/4504789262008320' : undefined,
  tracesSampleRate: 1,
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.remixRouterInstrumentation(
        useEffect,
        useLocation,
        useMatches,
      ),
    }),
  ],
  // ...
});

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>,
    );
  });
}

if (typeof requestIdleCallback === 'function') {
  requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(hydrate, 1);
}
