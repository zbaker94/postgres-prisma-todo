"use client";

import { SyntheticEvent, useCallback, useEffect, useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import SpeedDial from "@mui/material/SpeedDial";
import Box from "@mui/material/Box";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Checklist,
  Directions,
  Lightbulb,
  PriorityHigh,
  Psychology,
  Save,
} from "@mui/icons-material";
import { format } from "date-fns";
import TabPanel from "./tabpanel";

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const tabConfig = [
  {
    label: "Vent",
    key: "vent",
    icon: PriorityHigh,
  },
  {
    label: "Obligations",
    key: "obligations",
    icon: Checklist,
  },
  {
    label: "Mindset",
    key: "mindset",
    icon: Psychology,
  },
  {
    label: "Ideate",
    key: "ideate",
    icon: Lightbulb,
  },
  {
    label: "Trajectory",
    key: "trajectory",
    icon: Directions,
  },
];

const TodayTabs = () => {
  const tab = useSearchParams().get("tab");
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(tab ? parseInt(tab) : 0);

  const handleChange = useCallback(
    (event: SyntheticEvent | null, newValue: number) => {
      router.replace(`/home/today?tab=${newValue}`);
      setTabIndex(newValue);
    },
    [router],
  );

  useEffect(() => {
    if (!tab) {
      handleChange(null, tabIndex ?? 0);
    }
  }, [handleChange, tab, tabIndex]);

  return (
    <Box sx={{ width: "100%" }} component={motion.div}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          aria-label="tabs for today view"
          component={motion.div}
        >
          {tabConfig.map((config, index) => (
            <Tab
              key={config.key}
              icon={<config.icon />}
              label={config.label}
              component={motion.div}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ delay: 0.1 * index }}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      <Typography
        component={motion.h5}
        variant="h6"
        textAlign={"right"}
        marginLeft={"12px"}
        fontWeight={600}
        color={"text.secondary"}
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -5, opacity: 0 }}
        transition={{ delay: 0.1 }}
      >
        {format(new Date(), "'Today is' EEEE', the' do 'of' LLLL',' yyyy")}
      </Typography>

      {tabConfig.map((config, index) => (
        <TabPanel key={config.key} index={index} value={tabIndex}>
          {config.label}
        </TabPanel>
      ))}
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<Save />}
      ></SpeedDial>
    </Box>
  );
};

export default TodayTabs;
