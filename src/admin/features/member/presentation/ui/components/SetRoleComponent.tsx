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
import { useRoleStore } from "../../../../role/presentation";
import { useEffect, useState } from "react";
import { useMemberStore } from "../..";
import { BaseSnackBarComponent } from "../../../../../common/components";


const SetRoleComponent = () => {
  const [roleAddedSnackBarOpen, setRoleAddedSnackBarOpen] = useState(false);
  const [roleRemovedSnackBarOpen, setRoleRemovedSnackBarOpen] = useState(false);
  
  const roles = useRoleStore((state) => state.roles);
  const selectedRole = useRoleStore((state) => state.selectedRole);
  const setUserRole = useRoleStore.use.setUserRole();
  const getRoles = useRoleStore.use.getRoles();
  const member = useMemberStore((state) => state.member);
  const isRoleAdded = useRoleStore((state) => state.isRoleAdded);
  const isRoleDeleted = useRoleStore((state) => state.isRoleDeleted);

  useEffect(() => {
    const fetchRoles = async () => {
      if (roles.length === 0) {
        // call only if roles are empty
        await getRoles();
      }
    };

    fetchRoles();
  });

  // observe role state and display snackbar
  useEffect(() => {
    if (isRoleAdded) {
      setRoleAddedSnackBarOpen(true);
    }
  }, [isRoleAdded]);

  // observe role state and display snackbar
  useEffect(() => {
    if (isRoleDeleted) {
      setRoleRemovedSnackBarOpen(true);
    }
  }, [isRoleDeleted]);

  const handleRoleChange = (event: SelectChangeEvent) => {
    const newRole = event.target.value;
    setUserRole(
      {
        userId: Number(member?.id),
        roleId: Number(newRole),
      },
      newRole
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
    setRoleAddedSnackBarOpen(false);
    setRoleRemovedSnackBarOpen(false);
  };

  return (
    <Box>
      <Typography variant="h6" component="div" gutterBottom>
        Set Member Roles
      </Typography>
      <FormControl id="role-form" required sx={{ m: 1, minWidth: 160 }} size="small">
        <InputLabel id="select-role-label">Role</InputLabel>
        <Select
          id="role-select"
          name="role"
          labelId="select-role-label"
          value={selectedRole ? selectedRole : ""}
          label="Role *"
          onChange={handleRoleChange}
        >
          {roles.map((role, index) => (
            <MenuItem key={index} value={role.id}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Snackbar component  when role is added to user */}
      {
        isRoleAdded && (
          <BaseSnackBarComponent
            message={"Role is added to this user."}
            autoHideDuration={6000}
            severity="success"
            open={roleAddedSnackBarOpen}
            onClose={handleSnackbarClose}
          />        
        )
      }

      {/* Snackbar component  when role is deleted from user */}
      {
        isRoleDeleted && (
          <BaseSnackBarComponent
            message={"Role is deleted from this user."}
            autoHideDuration={6000}
            severity="success"
            open={roleRemovedSnackBarOpen}
            onClose={handleSnackbarClose}
          />        
        )        
      }
    </Box>
  );
};

export default SetRoleComponent;
