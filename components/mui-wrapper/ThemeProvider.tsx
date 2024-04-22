"use client";

import getTheme from '@/theme';

import { useMemo } from 'react';

import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';

import { ReactNode } from 'react';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)');

    const theme = useMemo(() => getTheme(prefersDarkMode ? 'dark' : 'light'), [prefersDarkMode]);
    return (
    <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {!prefersDarkMode && !prefersLightMode ? null : children}
    </MUIThemeProvider>
    )
}

export default ThemeProvider;