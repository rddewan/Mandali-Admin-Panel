import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const BaseConfirmDialog = ({
  title,
  description,
  open,
  onCancel,
  onConfirm,
}: {
  title: string;
  description: string;
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm} autoFocus>Yes</Button>        
      </DialogActions>
    </Dialog>
  );
};

export default BaseConfirmDialog;
