import React, { createContext, useContext, useState, useEffect } from 'react';

// createContext에 기본값을 제공하여 Provider 외부에서 사용될 때 앱이 충돌하는 것을 방지합니다.
const defaultContextValue = {
  savedRecipeIds: [],
  saveRecipe: () => console.warn('SavedRecipeProvider 외부에서 saveRecipe가 호출되었습니다.'),
  unsaveRecipe: () => console.warn('SavedRecipeProvider 외부에서 unsaveRecipe가 호출되었습니다.'),
  isRecipeSaved: () => {
    console.warn('SavedRecipeProvider 외부에서 isRecipeSaved가 호출되었습니다.');
    return false;
  },
};
const SavedRecipeContext = createContext(defaultContextValue);

export const useSavedRecipes = () => useContext(SavedRecipeContext);

export const SavedRecipeProvider = ({ children }) => {
  const [savedRecipeIds, setSavedRecipeIds] = useState(() => {
    try {
      const item = window.localStorage.getItem('savedRecipeIds');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error("Failed to parse saved recipes from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('savedRecipeIds', JSON.stringify(savedRecipeIds));
    } catch (error) {
      console.error("Failed to save recipes to localStorage", error);
    }
  }, [savedRecipeIds]);

  const saveRecipe = (recipeId) => {
    setSavedRecipeIds((prevIds) => [...new Set([...prevIds, recipeId])]);
  };

  const unsaveRecipe = (recipeId) => {
    setSavedRecipeIds((prevIds) => prevIds.filter((id) => id !== recipeId));
  };

  const isRecipeSaved = (recipeId) => {
    return savedRecipeIds.includes(recipeId);
  };

  const value = { savedRecipeIds, saveRecipe, unsaveRecipe, isRecipeSaved };

  return (
    <SavedRecipeContext.Provider value={value}>{children}</SavedRecipeContext.Provider>
  );
};