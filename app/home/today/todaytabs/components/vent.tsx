"use client";

import { useEffect, useMemo, useState } from "react";
import { getVentForDate } from "../../actions";
import { vent } from "@prisma/client";

import { Box, Typography, TextField, Skeleton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { useAuthStore } from "@/lib/providers/auth.store.provider";

const Vent = () => {
  const [ventForDate, setVentForDate] = useState(
    undefined as vent | undefined | null,
  );
  const userId = useAuthStore((state) => state.user?.id);

  useEffect(() => {
    if (ventForDate === undefined) {
      getVentForDate(new Date(), userId).then((vent) => {
        setVentForDate(vent);
      });
    }
  }, [userId, ventForDate]);

  return (
    <Box margin={"8px"} marginLeft={"15px"}>
      <Grid container flexDirection={"column"}>
        <Grid>
          <Typography variant="h1">Vent:</Typography>
        </Grid>
        <Grid>
          {ventForDate ? (
            <TextField
              multiline
              fullWidth
              rows={12}
              onChange={(e) =>
                setVentForDate({ ...ventForDate, content: e.target.value })
              }
              value={ventForDate.content || ""}
              placeholder="Write about what is making you angry today. Get out all the chaos in your head. You can't reflect very well if there's something bugging you. So even if you're having a good day, just vent. Get it out."
            />
          ) : (
            <Skeleton variant="rectangular" width={"100%"} height={200} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Vent;
