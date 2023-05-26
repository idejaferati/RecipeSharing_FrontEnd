import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import { StyledField, StyledButton } from "./../shared/shared-style";

const ChangePassword = () => {
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
      })
      .catch((error) => {
        console.error("Error:", error);
        setStatus("An error occurred. Please try again.");
      })
      .finally(() => {
        setSubmitting(false);
      });
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
    </div>
  );
};

export default ChangePassword;
