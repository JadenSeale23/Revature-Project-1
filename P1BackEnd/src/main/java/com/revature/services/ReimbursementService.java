package com.revature.services;

//Check UserService for general notes on Services

import com.revature.daos.ReimbursementDAO;
import com.revature.daos.UserDAO;
import com.revature.models.DTOs.ReimbursementDTO;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service //Makes a class a bean. Stereotype annotation.
public class ReimbursementService {

    //autowire the ReimbursementDAO with constructor injection so we can use the ReimbursementDAO and UserDAO methods
    private ReimbursementDAO rDAO;
    private UserDAO uDAO; //we also need some UserDAO methods!

    @Autowired
    public ReimbursementService(ReimbursementDAO rDAO, UserDAO uDAO) {
        this.rDAO = rDAO;
        this.uDAO = uDAO;
    }

    //This method takes in a new Reimbursement object and inserts it into the DB
    public Reimbursement addReimbursement(ReimbursementDTO rDTO){

        //Another important role of the Service layer: data processing -
        //Turn the ReimbursementDTO into a Reimbursement to send to the DAO (DAO takes Reimbursement objects, not PetDTOs)

        //petId will be generated (so 0 is just a placeholder)
        //species and name come from the DTO
        //user will be set with the userId in the DTO
        Reimbursement newReimbursement = new Reimbursement(0, rDTO.getDescription(), rDTO.getAmount(), rDTO.getStatus(), null);

        //Use the UserDAO to get a User by id
        Optional<User> u = uDAO.findById(rDTO.getUserId());

        /*findById returns an OPTIONAL... What does that mean?
         it will either hold the value requested, or it won't. This helps us avoid NullPointerExc.
         BECAUSE... we can't access the data if we don't use the .get() method
         Check out how it helps us write error handling functionality: */
        if(u.isEmpty()){
            throw new IllegalArgumentException("No user found with id: " + rDTO.getUserId());
        } else {
            //set the user object in the new Reimbursement
            newReimbursement.setUser(u.get()); //.get() is what extracts the value from the Optional

            //send the Reimbursement to the DAO
            return rDAO.save(newReimbursement);
        }

    }

    //This method gets all pets from the DB
    public List<Reimbursement> getAllReimbursements(){

        //not much error handling in a get all
        return rDAO.findAll();
    }


    public List<Reimbursement> getReimbursementsByUserId(int userId){
        return rDAO.findByUserUserId(userId);
    }


}