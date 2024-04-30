"use client";

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTheme, Theme, CSSObject } from "@mui/material/styles";

import CalendarMonth from "@mui/icons-material/CalendarMonth";
import PunchClock from "@mui/icons-material/PunchClock";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import GraphicEq from "@mui/icons-material/GraphicEq";
import { useAuthStore } from "@/lib/providers/auth.store.provider";
import { useSearchParams } from "next/navigation";

import { usePathname } from "next/navigation";

const menuOptions = [
  {
    label: "Today",
    key: "today",
    icon: CalendarMonth,
    get href() {
      return `/home/${this.key}`;
    },
  },
  {
    label: "History",
    key: "history",
    icon: PunchClock,
    get href() {
      return `/home/${this.key}`;
    },
  },
  {
    label: "Stats",
    key: "stats",
    icon: GraphicEq,
    get href() {
      return `/home/${this.key}`;
    },
  },
];

const drawerWidth = 240;

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lastSubPath = useMemo(() => {
    return pathname.split("/").pop();
  }, [pathname]);
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
          {menuOptions.map((option) => (
            <ListItem key={option.key} disablePadding sx={{ display: "block" }}>
              <Link
                href={option.href}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemButton
                  selected={lastSubPath === option.key}
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
                    <option.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={option.label}
                    primaryTypographyProps={{
                      component: motion.div,
                      initial: { opacity: 0, marginLeft: 0 },
                      animate: {
                        opacity: sidebarOpen ? 1 : 0,
                        marginLeft: sidebarOpen ? 12 : 0,
                      },
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
