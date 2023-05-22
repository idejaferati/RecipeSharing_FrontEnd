import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styled from "styled-components";

const StyledContainer = styled.div`
  padding: 20px;
`;

const StyledInput = styled.input`
  margin-bottom: 10px;
  padding: 5px;
`;

const StyledButton = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
`;

const StyledSelect = styled.select`
  margin-top: 10px;
  margin-right: 10px;
  padding: 5px;
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
        const response = await axios.get(
          "https://localhost:7164/api/Auth/getRoles"
        );
        setRoles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch policies
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7164/api/Auth/getPolicies"
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
      const response = await axios.post(
        "https://localhost:7164/api/Auth/addRole",
        null,
        {
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
      const response = await axios.post(
        "https://localhost:7164/api/Auth/addPolicy",
        null,
        {
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
        console.log({
          roleId: selectedRoleId,
          policyId: selectedPolicyId,
        });
        const response = await axios.post(
          "https://localhost:7164/api/Auth/addRolePolicy",
          null,
          {
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
      <StyledInput
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <StyledButton onClick={handleDelete}>Delete User</StyledButton>

      <hr />

      <StyledInput
        type="text"
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
        placeholder="Enter role name"
      />
      <StyledButton onClick={handleCreateRole}>Add Role</StyledButton>

      <hr />

      <StyledInput
        type="text"
        value={selectedPolicy}
        onChange={(e) => setSelectedPolicy(e.target.value)}
        placeholder="Enter policy name"
      />
      <StyledButton onClick={handleCreatePolicy}>Add Policy</StyledButton>

      <hr />

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
    </StyledContainer>
  );
};

export default UserPermissions;
