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
} from "@mui/material";
import { useTheme, Theme, CSSObject } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import { delay, motion } from "framer-motion";
import Link from "next/link";
import Cookies from "js-cookie";

const drawerWidth = 240;

export default function HomeLyout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  console.log({ sidebarOpen });
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: theme.zIndex.drawer + 1 }}
        component={motion.header}
        transition={{ ease: "easeOut", duration: 0.2 }}
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
          transition: { delay: !sidebarOpen ? 0.1 : 0 },
          initial: {
            x: -drawerWidth,
          },
          animate: {
            x: 0,
            width: sidebarOpen
              ? drawerWidth
              : theme.components?.MuiDrawer?.defaultProps?.PaperProps?.width,
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
        {/* Sidebar Contents */}
        <Divider />
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
