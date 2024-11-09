package com.revature.controllers;

import com.revature.models.DTOs.LoginDTO;
import com.revature.models.DTOs.UserDTO;
import com.revature.services.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private AuthService aService;

    @Autowired
    public AuthController(AuthService aService) {
        this.aService = aService;
    }

    //filled upon successful login
    public static HttpSession session;

    @PostMapping
    public ResponseEntity<UserDTO> login(@RequestBody LoginDTO lDTO, HttpSession session){
        //send loginDTO to Service
        UserDTO uDTO = aService.login(lDTO, session);
        //session is init and filled with user data in service layer

        //login was successful and session was created
        return ResponseEntity.ok(uDTO);
    }

    //Exception Handler (stole this from the UserController)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException e){
        //Return a 400 (BAD REQUEST) status code with the exception message
        return ResponseEntity.status(400).body(e.getMessage());
    }
}
