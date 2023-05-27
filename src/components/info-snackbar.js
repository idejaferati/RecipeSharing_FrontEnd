import React from "react";
import Snackbar from "@mui/material/Snackbar";

const InfoSnackbar = ({ open, message, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      message={message}
      action={null}
      onClose={onClose}
    />
  );
};

export default InfoSnackbar;
