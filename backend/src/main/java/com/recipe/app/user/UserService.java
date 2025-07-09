package com.recipe.app.user;

import java.util.Optional;

public interface UserService {
    Optional<User> findByUsername(String username);
}
