//package com.revature.aspects;
//
//import com.revature.controllers.AuthController;
//import org.aspectj.lang.annotation.Aspect;
//import org.aspectj.lang.annotation.Before;
//import org.springframework.stereotype.Component;
//
//@Component
//@Aspect //makes a class an aspect - a class that can trigger functionality at any point in our code
//public class AuthAspect {
//
//    //an advice is the functionality that an aspect can trigger
//
//    //advice that checks if the user is logged in before they can call UserController methods except for registerUser method
//    @Before("execution(* com.revature.controllers.UserController.*(..)) " +
//            "&& !execution(* com.revature.controllers.UserController.registerUser(..))")
//    public void checkLogin() throws IllegalArgumentException{
//        if(AuthController.session == null){
//            throw new IllegalArgumentException("You must be logged in to do this!");
//        }
//    }
//}
