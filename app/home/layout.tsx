"use client";

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Divider,
  Button,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTheme, Theme, CSSObject } from "@mui/material/styles";

import CalendarMonth from "@mui/icons-material/CalendarMonth";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Cookies from "js-cookie";
import { useAuthStore } from "@/lib/providers/auth.store.provider";
import { useSearchParams } from "next/navigation";

const drawerWidth = 240;

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuthStore((store) => ({ user: store.user }));
  const theme = useTheme();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: theme.zIndex.drawer + 1 }}
        component={motion.header}
        initial={{ marginLeft: 0, width: "100%", y: -10 }}
        animate={
          sidebarOpen
            ? {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                y: 0,
              }
            : { marginLeft: drawerWidth, y: 0, width: "100%" }
        }
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            VOMIT
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        open={sidebarOpen}
        PaperProps={{
          component: motion.div,
          initial: {
            x: -drawerWidth,
          },
          animate: {
            x: 0,
            width: sidebarOpen
              ? drawerWidth
              : `calc(${theme.spacing(7)} + 1px)`,
          },
        }}
        onMouseOver={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
        variant="permanent"
        sx={{
          flexShrink: 0,
          whiteSpace: "nowrap",
          overflowX: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            padding: "8px",
            overflowX: "hidden",
          }}
        >
          <Avatar sx={{ marginRight: "4px" }} />
          <Typography>{user?.name}</Typography>
        </Box>
        <Divider />
        <List
          sx={{
            overflowX: "hidden",
          }}
        >
          <ListItem key={"Today"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={tab === "today"}
              sx={{
                minHeight: 48,
                justifyContent: sidebarOpen ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                }}
              >
                <CalendarMonth />
              </ListItemIcon>
              <ListItemText
                primary={"Today"}
                primaryTypographyProps={{
                  component: motion.div,
                  initial: { opacity: 0 },
                  animate: { opacity: sidebarOpen ? 1 : 0 },
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
