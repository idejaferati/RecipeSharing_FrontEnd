import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import { StyledField, StyledButton } from "./../shared/shared-style";
import InfoSnackbar from "./../components/info-snackbar";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const jwtToken = Cookies.get("jwtToken");

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    axios
      .patch(
        "https://localhost:7164/api/users/change-password",
        JSON.stringify(values),
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setStatus(response.data.message);
        setSnackbarMessage("Successfully updated!");
        setOpenSnackbar(true);
        setTimeout(() => navigate("/profile"), 6000);
      })
      .catch((error) => {
        console.error("Error:", error);
        setStatus("An error occurred. Please try again.");
        setSnackbarMessage("An error occurred. Please try again.");
        setOpenSnackbar(true);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <h2>Change Password</h2>
      <Formik
        initialValues={{ oldPassword: "", newPassword: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.oldPassword) {
            errors.oldPassword = "Required";
          }
          if (!values.newPassword) {
            errors.newPassword = "Required";
          }
          return errors;
        }}
        onSubmit={handleSubmit}>
        {({ isSubmitting, status }) => (
          <Form>
            <div>
              <label htmlFor="oldPassword">Old Password: </label>
              <StyledField
                type="password"
                id="oldPassword"
                name="oldPassword"
              />
              <ErrorMessage name="oldPassword" component="div" />
            </div>
            <div>
              <label htmlFor="newPassword">New Password: </label>
              <StyledField
                type="password"
                id="newPassword"
                name="newPassword"
              />
              <ErrorMessage name="newPassword" component="div" />
            </div>
            <StyledButton
              type="submit"
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting}>
              Submit
            </StyledButton>
            {status && <p>{status}</p>}
          </Form>
        )}
      </Formik>
      <InfoSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
};

export default ChangePassword;
