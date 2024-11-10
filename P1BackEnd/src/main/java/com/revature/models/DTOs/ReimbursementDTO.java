package com.revature.models.DTOs;

//Remember what a DTO is? Data Transfer Object
//This Class will be used to model incoming Reimbursement JSON data
//We get to skip the petId, and we can just use an int for User instead of a whole User object
public class ReimbursementDTO {

    private String description;
    private double amount;
    private String status;
    private int userId;

    //boilerplate code--------------------------

    public ReimbursementDTO() {
    }

    public ReimbursementDTO(String description, double amount, String status, int userId) {
        this.description = description;
        this.amount = amount;
        this.status = status;
        this.userId = userId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAmount(){
        return amount;
    }

    public void setAmount(double amount){
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "ReimbursementDTO{" +
                "description='" + description + '\'' +
                ", amount=" + amount +
                ", status='" + status + '\'' +
                ", userId=" + userId +
                '}';
    }
}