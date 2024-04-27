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

const drawerWidth = 240;

export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
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
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            padding: "8px",
          }}
        >
          <Avatar sx={{ marginRight: "4px" }} />
          <Typography>Username</Typography>
        </Box>
        <Divider />
        <List>
          <ListItem key={"Today"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
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
