package com.revature.controllers;

import com.revature.models.User;
import com.revature.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin //allows cross-origin resource sharing from any source (CORS)
public class UserController {

    private UserService uService;

    @Autowired
    public UserController(UserService uService){
        this.uService = uService;
    }

    @PostMapping
    public ResponseEntity<User> registerUser(@RequestBody User newUser){

        //Send newUser to Service to be inserted and saved then returned a user
        User u = uService.register(newUser);

        return ResponseEntity.ok(u);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.ok(uService.getAllUsers());
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username){

        //if no user is found, we can send a message saying no user found
        if(uService.getUserByUsername(username) == null){
            return ResponseEntity.status(404).body("No user found with username: " + username);
        }

        //Return the found User with a 200 status code
        return ResponseEntity.ok(uService.getUserByUsername(username));

    }

    @PatchMapping("/{userId}")
    public ResponseEntity<?> updateUserRole(@PathVariable int userId, @RequestBody String newRole){
        //Send back Accepted with user returned from the service as the response body
        return ResponseEntity.status(202).body(uService.updateRole(userId, newRole));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<User> deleteUser(@PathVariable int userId){
        return ResponseEntity.ok(uService.deleteUser(userId));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArg(IllegalArgumentException e){
        return ResponseEntity.status(400).body(e.getMessage());
    }

}
