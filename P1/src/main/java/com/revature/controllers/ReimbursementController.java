package com.revature.controllers;

import com.revature.models.DTOs.ReimbursementDTO;
import com.revature.models.Reimbursement;
import com.revature.services.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController //Combines @Controller and @ResponseBody
@RequestMapping("/reimbursements") //any HTTP request with "/pets" will go here
public class ReimbursementController{

    private ReimbursementService rService;

    @Autowired //Autowire a ReimbursementService (with Constructor Injection) to use its methods
    public ReimbursementController(ReimbursementService rService) {
        this.rService = rService;
    }

    //This method inserts a new Reimbursement into the DB
    @PostMapping //POST requests to /reimbursements will come here
    public ResponseEntity<Reimbursement> insertReimbursement(@RequestBody ReimbursementDTO rDTO){

        //send the Reimbursement data to the service, and save the result in a Reimbursement object
        Reimbursement p = rService.addReimbursement(rDTO);

        //send the new Reimbursement data back to the client with 201 - CREATED
        return ResponseEntity.status(201).body(p);
    }

    //This method gets all Reimbursements from the DB
    @GetMapping //GET requests to /reimbursements will come here
    public ResponseEntity<List<Reimbursement>> getAllReimbursements(){

        //return all Reimbursements with status code 200: OK
        return ResponseEntity.ok(rService.getAllReimbursements());
    }

    //This method gets all Reimbursements by userId
    @GetMapping("/user/{userId}")//GET requests to /pets/user/{userId}
    public ResponseEntity<List<Reimbursement>> getReimbursementsByUserId(@PathVariable int userId){

        return ResponseEntity.ok(rService.getReimbursementsByUserId(userId));
    }

    //Exception Handler (stole this from the UserController)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException e){
        //Return a 400 (BAD REQUEST) status code with the exception message
        return ResponseEntity.status(400).body(e.getMessage());
    }

}