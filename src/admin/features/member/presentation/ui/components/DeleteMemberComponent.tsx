import { Button, CardActions } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMemberStore } from "../..";
import { BaseConfirmDialog } from "../../../../../common/components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const DeleteMemberComponent = ({ id }: { id: number }) => {
  const navigate = useNavigate();
  const [isDeleteMemberDialogOpen, setIsDeleteMemberDialogOpen] = useState(false);
  
  const deleteMember = useMemberStore.use.deleteMember();
  const setMemberDeleted = useMemberStore.use.setMemberDeleted();
  const isMemberDeleted = useMemberStore((state) => state.isMemberDeleted);

  useEffect(() => {
    if (isMemberDeleted) {
      // close the delete member dialog
      handleDeleteDialogClose();
      // navigate to the member list page
      navigate("/dashboard/members");
      // set isMemberDeleted to false
      setMemberDeleted(false);
    }
  }, [isMemberDeleted, navigate]);

  const handleDeleteMemberDialogOpen = async () => {
    setIsDeleteMemberDialogOpen(true);    
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteMemberDialogOpen(false);
  };

  const handleDeleteMember = async () => {
    await deleteMember(Number(id));
  }

  return (
    <>
      <CardActions sx={{ justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteMemberDialogOpen}
        >
          Delete
        </Button>
      </CardActions>

      {/* Dialog component */}
      <BaseConfirmDialog
        title="Delete Member"
        description="Are you sure you want to delete this member?"
        open={isDeleteMemberDialogOpen}
        onCancel={handleDeleteDialogClose}
        onConfirm={handleDeleteMember}
      />      
    </>
  );
};
export default DeleteMemberComponent;
