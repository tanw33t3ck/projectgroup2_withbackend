package com.tour.controller;

import com.tour.model.AdminUser;
import com.tour.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://127.0.0.1:3000/")
@Controller
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody AdminUser newUser) {
        try {
            if (newUser.getPassword() == null) {
                return new ResponseEntity<>("Password cannot be null", HttpStatus.BAD_REQUEST);
            }
            userRepository.save(newUser);
            return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error registering user: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<Object> getAllUsers() {
        List<AdminUser> users = (List<AdminUser>) userRepository.findAll();

        if (users.isEmpty()) {
            return new ResponseEntity<>("No users found", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(users, HttpStatus.OK);
        }
    }
}