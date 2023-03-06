import React from 'react';
import type { EntryContext } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { renderToString } from 'react-dom/server';
import * as Sentry from '@sentry/remix';

Sentry.init({
  dsn: 'https://9730f0db32c143548414db179aa9052c:13de9d83e3ed4a238e2c71309f0baf2f@o4504302330839040.ingest.sentry.io/4504789262008320',
  tracesSampleRate: 1,
  // integrations: [new Sentry.Integrations.Prisma({ client: prisma })],
  // ...
});

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set('Content-Type', 'text/html');

  // eslint-disable-next-line prefer-template
  return new Response('<!DOCTYPE html>' + markup, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
