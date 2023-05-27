import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import styled from "styled-components";
import { StyledInput, StyledButton } from "./../shared/shared-style";
import Cookies from "js-cookie";
import axios from "axios";
import InfoSnackbar from "./info-snackbar";

const StyledAddToCollectionSection = styled.div`
  border: 1px dashed green;
  padding: 15px;
`;

const StyledSelect = styled.select`
  height: 36px;
`;

const StyledCollectionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AddToCollectionDialog = (props) => {
  const {
    onClose,
    selectedValue,
    open,
    setShowAddToCollection,
    setSelectedRecipeId,
    selectedRecipeId,
  } = props;
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionDescription, setNewCollectionDescription] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [infoSnackbar, setInfoSnackbar] = useState("");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const jwtToken = Cookies.get("jwtToken");
        await axios
          .get("https://localhost:7164/api/collections/user", {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          })
          .then((res) => {
            setCollections(res.data);
          });
      } catch (error) {
        console.error("Error fetching collections:", error);
        const { status } = error.response;
        if (status === 404) return;
        setInfoSnackbar(error.response);
        setOpenSnackbar(true);
      }
    };

    fetchCollections();
  }, []);

  const handleAddToNewCollection = async () => {
    try {
      const collectionData = {
        name: newCollectionName,
        description: newCollectionDescription,
        recipes: [selectedRecipeId],
      };
      console.log(JSON.stringify(collectionData));
      const jwtToken = Cookies.get("jwtToken");
      await axios
        .post(
          "https://localhost:7164/api/Collections",
          JSON.stringify(collectionData),
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,

              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          const newCollection = response.data;
          setCollections((collections) => [...collections, newCollection]);
          setInfoSnackbar("Added");
          setOpenSnackbar(true);

          // Reset the form fields and selection
          setNewCollectionName("");
          setNewCollectionDescription("");
          setSelectedRecipeId("");
          setShowAddToCollection(false);
          setTimeout(() => {
            handleClose();
          }, 7000);
        });
    } catch (error) {
      console.error("Error creating new collection:", error);
      const { status } = error.response;
      if (status === 404) return;
      setInfoSnackbar(error.response);
      setOpenSnackbar(true);
    }
  };

  const handleAddToExistingCollection = async () => {
    try {
      const collectionId = selectedCollection;
      const recipeId = selectedRecipeId;

      console.log(collectionId, recipeId);
      const jwtToken = Cookies.get("jwtToken");

      await axios
        .post(
          `https://localhost:7164/api/collections/${collectionId}/recipes/addrecipe`,
          null,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
            params: {
              recipeId,
            },
          }
        )
        .then(() => {
          setSelectedRecipeId("");
          setShowAddToCollection(false);
          setInfoSnackbar("Added");
          setOpenSnackbar(true);
          setTimeout(() => {
            handleClose();
          }, 7000);
        });
    } catch (error) {
      console.error("Error adding recipe to existing collection:", error);
      const { status } = error.response;
      if (status === 404) return;
      setInfoSnackbar(error);
      setOpenSnackbar(true);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add To Collection</DialogTitle>
      <StyledAddToCollectionSection>
        <h3>Add to Collection</h3>
        <StyledCollectionContainer>
          <p>Create a new collection:</p>
          <StyledInput
            type="text"
            placeholder="Collection Name"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
          />
          <StyledInput
            type="text"
            placeholder="Collection Description"
            value={newCollectionDescription}
            onChange={(e) => setNewCollectionDescription(e.target.value)}
          />
          <StyledButton
            type="button"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleAddToNewCollection}>
            Create New Collection
          </StyledButton>
        </StyledCollectionContainer>
        {!!collections?.length && (
          <StyledCollectionContainer>
            <p>Choose an existing collection:</p>
            <StyledSelect
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}>
              <option value="">Select a collection</option>
              {collections.map((collection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.name}
                </option>
              ))}
            </StyledSelect>
            <StyledButton
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleAddToExistingCollection}>
              Add to Existing Collection
            </StyledButton>
          </StyledCollectionContainer>
        )}
        <InfoSnackbar
          open={openSnackbar}
          message={infoSnackbar}
          onClose={handleCloseSnackbar}
        />
      </StyledAddToCollectionSection>
    </Dialog>
  );
};

AddToCollectionDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
