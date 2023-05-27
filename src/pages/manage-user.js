import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styled from "styled-components";

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
    </StyledBlogContainer>
  );
};

export default ManageUser;
