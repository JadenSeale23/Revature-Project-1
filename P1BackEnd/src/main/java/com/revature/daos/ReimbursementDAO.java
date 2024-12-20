package com.revature.daos;

import com.revature.models.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReimbursementDAO extends JpaRepository<Reimbursement, Integer> {

    //dig into the User object to find the userId
    List<Reimbursement> findByUserUserId(int userId);
    List<Reimbursement> findByStatus(String status);
    List<Reimbursement> findByStatusAndUserUserId(String status, int userId);
}
