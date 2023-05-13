import * as React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";
import { Formik, Field, Form } from "formik";

export function ContactDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Fill your data</DialogTitle>
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "" }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form style={{display: "flex",
            flexDirection: "column",
            rowGap: "10px",
            padding: "10px"}}>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" type="text" style={{height: "26px", width: "200px"}}/>
          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" type="text" style={{height: "26px", width: "200px"}}/>
          <label htmlFor="email">Email</label>
          <Field name="email" type="email" style={{height: "26px", width: "200px"}}/>
          <Button type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              {" "}
              Submit{" "}
            </Button>
        </Form>
      </Formik>
    </Dialog>
  );
}

ContactDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
