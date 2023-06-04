import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import styled from "styled-components";
import { StyledInput, StyledButton } from "./../shared/shared-style";
import Cookies from "js-cookie";
import axios from "axios";
import { API_PATH } from "../constants";

const StyledAddToCookbookSection = styled.div`
  border: 1px dashed green;
  padding: 15px;
`;

const StyledSelect = styled.select`
  height: 36px;
`;

const StyledCookbookContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AddToCookbookDialog = (props) => {
  const {
    onClose,
    selectedValue,
    open,
    setShowAddToCookbook,
    setSelectedRecipeId,
    selectedRecipeId,
  } = props;
  const [cookbooks, setCookbooks] = useState([]);
  const [selectedCookbook, setSelectedCookbook] = useState("");
  const [newCookbookName, setNewCookbookName] = useState("");
  const [newCookbookDescription, setNewCookbookDescription] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [infoSnackbar, setInfoSnackbar] = useState("");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  useEffect(() => {
    const fetchCookbooks = async () => {
      try {
        const jwtToken = Cookies.get("jwtToken");
        const res = await axios.get(API_PATH + "cookbooks/all/user", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setCookbooks(res.data);
      } catch (error) {
        console.error("Error fetching cookbooks:", error);
        const { status } = error.response;
        if (status === 404) return;
        setInfoSnackbar(error.response);
        setOpenSnackbar(true);
      }
    };

    fetchCookbooks();
  }, []);

  const handleAddToNewCookbook = async () => {
    try {
      const cookbookData = {
        name: newCookbookName,
        description: newCookbookDescription,
        recipes: [selectedRecipeId],
      };
      console.log(JSON.stringify(cookbookData));
      const jwtToken = Cookies.get("jwtToken");
      const response = await axios.post(
        API_PATH + "cookbooks",
        JSON.stringify(cookbookData),
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const newCookbook = response.data;
      setCookbooks((cookbooks) => [...cookbooks, newCookbook]);
      setInfoSnackbar("Added");
      setOpenSnackbar(true);
      // Reset the form fields and selection
      setNewCookbookName("");
      setNewCookbookDescription("");
      setSelectedRecipeId("");
      setShowAddToCookbook(false);
      setTimeout(() => {
        handleClose();
      }, 7000);
    } catch (error) {
      console.error("Error creating new cookbook:", error);
      const { status } = error.response;
      if (status === 404) return;
      setInfoSnackbar(error.response);
      setOpenSnackbar(true);
    }
  };

  const handleAddToExistingCookbook = async () => {
    try {
      const jwtToken = Cookies.get("jwtToken");
      const cookBookId = selectedCookbook;
      const recipeId = selectedRecipeId;
      //const recipeId = editingRecipe.id;
      await axios.put(API_PATH + `cookbooks/addRecipe`, null, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params: {
          cookBookId,
          recipeId,
        },
      });

      // Reset the form
      setSelectedRecipeId("");
      setSelectedCookbook("");
      setShowAddToCookbook(false);
    } catch (error) {
      console.error("Error adding recipe to existing cookbook:", error);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add To Cookbook</DialogTitle>
      <StyledAddToCookbookSection>
        <h3>Add to Cookbook</h3>
        <StyledCookbookContainer>
          <p>Create a new cookbook:</p>
          <StyledInput
            type="text"
            placeholder="Cookbook Name"
            value={newCookbookName}
            onChange={(e) => setNewCookbookName(e.target.value)}
          />
          <StyledInput
            type="text"
            placeholder="Cookbook Description"
            value={newCookbookDescription}
            onChange={(e) => setNewCookbookDescription(e.target.value)}
          />
          <StyledButton
            type="button"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleAddToNewCookbook}>
            Create New Cookbook
          </StyledButton>
        </StyledCookbookContainer>
        {/*allows the user to choose an existing cookbook to add the recipe to*/}
        {!!cookbooks?.length && (
          <StyledCookbookContainer>
            <p>Choose an existing cookbook:</p>
            <StyledSelect
              value={selectedCookbook}
              onChange={(e) => setSelectedCookbook(e.target.value)}>
              <option value="">Select a cookbook</option>
              {/*allows the user to see a list of available cookbooks to choose from in the select dropdown*/}
              {cookbooks.map((cookbook) => (
                <option key={cookbook.id} value={cookbook.id}>
                  {cookbook.name}
                </option>
              ))}
            </StyledSelect>
            <StyledButton
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleAddToExistingCookbook}>
              Add to Existing Cookbook
            </StyledButton>
          </StyledCookbookContainer>
        )}
      </StyledAddToCookbookSection>
      <div>
        {/* <InfoSnackbar
          open={openSnackbar}
          message={infoSnackbar}
          onClose={handleCloseSnackbar}
        /> */}
      </div>
    </Dialog>
  );
};
