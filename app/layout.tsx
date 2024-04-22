import ThemeProvider from '@/components/mui-wrapper/ThemeProvider';
import './globals.css'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Suspense } from 'react';

import CircularProgress from '@mui/material/CircularProgress';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
    </>
  )
}
