package com.tour.controller;

import com.tour.model.Tour;
import com.tour.repository.TourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://127.0.0.1:3000/")
@Controller
@RequestMapping(path="/")
public class TourController {
    @Autowired
    private TourRepository tourRepository;

    //Map POST request
    @PostMapping(path = "/add")
    public ResponseEntity<Object> addNewTour(@RequestBody Tour newTour) {
        try {
            tourRepository.save(newTour);
            return new ResponseEntity<>("Tour created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error creating tour: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //Get all users
    @GetMapping(path="/all")
    public ResponseEntity<Object> getAllTours() {
        List<Tour> users = new ArrayList<>();
        users = (List<Tour>) tourRepository.findAll();

        if(users.isEmpty()){
            return new ResponseEntity<>("No users found",HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(users,HttpStatus.OK);
        }
    }
    //Get Single User
    @GetMapping(path="/{id}")
    public ResponseEntity<Object> getSingleUser(@PathVariable("id") Integer id){
        Optional<Tour> tour = tourRepository.findById(id);
        if(tour.isPresent()) {
            return new ResponseEntity<>(tourRepository.findById(id), HttpStatus.OK);
        }
        return new ResponseEntity<>("No user found", HttpStatus.BAD_REQUEST);
    }
    //Update User
    @PutMapping("/{id}")
    public ResponseEntity<Object>  updateUser(@PathVariable("id") Integer id, @RequestBody Tour updatedTour) {
        try{
            Tour existingTour = tourRepository.findById(id).orElse(null);
            existingTour.setImage(updatedTour.getImage());
            existingTour.setTitle(updatedTour.getTitle());
            existingTour.setDescription(updatedTour.getDescription());
            existingTour.setPrice(updatedTour.getPrice());
            existingTour.setCategory(updatedTour.getCategory());
            tourRepository.save(existingTour);
            return new ResponseEntity<>("User updated successfully", HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("User is not found", HttpStatus.BAD_REQUEST);
        }
    }
    //Delete User
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Integer id) {
        try {
            tourRepository.deleteById(id);
            return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        }
    }
}
