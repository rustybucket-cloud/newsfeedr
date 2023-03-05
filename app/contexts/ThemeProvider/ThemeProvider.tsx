import React, { useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type Props = {
  children: React.ReactNode,
  mode: 'LIGHT' | 'DARK',
}

export default function ThemeProviderComponent({ children, mode }: Props) {
  const theme = useMemo(() => createTheme({
    palette: {
      primary: {
        main: mode === 'DARK' ? '121212' : '#fff',
      },
      secondary: {
        main: '#00a96d',
      },
    },
    typography: {
      fontFamily: [
        'Open Sans',
        'sans-serif',
      ].join(','),
    },
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}
