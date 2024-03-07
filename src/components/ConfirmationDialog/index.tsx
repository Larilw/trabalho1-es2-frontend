import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface ConfirmationDialogProps {
  dialogText: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConfirmationDialog({
  dialogText,
  open,
  setOpen,
  setConfirmation,
}: ConfirmationDialogProps) {
  const handleCancel = () => {
    setConfirmation(false);
    setOpen(false);
  };

  const handleDelete = () => {
    setConfirmation(true);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setConfirmation(false);
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">
          {"Deseja realmente excluir?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button onClick={handleDelete} autoFocus>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
