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
        String username = authentication.getName();

        User user = userService.findByUsername(username)
                .orElseThrow(() -> new IllegalStateException("User not found"));
        UserDto userDto = new UserDto(user.getId(), user.getUsername(), user.getName(), user.getEmail());
        return ResponseEntity.ok(userDto);
    }
}