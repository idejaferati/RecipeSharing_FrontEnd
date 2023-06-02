import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f2f2f2;
`;

const StyledHeader = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const StyledSection = styled.div`
  margin-bottom: 30px;
  text-align: center;
  width: 100%;
  max-width: 400px;
`;

const StyledLabel = styled.label`
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  text-align: left;
`;

const StyledInput = styled.input`
  margin-bottom: 10px;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled.button`
  margin-top: 10px;
  padding: 12px 20px;
  background-color: #5fd9c2;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const StyledSelect = styled.select`
  margin-top: 10px;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const UserPermissions = () => {
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedPolicy, setSelectedPolicy] = useState("");

  useEffect(() => {
    // Fetch roles
    const fetchRoles = async () => {
      try {
        const jwtToken = Cookies.get("jwtToken");
        const response = await axios.get(
          "https://localhost:7164/api/Auth/getRoles",{
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setRoles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch policies
    const fetchPolicies = async () => {
      try {
        const jwtToken = Cookies.get("jwtToken");
        const response = await axios.get(
          "https://localhost:7164/api/Auth/getPolicies",{
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setPolicies(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoles();
    fetchPolicies();
  }, []);

  const handleDelete = async () => {
    const jwtToken = Cookies.get("jwtToken");
    try {
      const response = await axios.delete(
        `https://localhost:7164/api/Users/${email}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log(response.data); // Success message from the backend
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateRole = async () => {
    try {
      const jwtToken = Cookies.get('jwtToken');
      const response = await axios.post(
        "https://localhost:7164/api/Auth/addRole",
        null,
        {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          
          params: {
            name: selectedRole,
          },
        }
      );
      console.log(response.data); // Success message from the backend
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreatePolicy = async () => {
    try {
      const jwtToken = Cookies.get("jwtToken");
      const response = await axios.post(
        "https://localhost:7164/api/Auth/addPolicy",
        null,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          params: {
            name: selectedPolicy,
          },
        }
      );
      console.log(response.data); // Success message from the backend
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreatePolicyRole = async () => {
    const selectedRoleId = roles.find((role) => role.name === selectedRole)?.id;
    const selectedPolicyId = policies.find(
      (policy) => policy.name === selectedPolicy
    )?.id;

    if (selectedRoleId && selectedPolicyId) {
      try {
        const jwtToken = Cookies.get("jwtToken");
        console.log({
          roleId: selectedRoleId,
          policyId: selectedPolicyId,
        });
        const response = await axios.post(
          "https://localhost:7164/api/Auth/addRolePolicy",
          null,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
            params: {
              roleId: selectedRoleId,
              policyId: selectedPolicyId,
            },
          }
        );
        console.log(response.data); // Success message from the backend
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <StyledContainer>
      <StyledHeader>User Permissions</StyledHeader>

      <StyledSection>
        <StyledLabel>Email:</StyledLabel>
        <StyledInput
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        <StyledButton onClick={handleDelete}>Delete User</StyledButton>
      </StyledSection>

      <hr />

      <StyledSection>
        <StyledLabel>Create Role:</StyledLabel>
        <StyledInput
          type="text"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          placeholder="Enter role name"
        />
        <StyledButton onClick={handleCreateRole}>Add Role</StyledButton>
      </StyledSection>

      <hr />

      <StyledSection>
        <StyledLabel>Create Policy:</StyledLabel>
        <StyledInput
          type="text"
          value={selectedPolicy}
          onChange={(e) => setSelectedPolicy(e.target.value)}
          placeholder="Enter policy name"
        />
        <StyledButton onClick={handleCreatePolicy}>Add Policy</StyledButton>
      </StyledSection>

      <hr />

      <StyledSection>
        <StyledLabel>Add Policy Role:</StyledLabel>
        <StyledSelect
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}>
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </StyledSelect>

        <StyledSelect
          value={selectedPolicy}
          onChange={(e) => setSelectedPolicy(e.target.value)}>
          <option value="">Select Policy</option>
          {policies.map((policy) => (
            <option key={policy.id} value={policy.name}>
              {policy.name}
            </option>
          ))}
        </StyledSelect>

        <StyledButton onClick={handleCreatePolicyRole}>
          Add Policy Role
        </StyledButton>
      </StyledSection>
    </StyledContainer>
  );
};

export default UserPermissions;
