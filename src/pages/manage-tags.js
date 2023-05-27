import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ManageTags = () => {
  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [updateTagId, setUpdateTagId] = useState('');
  const [updateTagName, setUpdateTagName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [searchTagId, setSearchTagId] = useState('');
  const [searchedTag, setSearchedTag] = useState(null);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get('https://localhost:7164/api/tag');
      setTags(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleTagSubmit = async (e) => {
    e.preventDefault();

    if (!newTagName) return;

    try {
      const jwtToken = Cookies.get('jwtToken');
      const jsonData = {
        name: newTagName,
      };

      const response = await axios.post(
        'https://localhost:7164/api/tag',
        JSON.stringify(jsonData),
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setNewTagName('');
      fetchTags();
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  const handleTagDelete = async (tagId) => {
    try {
      
      const jwtToken = Cookies.get('jwtToken');

      await axios.delete(`https://localhost:7164/api/tag`,
                    null ,
                    {
                      headers: {
                        Authorization: `Bearer ${jwtToken}`,
                      },params: {
                        tagId
                            }});

      fetchTags();
    } catch (error) {
      console.error('Error deleting tag:', error);
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
      const jwtToken = Cookies.get('jwtToken');
      const jsonData = {
        id: updateTagId,
        name: updateTagName,
      };

      const response = await axios.put(
        'https://localhost:7164/api/tag',
        JSON.stringify(jsonData),
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setUpdateTagId('');
      setUpdateTagName('');
      fetchTags();
      setShowUpdateForm(false);
    } catch (error) {
      console.error('Error updating tag:', error);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (!searchTagId) return;

    try {
      const jwtToken = Cookies.get('jwtToken');
      const response = await axios.get(
        `https://localhost:7164/api/tag/${searchTagId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      setSearchedTag(response.data);
      setSearchTagId('');
    } catch (error) {
      console.error('Error searching tag:', error);
      setSearchedTag(null);
      setSearchTagId('');
    }
  };

  return (
    <div>
      <h2>Tag List</h2>

      <form onSubmit={handleSearchSubmit}>
        <h3>Search Tag by ID</h3>
        <input
          type="text"
          value={searchTagId}
          onChange={(e) => setSearchTagId(e.target.value)}
          placeholder="Enter tag ID"
        />
        <button type="submit">Search</button>
      </form>

      {searchedTag ? (
        <div>
          <h3>Search Result</h3>
          <div>
            <span>ID: {searchedTag.id}</span>
            <span>Name: {searchedTag.name}</span>
            <button onClick={() => handleTagUpdate(searchedTag)}>Update</button>
            <button onClick={() => handleTagDelete(searchedTag.id)}>Delete</button>
          </div>
        </div>
      ) : null}

      <h3>All Tags</h3>
      {tags.map((tag) => (
        <div key={tag.id}>
          <span>ID: {tag.id}</span>
          <span>Name: {tag.name}</span>
          <button onClick={() => handleTagUpdate(tag)}>Update</button>
          <button onClick={() => handleTagDelete(tag.id)}>Delete</button>
        </div>
      ))}

      {showAddForm ? (
        <form onSubmit={handleTagSubmit}>
          <h3>Add Tag</h3>
          <input
            type="text"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            placeholder="Enter tag name"
          />
          <button type="submit">Add Tag</button>
        </form>
      ) : (
        <button onClick={() => setShowAddForm(true)}>Add Tag</button>
      )}

      {showUpdateForm ? (
        <form onSubmit={handleUpdateSubmit}>
          <h3>Update Tag</h3>
          <input
            type="text"
            value={updateTagName}
            onChange={(e) => setUpdateTagName(e.target.value)}
            placeholder="Enter updated tag name"
          />
          <button type="submit">Update Tag</button>
        </form>
      ) : null}
    </div>
  );
};

export default ManageTags;