import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../auth/api'; // Import your configured Axios instance
import './NewRecipePage.css';

const EditRecipePage = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // State for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // State for loading/error handling
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeForEdit = async () => {
      try {
        const response = await api.get(`/api/recipes/${recipeId}`);
        const recipeToEdit = response.data;

        // Security check: Only the author can edit
        if (!user || user.id !== recipeToEdit.user.id) {
          alert('You do not have permission to edit this recipe.');
          navigate(`/recipes/${recipeId}`);
          return;
        }

        // Populate the form with existing data
        setTitle(recipeToEdit.title);
        setDescription(recipeToEdit.description);
        setImagePreview(recipeToEdit.imageUrl);
      } catch (error) {
        alert('Could not find the recipe.');
        navigate('/recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeForEdit();
  }, [recipeId, user, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) { // Only append the image if a new one was selected
      formData.append('image', image);
    }

    try {
      await api.put(`/api/recipes/${recipeId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Recipe updated successfully!');
      navigate(`/recipes/${recipeId}`);
    } catch (error) {
      alert('Failed to update the recipe.');
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading recipe information...</div>;
  }

  return (
      <div className="new-recipe-container">
        <form onSubmit={handleSubmit} className="new-recipe-form">
          <h2>Edit Recipe</h2>
          <div className="form-group">
            <label htmlFor="title">Recipe Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="image">New Image (Optional)</label>
            <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
          </div>
          {imagePreview && (
              <div className="image-preview-container">
                <p>Image Preview</p>
                <img src={imagePreview} alt="Recipe preview" className="image-preview" />
              </div>
          )}
          <button type="submit" className="submit-btn">Update Recipe</button>
        </form>
      </div>
  );
};

export default EditRecipePage;