package com.revature.services;

import com.revature.daos.UserDAO;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private UserDAO uDAO;

    @Autowired
    public UserService(UserDAO uDAO){
        this.uDAO = uDAO;
    }

    public User register(User newUser){
        if(newUser.getUsername() == null || newUser.getUsername().isBlank()){
            throw new IllegalArgumentException("Username cannot be empty!");
        }
        return uDAO.save(newUser);
    }

    public List<User> getAllUsers(){
        return uDAO.findAll();
    }

    public User getUserByUsername(String username){

        if(username == null || username.isBlank()){
            throw new IllegalArgumentException("Please search for a new username!");
        }
        return uDAO.findByUsername(username);
    }

    public User updateRole(int userId, String newRole){

        //TODO: error handling - make sure role is valid, something else its too early to think
        //Get User by Id to see if it exists otherwise throw an IllegalArgumentException
        User u = uDAO.findById(userId).orElseThrow(() -> new IllegalArgumentException("No user found with id: " + userId));

        //set the new role
        u.setRole(newRole);

        //Save the new User with the updated role and return it
        return uDAO.save(u);
    }

    //This method will delete a User from the DB
    public User deleteUser(int userId){

        User u = uDAO.findById(userId).orElseThrow(() -> new IllegalArgumentException("No user found with id: " + userId));

        uDAO.deleteById(userId);

        return u;
    }


}
