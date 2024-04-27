import ThemeProvider from "@/components/mui-wrapper/ThemeProvider";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Suspense } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import { AuthStoreProvider } from "@/lib/providers/auth.store.provider";
import AuthListener from "@/lib/authListener";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body>
          <AppRouterCacheProvider>
            <ThemeProvider>
              <AuthStoreProvider>
                <AuthListener />
                {children}
              </AuthStoreProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </>
  );
}
