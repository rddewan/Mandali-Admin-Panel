import {
  Avatar,
  Backdrop,
  Box,
  Card,
  CardHeader,
  CircularProgress,
  IconButton,
  List,
  SnackbarCloseReason,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import useMemberStore from "../store/member-store";
import { RefreshOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { BaseSnackBarComponent } from "../../../../common/components";

const MembersListPage = () => {
  const navigate = useNavigate();

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const deleteSnackbarOpen = useMemberStore(
    (state) => state.deleteSnackbarOpen
  );
  const setDeleteMemberSnackbarOpen =
    useMemberStore.use.setDeleteMemberSnackbarOpen();

  const isLoading = useMemberStore((state) => state.isLoading);
  const isMemberDeleted = useMemberStore((state) => state.isMemberDeleted);
  const members = useMemberStore((state) => state.members);
  const errorMessage = useMemberStore((state) => state.error);

  const getUsersByChurch = useMemberStore.use.getMembersByChurch();

  useEffect(() => {
    // check if member is deleted
    if (isMemberDeleted) {      
      setDeleteMemberSnackbarOpen(true);
    }
    // fetch members when the component mounts
    const fetchMembers = async () => {
      if (!isLoading && members.length === 0) {
        // Check if it's already loading or data exists
        await getUsersByChurch();
      }
    };
    fetchMembers();
  }, [getUsersByChurch, isLoading, isMemberDeleted]);

  const handleErrorSnackbarOpen = () => {
    setOpenErrorSnackbar(true);
  };

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    // do not close the snackbar if the reason is 'clickaway'
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorSnackbar(false);
    setDeleteMemberSnackbarOpen(false);
  };

  // observe error state and display error message
  useEffect(() => {
    if (errorMessage) {
      handleErrorSnackbarOpen();
    }
  }, [errorMessage]);

  const navigateToMemberDetails = (id: number) => { 
    // navigate to the member details page
    navigate(`/dashboard/members/${id}`);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, m: 2 }}>
      <Typography variant="h1">Members</Typography>

      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}

      <IconButton color="primary" onClick={getUsersByChurch}>
        <RefreshOutlined />
      </IconButton>

      <Grid>
        <List dense={true}>
          {members.map((member) => (
            <Card
              key={member.id}
              raised={true}
              onClick={() => navigateToMemberDetails(member.id)}
              sx={{
                mb: 2,
                p: 2,
              }}
            >
              <CardHeader
                avatar={
                  <Avatar alt={member.name} src={member.photo ?? undefined} />
                }
                title={member.name}
                subheader={member.email}
              />
            </Card>
          ))}
        </List>
      </Grid>

      {/* Display global error */}
      {errorMessage && (
        <BaseSnackBarComponent
          message={errorMessage}
          autoHideDuration={6000}
          severity="error"
          open={openErrorSnackbar}
          onClose={handleSnackbarClose}
        />
      )}

      {/* Display member deleted message */}
      {isMemberDeleted && (
        <BaseSnackBarComponent
          message="Member deleted successfully"
          severity="success"
          open={deleteSnackbarOpen}
          onClose={handleSnackbarClose}
        />
      )}
    </Box>
  );
};

export default MembersListPage;
