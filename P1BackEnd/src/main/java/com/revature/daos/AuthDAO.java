package com.revature.daos;

import com.revature.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthDAO extends JpaRepository<User, Integer> {

    //verify a user's log in creds are correct
    //if not found then the username/password aren't valid
    User findByUsernameAndPassword(String username, String password);
}
