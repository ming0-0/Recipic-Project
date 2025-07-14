package com.recipe.app.recipe;


import com.recipe.app.service.FileStorageService;
import com.recipe.app.user.User;
import com.recipe.app.user.UserDto;
import com.recipe.app.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "http://localhost:3000") // Allows requests from your React app
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<Recipe> createRecipe(@RequestParam("title") String title,
                                               @RequestParam("description") String description,
                                               @RequestParam("image") MultipartFile image,
                                               Principal principal) {

        // ✅ 3. Find the currently logged-in user from the database
        User currentUser = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found: " + principal.getName()));

        String fileName = fileStorageService.storeFile(image);
        String imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/uploads/")
                .path(fileName)
                .toUriString();
        Recipe recipe = new Recipe();
        recipe.setTitle(title);
        recipe.setDescription(description);
        recipe.setImageUrl(imageUrl);
        // ✅ 4. Set the full User object on the recipe
        recipe.setUser(currentUser);
        Recipe savedRecipe = recipeRepository.save(recipe);

        return new ResponseEntity<>(savedRecipe, HttpStatus.CREATED);
    }


    @GetMapping
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        List<Recipe> recipes = recipeRepository.findAll();
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        Optional<Recipe> recipeOptional = recipeRepository.findById(id);
        return recipeOptional
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}") // Use @DeleteMapping for delete operations
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id, Principal principal) {
        // 1. Verify the user exists
        User currentUser = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // 2. Find the recipe
        return recipeRepository.findById(id)
                .map(recipe -> {
                    // 3. Check if the current user is the author
                    if (!recipe.getUser().getId().equals(currentUser.getId())) {
                        // If not the author, return 403 Forbidden
                        return new ResponseEntity<Void>(HttpStatus.FORBIDDEN);
                    }
                    recipeRepository.deleteById(id);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PutMapping("/{id}")
    public ResponseEntity<Recipe> updateRecipe(@PathVariable Long id,
                                               @RequestParam("title") String title,
                                               @RequestParam("description") String description,
                                               @RequestParam(value = "image", required = false) MultipartFile image,
                                               Principal principal) {
        // 1. Verify the current user exists
        User currentUser = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // 2. Find the recipe to be updated
        return recipeRepository.findById(id)
                .map(recipe -> {
                    // 3. Verify the current user is the author
                    if (!recipe.getUser().getId().equals(currentUser.getId())) {
                        // If not the author, return 403 Forbidden
                        return new ResponseEntity<Recipe>(HttpStatus.FORBIDDEN);
                    }

                    recipe.setTitle(title);
                    recipe.setDescription(description);

                    if (image != null && !image.isEmpty()) {
                        String fileName = fileStorageService.storeFile(image);
                        String imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                                .path("/uploads/")
                                .path(fileName)
                                .toUriString();
                        recipe.setImageUrl(imageUrl);
                    }
                    Recipe updatedRecipe = recipeRepository.save(recipe);
                    return ResponseEntity.ok(updatedRecipe);

                }).orElseGet(() -> ResponseEntity.notFound().build()); // If recipe not found, return 404
    }
}