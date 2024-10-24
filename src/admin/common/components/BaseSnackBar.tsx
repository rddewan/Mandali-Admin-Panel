import { Alert, Slide, Snackbar } from "@mui/material";

const BaseSnackBarComponent = ({
  message,
  autoHideDuration = 6000,
  severity,
  open,
  onClose,
}: {
  message: string;
  autoHideDuration?: number;
  severity: "error" | "success" | "info" | "warning";
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      TransitionComponent={Slide}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%", color: "white" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default BaseSnackBarComponent;
