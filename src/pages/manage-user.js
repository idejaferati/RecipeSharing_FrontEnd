
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { registerUser } from "./../service/user-requests.js";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledBlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const StyledUserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const StyledTableHeader = styled.th`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  background-color: #5fd9c2;
  color: white;
  font-weight: bold;
  text-align: left;
`;

const StyledTableData = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const StyledTableRow = styled.tr`
  &:hover {
    background-color: #f2f2f2;
  }
`;

const StyledParagraph = styled.p`
  font-size: 16px;
  font-style: italic;
  color: #888;
`;

const StyledSearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;

  input[type="text"] {
    margin-right: 10px;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

const StyledSearchButton = styled.button`
  padding: 5px 10px;
  background-color: #5fd9c2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #4fc4af;
  }
`;

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [foundUsers, setFoundUsers] = useState(null);
  const [openCreateUserDialog, setOpenCreateUserDialog] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    roleId: "",
    phoneNumber: "",
    password: ""
  });

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7164/api/Users/findAllusers",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (email) => {
    const jwtToken = Cookies.get("jwtToken");
    try {
      await axios.delete(`https://localhost:7164/api/Users/${email}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      // Filter out the deleted user from the state
      setUsers(users.filter((user) => user.email !== email));
      console.log("User deleted successfully.");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearchUser = async () => {
    const jwtToken = Cookies.get("jwtToken");
    try {
      if (searchEmail) {
        await axios
          .get(
            `https://localhost:7164/api/Users/search-by-email/${searchEmail}`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          )
          .then((res) => setFoundUsers(res.data));
      } else {
        setFoundUsers(users);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCreateUser = () => {
    setOpenCreateUserDialog(true);
  };

  const handleCloseCreateUserDialog = () => {
    setOpenCreateUserDialog(false);
  };

  const handleCreateUserSubmit = async () => {
    // Perform the create user API call using the `newUser` state data
    try {
      await axios.post("https://localhost:7164/api/Users/Register", newUser);
      // Optionally, you can update the users list to include the newly created user
       setUsers([...users, newUser]);
      console.log("User created successfully.");
      setOpenCreateUserDialog(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function signUpAsync(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const jsonData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      gender: data.get("gender"),
      email: data.get("email"),
      roleId: data.get("roleId"),
      phoneNumber: data.get("phoneNumber"),
      password: data.get("password"),
    };

    try {
      await axios
        .post(
          "https://localhost:7164/api/Users/Register",
          JSON.stringify(jsonData),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res) {
            console.log(res.data);
            navigate("/login");
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7164/api/Auth/getRoles"
        );
        setRoles(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async (event) => {
    await signUpAsync(event);
  };

  const handleNewUserChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  return (
    <StyledBlogContainer>
      <h1>User Management</h1>
  
      <StyledSearchContainer>
        <input
          type="text"
          placeholder="Search by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <StyledSearchButton onClick={handleSearchUser}>
          Search
        </StyledSearchButton>
      </StyledSearchContainer>
  
      {!!foundUsers ? (
        <div>
          <h2>Found User(s):</h2>
          <StyledUserTable>
            <thead>
              <StyledTableRow>
                <StyledTableHeader>First Name</StyledTableHeader>
                <StyledTableHeader>Last Name</StyledTableHeader>
                <StyledTableHeader>Gender</StyledTableHeader>
                <StyledTableHeader>Date of Birth</StyledTableHeader>
                <StyledTableHeader>Email</StyledTableHeader>
                <StyledTableHeader>Phone Number</StyledTableHeader>
                <StyledTableHeader>Actions</StyledTableHeader>
              </StyledTableRow>
            </thead>
            <tbody>
              {foundUsers.map((foundUser) => (
                <StyledTableRow key={foundUser.id}>
                  <StyledTableData>{foundUser.firstName}</StyledTableData>
                  <StyledTableData>{foundUser.lastName}</StyledTableData>
                  <StyledTableData>{foundUser.gender}</StyledTableData>
                  <StyledTableData>{foundUser.dateOfBirth}</StyledTableData>
                  <StyledTableData>{foundUser.email}</StyledTableData>
                  <StyledTableData>{foundUser.phoneNumber}</StyledTableData>
                  <StyledTableData>
                    <button onClick={() => handleDeleteUser(foundUser.email)}>
                      Delete
                    </button>
                  </StyledTableData>
                </StyledTableRow>
              ))}
            </tbody>
          </StyledUserTable>
        </div>
      ) : (
        <div>
          {users.length > 0 ? (
            <StyledUserTable>
              <thead>
                <StyledTableRow>
                  <StyledTableHeader>First Name</StyledTableHeader>
                  <StyledTableHeader>Last Name</StyledTableHeader>
                  <StyledTableHeader>Gender</StyledTableHeader>
                  <StyledTableHeader>Date of Birth</StyledTableHeader>
                  <StyledTableHeader>Email</StyledTableHeader>
                  <StyledTableHeader>Phone Number</StyledTableHeader>
                  <StyledTableHeader>Actions</StyledTableHeader>
                </StyledTableRow>
              </thead>
              <tbody>
                {users.map((user) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableData>{user.firstName}</StyledTableData>
                    <StyledTableData>{user.lastName}</StyledTableData>
                    <StyledTableData>{user.gender}</StyledTableData>
                    <StyledTableData>{user.dateOfBirth}</StyledTableData>
                    <StyledTableData>{user.email}</StyledTableData>
                    <StyledTableData>{user.phoneNumber}</StyledTableData>
                    <StyledTableData>
                      <button onClick={() => handleDeleteUser(user.email)}>
                        Delete
                      </button>
                    </StyledTableData>
                  </StyledTableRow>
                ))}
              </tbody>
            </StyledUserTable>
          ) : (
            <StyledParagraph>No users found.</StyledParagraph>
          )}
        </div>
      )}
  
      {/* "Create User" button */}
      <Button variant="contained" color="primary" onClick={handleCreateUser}>
        Create User
      </Button>
  
      {/* Dialog for creating user */}
      <Dialog open={openCreateUserDialog} onClose={handleCloseCreateUserDialog}>
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
        <form onSubmit={handleCreateUserSubmit}>
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <TextField
        autoComplete="given-name"
        name="firstName"
        required
        fullWidth
        id="firstName"
        label="First Name"
        autoFocus
        value={newUser.firstName}
        onChange={handleNewUserChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        fullWidth
        id="lastName"
        label="Last Name"
        name="lastName"
        autoComplete="family-name"
        value={newUser.lastName}
        onChange={handleNewUserChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <FormLabel id="gender-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="gender-label"
        name="gender"
        value={newUser.gender}
        onChange={handleNewUserChange}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
      </RadioGroup>
    </Grid>
    <Grid item xs={12}>
      <TextField
        required
        fullWidth
        id="phoneNumber"
        label="Phone Number"
        name="phoneNumber"
        autoComplete="phoneNumber"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        value={newUser.phoneNumber}
        onChange={handleNewUserChange}
      />
    </Grid>
    <Grid item xs={12}>
      <FormControl required fullWidth>
        <InputLabel id="roleId-label">Select Role</InputLabel>
        <Select
          labelId="roleId-label"
          id="roleId"
          name="roleId"
          value={newUser.roleId}
          onChange={handleNewUserChange}
        >
          {roles.map((role) => (
            <MenuItem key={role.id} value={role.id}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <TextField
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={newUser.email}
        onChange={handleNewUserChange}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="new-password"
        value={newUser.password}
        onChange={handleNewUserChange}
      />
    </Grid>
  </Grid>
</form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateUserDialog}>Cancel</Button>
          <Button onClick={handleCreateUserSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </StyledBlogContainer>
  );}

  export default ManageUser;