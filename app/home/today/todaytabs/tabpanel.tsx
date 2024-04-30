import { ReactNode, useMemo } from "react";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import usePrevious from "@/lib/hooks/usePrevious";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => {
  const previousValue = usePrevious(value);
  return (
    <motion.div
      //   style={{ backgroundColor: "red" }}
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      hidden={value !== index}
      {...other}
    >
      <AnimatePresence>
        {value === index ? (
          <Box
            layout
            component={motion.div}
            initial={{
              height: 0,
              opacity: 0,
              y: (previousValue ?? 0) < value ? 100 : -100,
            }}
            animate={{ height: "100%", opacity: 1, y: 0 }}
            exit={{
              height: 0,
              opacity: 0,
              y: (previousValue ?? 0) > value ? 100 : -100,
            }}
          >
            {children}
          </Box>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

export default TabPanel;
