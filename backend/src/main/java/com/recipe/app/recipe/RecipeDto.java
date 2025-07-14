package com.recipe.app.recipe;

import com.recipe.app.user.User;
import com.recipe.app.user.UserDto;

public  record RecipeDto(Long id, String description, String img_url, String title, UserDto user) {
}
