import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledFormContainer = styled.div`
  display: flex;
  margin-top: 30px;
  gap: 10px;
  flex-direction: column;
`;

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = Cookies.get("jwtToken");
        const response = await axios.get(
          "https://localhost:7164/api/users/my-data",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
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
      await axios.put(
        "https://localhost:7164/api/users/update-user",
        JSON.stringify(values),
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("User data updated successfully!");
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
    <div>
      <h2>User Data</h2>
      <p>First Name: {userData.firstName}</p>
      <p>Last Name: {userData.lastName}</p>
      <p>Email: {userData.email}</p>
      <p>Gender: {userData.gender}</p>
      <p>Phone Number: {userData.phoneNumber}</p>

      {!showForm && (
        <div>
          <Button
            type="button"
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleEditClick}>
            Update Data
          </Button>
        </div>
      )}

      {showForm && (
        <StyledFormContainer>
          <div>Form</div>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
            </div>

            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
            </div>

            <div>
              <label htmlFor="gender">Gender:</label>
              <input
                id="gender"
                name="gender"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
              />
            </div>

            <div>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
            </div>

            <div>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Update
              </Button>
              <Button
                type="button"
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </StyledFormContainer>
      )}
      <Button
        type="button"
        onClick={() => navigate("/changePassword")}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}>
        Go to change password
      </Button>
    </div>
  );
};

export default Profile;
