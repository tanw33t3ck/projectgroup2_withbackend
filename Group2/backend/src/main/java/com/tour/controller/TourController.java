package com.tour.controller;

import com.tour.exception.ResourceNotFoundException;
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

    @PostMapping(path = "/add")
    public ResponseEntity<Object> addNewTour(@RequestBody Tour newTour) {
        try {
            tourRepository.save(newTour);
            return new ResponseEntity<>("Tour created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error creating tour: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path="/all")
    public ResponseEntity<Object> getAllTours() {
        List<Tour> tours = (List<Tour>) tourRepository.findAll();

        if(tours.isEmpty()){
            return new ResponseEntity<>("No tours found", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(tours, HttpStatus.OK);
        }
    }

    @GetMapping(path="/{id}")
    public ResponseEntity<Object> getSingleTour(@PathVariable("id") Integer id) {
        Optional<Tour> tour = tourRepository.findById(id);

        if (tour.isPresent()) {
            return new ResponseEntity<>(tour.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No tour found", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable("id") Integer id, @RequestBody Tour updatedTour) {
        try {
            Tour existingTour = tourRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException(id));

            existingTour.setImage(updatedTour.getImage());
            existingTour.setTitle(updatedTour.getTitle());
            existingTour.setDescription(updatedTour.getDescription());
            existingTour.setPrice(updatedTour.getPrice());
            existingTour.setCategory(updatedTour.getCategory());

            tourRepository.save(existingTour);
            return new ResponseEntity<>("Tour updated successfully", HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error updating tour: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteTour(@PathVariable("id") Integer id) {
        try {
            tourRepository.deleteById(id);
            return new ResponseEntity<>("Tour deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting tour: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
