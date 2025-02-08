package org.example.serviceplatform;

import org.example.serviceplatform.AppUser;
import org.example.serviceplatform.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller; // Make sure to import this
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController // Changed from @RestController to @Controller
@RequestMapping("/users")
//@CrossOrigin(origins = "http://react_frontend:80")
@CrossOrigin(origins = "http://localhost:3000")

public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public String showHomepage() {
        return "index"; // Return view name without .html
    }

    @GetMapping("/adduser/new")
    public String showCreateUserForm(Model model) {
        model.addAttribute("user", new AppUser());
        return "addUser"; // Return view name without .html
    }

    @PostMapping("/create")
    public String createUser(@ModelAttribute AppUser user, Model model) {
        userService.createUser(user);
        model.addAttribute("message", "User created successfully!");
        return "redirect:/";
    }

//    @GetMapping("/all")
//    public String showAllUsers(Model model) {
//        model.addAttribute("users", userService.getAllUsers());
//        return "usersList"; // Ensure you have an allUsers.html template
//    }
// Create a new user
@PostMapping("/create_user")
public ResponseEntity<AppUser> createUser(@RequestBody AppUser user) {
    AppUser createdUser = userService.createUser(user);
    return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
}
    @GetMapping("/all")
    public ResponseEntity<List<AppUser>> getAllUsers() {
        List<AppUser> users = userService.getAllUsers();
        return ResponseEntity.ok(users); // Returns JSON response
    }

    // REST API Endpoints
    @GetMapping("/api")
    public ResponseEntity<Iterable<AppUser>> getAllUsersApi() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @PostMapping("/api")
    public ResponseEntity<AppUser> createUserApi(@RequestBody AppUser user) {
        AppUser createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PutMapping("/api/{id}")
    public ResponseEntity<AppUser> updateUserApi(@PathVariable Long id, @RequestBody AppUser user) {
        AppUser updatedUser = userService.updateUser(id, user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @DeleteMapping("/api/{id}")
    public ResponseEntity<Void> deleteUserApi(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
