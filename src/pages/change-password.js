import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import { StyledButton } from "./../shared/shared-style";
import InfoSnackbar from "./../components/info-snackbar";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";
import { API_PATH } from "../constants";
import useAuth from "./../components/hooks/use-auth";
import { StyledErrorMessage } from "./../shared/shared-style";

const StyledContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const StyledTitle = styled.h2`
  margin-bottom: 20px;
`;

const StyledLabel = styled.label`
  font-weight: bold;
`;

const StyledSuccessMessage = styled.p`
  color: green;
  margin-top: 10px;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledField = styled(Field)`
  margin: 10px;
  padding: 10px;
`;

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Required"),
  newPassword: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number"
    ),
});

const ChangePassword = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { auth } = useAuth();
  const role = auth?.role;
  const navigate = useNavigate();

  const jwtToken = Cookies.get("jwtToken");

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    axios
      .patch(API_PATH + "users/change-password", JSON.stringify(values), {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setStatus(response.data.message);
        setSnackbarMessage("Successfully updated!");
        setOpenSnackbar(true);
        setTimeout(
          () => navigate(role === "user" ? "/profile" : "/adminProfile"),
          6000
        );
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
    <StyledContainer>
      <StyledTitle>Change Password</StyledTitle>
      <Formik
        initialValues={{ oldPassword: "", newPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ isSubmitting, status }) => (
          <StyledForm>
            <div>
              <StyledLabel htmlFor="oldPassword">Old Password:</StyledLabel>
              <StyledField
                type="password"
                id="oldPassword"
                name="oldPassword"
                className="input-field"
              />
              <StyledErrorMessage name="oldPassword" component="div" />
            </div>
            <div>
              <StyledLabel htmlFor="newPassword">New Password:</StyledLabel>
              <StyledField
                type="password"
                id="newPassword"
                name="newPassword"
                className="input-field"
              />
              <StyledErrorMessage name="newPassword" component="div" />
            </div>
            <StyledButton
              style={{ width: "fit-content" }}
              type="submit"
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting}>
              Submit
            </StyledButton>
            {status && <StyledSuccessMessage>{status}</StyledSuccessMessage>}
          </StyledForm>
        )}
      </Formik>
      <InfoSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        onClose={handleCloseSnackbar}
      />
    </StyledContainer>
  );
};

export default ChangePassword;
