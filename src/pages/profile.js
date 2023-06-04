import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { API_PATH } from "../constants";
import { StyledButtonsContainer } from "./../shared/shared-style";

const StyledPageContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const StyledSection = styled.div`
  margin: 20px 0;
`;

const StyledFormContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
`;

const StyledFormTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  display: grid;
  gap: 10px;
`;

const StyledFormGroup = styled.div`
  display: grid;
  gap: 5px;
`;

const StyledLabel = styled.label`
  font-weight: bold;
`;

const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledError = styled.div`
  color: red;
  font-size: 14px;
`;

const StyledSuccess = styled.div`
  color: green;
  font-size: 14px;
`;

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  gender: yup.string().required("Gender is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
});

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = Cookies.get("jwtToken");
        const response = await axios.get(API_PATH + "users/my-data", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (values) => {
    try {
      const jwtToken = Cookies.get("jwtToken");
      await axios.put(API_PATH + "users/update-user", JSON.stringify(values), {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      });
      setUserData(values); // Update the user data with the new values
      setShowForm(false); // Hide the form after successful update
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      gender: userData?.gender || "",
      phoneNumber: userData?.phoneNumber || "",
    },
    validationSchema: validationSchema,
    onSubmit: handleUpdate,
  });

  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleEditClick = () => {
    formik.setValues({
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      gender: userData?.gender || "",
      phoneNumber: userData?.phoneNumber || "",
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <StyledPageContainer>
      <StyledSection>
        <h2>User Data</h2>
        <p>First Name: {userData.firstName}</p>
        <p>Last Name: {userData.lastName}</p>
        <p>Email: {userData.email}</p>
        <p>Gender: {userData.gender}</p>
        <p>Phone Number: {userData.phoneNumber}</p>
      </StyledSection>

      {!showForm && (
        <StyledSection>
          <Button type="button" variant="outlined" onClick={handleEditClick}>
            Update Data
          </Button>
        </StyledSection>
      )}

      {showForm && (
        <StyledFormContainer>
          <StyledFormTitle>Update User Data</StyledFormTitle>
          <StyledForm onSubmit={formik.handleSubmit}>
            <StyledFormGroup>
              <StyledLabel htmlFor="firstName">First Name:</StyledLabel>
              <StyledInput
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <StyledError>{formik.errors.firstName}</StyledError>
              )}
            </StyledFormGroup>

            <StyledFormGroup>
              <StyledLabel htmlFor="lastName">Last Name:</StyledLabel>
              <StyledInput
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <StyledError>{formik.errors.lastName}</StyledError>
              )}
            </StyledFormGroup>

            <StyledFormGroup>
              <StyledLabel htmlFor="gender">Gender:</StyledLabel>
              <StyledInput
                id="gender"
                name="gender"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
              />
              {formik.touched.gender && formik.errors.gender && (
                <StyledError>{formik.errors.gender}</StyledError>
              )}
            </StyledFormGroup>

            <StyledFormGroup>
              <StyledLabel htmlFor="phoneNumber">Phone Number:</StyledLabel>
              <StyledInput
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <StyledError>{formik.errors.phoneNumber}</StyledError>
              )}
            </StyledFormGroup>

            <StyledButtonsContainer>
              <Button type="submit" variant="contained">
                Update
              </Button>
              <Button type="button" variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
            </StyledButtonsContainer>
            {formik.status && <StyledSuccess>{formik.status}</StyledSuccess>}
          </StyledForm>
        </StyledFormContainer>
      )}

      <StyledSection>
        <Button
          type="button"
          onClick={() => navigate("/changePassword")}
          variant="contained">
          Go to change password
        </Button>
      </StyledSection>
    </StyledPageContainer>
  );
};

export default Profile;
