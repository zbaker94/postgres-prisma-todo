'use client';
import { Inter } from 'next/font/google';
import { createTheme } from '@mui/material/styles';



const font = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});



const getTheme = (paletteMode: 'light' | 'dark') => createTheme({
  typography: {
    fontFamily: font.style.fontFamily,
  },
  palette: {
    mode: paletteMode
  }
});

export default getTheme;