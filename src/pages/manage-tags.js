import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { API_PATH } from "../constants";
import styled from "styled-components";
import {
  StyledButton,
  StyledButtonsContainer,
  StyledInput,
} from "../shared/shared-style";
import { ContentContainer } from "../shared/shared-style";

const StyledTagContainer = styled.div`
  background: #f8ecdb9c;
  padding: 10px;
  border-radius: 10px;
  margin: 10px 0;
  display: grid;
`;

const StyledForm = styled.form`
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
`;

const StyledBtn = styled(StyledButton)`
  margin: 10px !important;
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

const StyledAddFormContainer = styled.div`
  margin-top: 20px;
`;

const StyledAddForm = styled.form`
  display: flex;
  align-items: center;
`;

const StyledAddInput = styled.input`
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const StyledAddButton = styled.button`
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

const StyledUpdateFormContainer = styled.div`
  margin-top: 20px;
`;

const StyledUpdateForm = styled.form`
  display: flex;
  align-items: center;
`;

const StyledUpdateInput = styled.input`
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const StyledUpdateButton = styled.button`
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

const StyledSearchFormContainer = styled.div`
  margin-top: 20px;
`;

const StyledSearchForm = styled.form`
  display: flex;
  align-items: center;
`;

const StyledSearchInput = styled.input`
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ManageTags = () => {
  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [updateTagId, setUpdateTagId] = useState("");
  const [updateTagName, setUpdateTagName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [searchTagId, setSearchTagId] = useState("");
  const [searchedTag, setSearchedTag] = useState(null);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const jwtToken = Cookies.get("jwtToken");
      const response = await axios.get(API_PATH + "tag", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setTags(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleTagSubmit = async (e) => {
    e.preventDefault();

    if (!newTagName) return;

    try {
      const jwtToken = Cookies.get("jwtToken");
      const jsonData = {
        name: newTagName,
      };

      const response = await axios.post(
        API_PATH + "tag",
        JSON.stringify(jsonData),
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setNewTagName("");
      fetchTags();
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  };

  const handleTagDelete = async (tagId) => {
    try {
      const jwtToken = Cookies.get("jwtToken");

      await axios.delete(API_PATH + `tag`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params: {
          id: tagId,
        },
      });

      fetchTags();
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  const handleTagUpdate = (tag) => {
    setUpdateTagId(tag.id);
    setUpdateTagName(tag.name);
    setShowUpdateForm(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const jwtToken = Cookies.get("jwtToken");
      const jsonData = {
        id: updateTagId,
        name: updateTagName,
      };

      const response = await axios.put(
        API_PATH + "tag",
        JSON.stringify(jsonData),
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setUpdateTagId("");
      setUpdateTagName("");
      fetchTags();
      setShowUpdateForm(false);
    } catch (error) {
      console.error("Error updating tag:", error);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (!searchTagId) return;

    try {
      const jwtToken = Cookies.get("jwtToken");
      const response = await axios.get(API_PATH + `tag/${searchTagId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      setSearchedTag(response.data);
      setSearchTagId("");
    } catch (error) {
      console.error("Error searching tag:", error);
      setSearchedTag(null);
      setSearchTagId("");
    }
  };

  return (
    <ContentContainer>
      <h2>Tag List</h2>

      <form onSubmit={handleSearchSubmit}>
        <h3>Search Tag by ID</h3>
        <StyledInput
          type="text"
          style={{ marginRight: "10px" }}
          value={searchTagId}
          onChange={(e) => setSearchTagId(e.target.value)}
          placeholder="Enter tag ID"
        />
        <StyledButton variant="contained" type="submit">
          Search
        </StyledButton>
      </form>

      {searchedTag ? (
        <div>
          <h3>Search Result</h3>
          <div>
            <span>
              <b>ID:</b> {searchedTag.id}
            </span>
            <span>
              <b>Name:</b> {searchedTag.name}
            </span>
            <button onClick={() => handleTagUpdate(searchedTag)}>Update</button>
            <button onClick={() => handleTagDelete(searchedTag.id)}>
              Delete
            </button>
          </div>
        </div>
      ) : null}

      <h3>All Tags</h3>
      {tags.map((tag) => (
        <StyledTagContainer key={tag.id}>
          <span>ID: {tag.id}</span>
          <span>Name: {tag.name}</span>
          <StyledButtonsContainer>
            <StyledButton
              onClick={() => handleTagUpdate(tag)}
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}>
              Update
            </StyledButton>
            <StyledButton
              onClick={() => handleTagDelete(tag.id)}
              variant="outlined"
              color="error"
              sx={{ mt: 3, mb: 2 }}>
              Delete
            </StyledButton>
          </StyledButtonsContainer>
        </StyledTagContainer>
      ))}

      {showAddForm ? (
        <StyledForm onSubmit={handleTagSubmit}>
          <h3>Add Tag</h3>
          <StyledInput
            type="text"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            placeholder="Enter tag name"
          />
          <StyledBtn type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add Tag
          </StyledBtn>
        </StyledForm>
      ) : (
        <StyledButton
          onClick={() => setShowAddForm(true)}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}>
          Add Tag
        </StyledButton>
      )}

      {showUpdateForm ? (
        <StyledForm onSubmit={handleUpdateSubmit}>
          <h3>Update Tag</h3>
          <StyledInput
            type="text"
            value={updateTagName}
            onChange={(e) => setUpdateTagName(e.target.value)}
            placeholder="Enter updated tag name"
          />
          <StyledBtn type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Update Tag
          </StyledBtn>
        </StyledForm>
      ) : null}
    </ContentContainer>
  );
};

export default ManageTags;
