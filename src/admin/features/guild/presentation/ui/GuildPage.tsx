import {
  Alert,
  Backdrop,
  Box,
  Card,
  CardHeader,
  CircularProgress,
  List,
  Slide,
  Snackbar,
  SnackbarCloseReason,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useGuildStore } from "..";
import Grid from "@mui/material/Grid2";

export const GuildPage = () => {
  const [open, setOpen] = useState(false);
  const isLoading = useGuildStore((state) => state.isLoading);
  const guilds = useGuildStore((state) => state.guilds);
  const errorMessage = useGuildStore((state) => state.error);
  const getGuilds = useGuildStore.use.getGuilds();

  useEffect(() => {
    const fetchGuilds = async () => {
      if (!isLoading && guilds.length === 0) {
        // Check if it's already loading or data exists
        await getGuilds();
      }
    };

    fetchGuilds();
  }, [isLoading, guilds.length, getGuilds]);

  const handleSnackbarClick = () => {
    setOpen(true);
  };

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    // do not close the snackbar if the reason is 'clickaway'
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // observe error state and display error message
  useEffect(() => {
    if (errorMessage) {
      handleSnackbarClick();
    }
  }, [errorMessage]);

  return (
    <Box component="main" sx={{ flexGrow: 1, m: 2 }}>
      <Typography variant="h3">Guild Page</Typography>

      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress />
        </Backdrop>
      ) : null}

      <Grid>
        <List>
          {guilds.map((role, index) => (
            <Card
              key={index}
              raised={true}
              sx={{
                mb: 2,
                p: 2,
              }}
            >
              <CardHeader title={role.name} />
            </Card>
          ))}
        </List>
      </Grid>

      {/* Display global error */}
      {errorMessage && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          TransitionComponent={Slide}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};
