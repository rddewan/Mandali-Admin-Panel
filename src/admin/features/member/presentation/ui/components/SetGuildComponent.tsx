import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SnackbarCloseReason,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useMemberStore } from "../..";
import { useGuildStore } from "../../../../guild/presentation";
import { BaseSnackBarComponent } from "../../../../../common/components";



const SetGuildComponent = () => {
  const [guildAddedSnackBarOpen, setGuildAddedSnackBarOpen] = useState(false);
  const [guildRemovedSnackBarOpen, setGuildRemovedSnackBarOpen] = useState(false);
  
  const guilds = useGuildStore((state) => state.guilds);
  const getGuilds = useGuildStore.use.getGuilds();
  const selectedGuild = useGuildStore((state) => state.selectedGuild);
  const setUserGuild = useGuildStore.use.setUserGuild();
  const member = useMemberStore((state) => state.member);
  const isGuildAdded = useGuildStore((state) => state.isGuildAdded);
  const isGuildDeleted = useGuildStore((state) => state.isGuildDeleted);

  useEffect(() => {
    const fetchGuilds = async () => {
      if (guilds.length === 0) {
        // call only if roles are empty
        await getGuilds();
      }
    };

    fetchGuilds();
  });

  // observe guild state and display snackbar
  useEffect(() => {
    if (isGuildAdded) {
      setGuildAddedSnackBarOpen(true);
    }
  }, [isGuildAdded]);

  // observe guild state and display snackbar
  useEffect(() => {
    if (isGuildDeleted) {
      setGuildRemovedSnackBarOpen(true);
    }
  }, [isGuildDeleted]);

  const handleGuildChange = (event: SelectChangeEvent) => {
    const newGuild = event.target.value;
    setUserGuild(
      {
        userId: Number(member?.id),
        guildId: Number(newGuild),
      },
      newGuild
    );
  };

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    // do not close the snackbar if the reason is 'clickaway'
    if (reason === "clickaway") {
      return;
    }
    setGuildAddedSnackBarOpen(false);
    setGuildRemovedSnackBarOpen(false);
  };

  return (
    <Box>
      <Typography variant="h6" component="div" gutterBottom>
        Set Member Guilds
      </Typography>
      <FormControl required sx={{ m: 1, minWidth: 160 }} size="small">
        <InputLabel id="select-guild-label">Guild</InputLabel>
        <Select
          id="guild-select"
          name="guild"
          labelId="select-guild-label"
          value={selectedGuild ? selectedGuild : ""}
          label="Guild*"
          onChange={handleGuildChange}
        >
          {guilds.map((guild, index) => (
            <MenuItem key={index} value={guild.id}>
              {guild.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Snackbar component  when guild is added to user */}
      {
        isGuildAdded && (
          <BaseSnackBarComponent
            message={"Guild is added to this user."}
            autoHideDuration={6000}
            severity="success"
            open={guildAddedSnackBarOpen}
            onClose={handleSnackbarClose}
          /> 
        )
      }

      {/* Snackbar component  when guild is deleted from user */}
      {
        isGuildDeleted && (
          <BaseSnackBarComponent
            message={"Guild is deleted from this user."}
            autoHideDuration={6000}
            severity="success"
            open={guildRemovedSnackBarOpen}
            onClose={handleSnackbarClose}
          />        
        )  
      }
      
    </Box>
  );
};

export default SetGuildComponent;
