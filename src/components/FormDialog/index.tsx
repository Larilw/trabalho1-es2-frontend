import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface FormDialogProps {
  formTitle: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function FormDialog({
  formTitle,
  open,
  setOpen,
  setConfirmation,
  children,
}: FormDialogProps) {
  const handleCancel = () => {
    setConfirmation(false);
    setOpen(false);
  };

  const handleSave = () => {
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
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button type="submit" onClick={handleSave}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
