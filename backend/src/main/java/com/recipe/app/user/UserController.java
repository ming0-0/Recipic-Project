package com.recipe.app.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserServiceImpl userService; // Assuming you have a user service

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser(Authentication authentication) {
        // Spring Security provides the currently authenticated user's principal.
        // The name of the principal is the username you set when creating the JWT.
        String username = authentication.getName();

        // Use the username to fetch the full user details from your database
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        // Map the User entity to a UserDto to avoid exposing sensitive data
        UserDto userDto = new UserDto(user.getId(), user.getUsername(), user.getName(), user.getEmail());

        return ResponseEntity.ok(userDto);
    }
}