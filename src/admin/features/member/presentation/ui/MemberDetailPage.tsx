import {
  Avatar,
  Card,
  Typography,
  Box,
  SnackbarCloseReason,
  List,
  Backdrop,
  CircularProgress,
  Divider,
  Chip,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import {
  DeleteMemberComponent,
  SetGuildComponent,
  SetRoleComponent,
  useMemberStore,
} from "..";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { useRoleStore } from "../../../role/presentation";
import { useGuildStore } from "../../../guild/presentation";
import {
  BaseConfirmDialog,
  BaseSnackBarComponent,
} from "../../../../common/components";

export const MemberDetailPage = () => {
  const { id } = useParams();

  const [openErrorSnackbar, setErrorSnackbarOpen] = useState(false);

  const [roleId, setRoleId] = useState<number | null>(null);
  const [guildId, setGuildId] = useState<number | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isGuildDialogOpen, setIsGuildDialogOpen] = useState(false);
  const isRoleAdded = useRoleStore((state) => state.isRoleAdded);
  const isRoleDeleted = useRoleStore((state) => state.isRoleDeleted);
  const isGuildAdded = useGuildStore((state) => state.isGuildAdded);
  const isGuildDeleted = useGuildStore((state) => state.isGuildDeleted);

  const isLoading = useMemberStore((state) => state.isLoading);
  const errorMessage = useMemberStore((state) => state.error);
  const member = useMemberStore((state) => state.member);

  const getMemberById = useMemberStore.use.getMembersById();
  const deleteUserRole = useRoleStore.use.deleteUserRole();
  const deleteUserGuild = useGuildStore.use.deleteUserGuild();

  useEffect(() => {
    const fetchMember = async () => {
      if (!isLoading) {
        // Check if it's already loading
        await getMemberById(Number(id));
      }
    };
    fetchMember();
  }, [id, isRoleAdded, isRoleDeleted, isGuildAdded, isGuildDeleted]);

  // observe error state and display error message
  useEffect(() => {
    if (errorMessage) {
      handleSnackbarClick();
    }
  }, [errorMessage]);

  const handleSnackbarClick = () => {
    setErrorSnackbarOpen(true);
  };

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    // do not close the snackbar if the reason is 'clickaway'
    if (reason === "clickaway") {
      return;
    }

    setErrorSnackbarOpen(false);
  };

  const handleRoleOpenDialog = (id: number) => {
    setIsRoleDialogOpen(true);
    setRoleId(id);
  };

  const handleRoleCloseDialog = () => {
    setIsRoleDialogOpen(false);
    setRoleId(null);
  };

  const handleGuildOpenDialog = (id: number) => {
    setIsGuildDialogOpen(true);
    setGuildId(id);
  };

  const handleGuildCloseDialog = () => {
    setIsGuildDialogOpen(false);
    setGuildId(null);
  };

  const handleDeleteUserRole = async () => {
    await deleteUserRole({ userId: Number(id), roleId: roleId ?? 0 });
    setIsRoleDialogOpen(false);
  };

  const handleDeleteUserGuild = async () => {
    await deleteUserGuild({ userId: Number(id), guildId: guildId ?? 0 });
    setIsGuildDialogOpen(false);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, m: 2 }}>
      <Typography variant="h3">Member Detail</Typography>
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      ) : null}

      <Card sx={{ maxWidth: 600, margin: "auto", mt: 5, p: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <List>
            <Avatar
              sx={{ width: 80, height: 80 }}
              alt={member?.name}
              src={member?.photo || ""}
            >
              {member?.name.charAt(0)}
            </Avatar>
          </List>

          <List>
            <Typography variant="h5" gutterBottom>
              {member?.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Email: {member?.email}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Phone: {member?.phoneNumber || "N/A"}
            </Typography>

            <Box
              sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
            >
              <Typography variant="body1" color="text.secondary">
                Roles:
              </Typography>
              {member?.role.map((r) => (
                <Chip
                  key={r.id}
                  label={r.name}
                  color="success"
                  size="small"
                  deleteIcon={<DeleteIcon />}
                  onDelete={() => handleRoleOpenDialog(r.id)}
                  sx={{ p: 1, m: 0.2 }}
                />
              ))}
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
            >
              <Typography variant="body1" color="text.secondary">
                Guilds:
              </Typography>
              {member?.guild.map((r) => (
                <Chip
                  key={r.id}
                  label={r.name}
                  color="success"
                  size="small"
                  deleteIcon={<DeleteIcon />}
                  onDelete={() => handleGuildOpenDialog(r.id)}
                  sx={{ p: 1, m: 0.2 }}
                />
              ))}
            </Box>

            <Typography variant="body1" color="text.secondary">
              Church: {member?.church.name} ({member?.church.timeZone})
            </Typography>
          </List>
        </Grid>

        <Divider sx={{ mt: 2, mb: 2 }} />

        {/* Display member roles */}
        <SetRoleComponent />

        <Divider sx={{ mt: 2, mb: 2 }} />

        {/* Display member guilds */}
        <SetGuildComponent />

        {/* Display member delete button */}
        <DeleteMemberComponent id={Number(id)} />
      </Card>

      {/* Dialog component */}
      <BaseConfirmDialog
        title="Delete Role"
        description="Are you sure you want to delete this role from user?"
        open={isRoleDialogOpen}
        onCancel={handleRoleCloseDialog}
        onConfirm={handleDeleteUserRole}
      />

      {/* Dialog component */}
      <BaseConfirmDialog
        title="Delete Guild"
        description="Are you sure you want to delete this guild from user?"
        open={isGuildDialogOpen}
        onCancel={handleGuildCloseDialog}
        onConfirm={handleDeleteUserGuild}
      />

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
    </Box>
  );
};

export default MemberDetailPage;
