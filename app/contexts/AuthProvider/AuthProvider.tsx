import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

type Props = {
  children: React.ReactNode
}

export default function AuthProvider({ children }: Props) {
  return (
    <Auth0Provider
      domain="dev-dwbf8rgn.us.auth0.com"
      clientId="cCMAPluwokvDL5Vdud7YHPoyF8Kxyc1S"
      authorizationParams={{
        redirect_uri: 'http://localhost:3000',
      }}
    >
      {children}
    </Auth0Provider>
  );
}
