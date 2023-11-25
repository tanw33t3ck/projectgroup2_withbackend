package com.tour.controller;

import com.tour.model.Tour;
import com.tour.repository.TourRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import java.util.Optional;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
@WebMvcTest(TourController.class)
class TourControllerTest {

    @InjectMocks
    private TourController tourController;

    @MockBean
    private TourRepository tourRepository;

    @Autowired
    private MockMvc mockMvc;

    @Test
    void addNewTour() throws Exception {
        // Create a new tour JSON payload
        String newTourJson = "{ \"title\": \"New Tour\", \"description\": \"Description\", \"price\": 100.0, \"category\": \"Asia\" }";

        // Mock behavior of the tourRepository when saving a new tour
        Mockito.when(tourRepository.save(Mockito.any(Tour.class))).thenReturn(new Tour());

        // Perform a POST request to add a new tour
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newTourJson))
                .andExpect(MockMvcResultMatchers.status().isCreated());

        // Verify that the tourRepository's save method was called
        Mockito.verify(tourRepository, Mockito.times(1)).save(Mockito.any(Tour.class));
    }

    @Test
    void getAllTours() throws Exception {
        // Mock behavior of the tourRepository when retrieving all tours
        Mockito.when(tourRepository.findAll()).thenReturn(new ArrayList<>());

        // Perform a GET request to retrieve all tours
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/all"))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());

        // Verify that the tourRepository's findAll method was called
        Mockito.verify(tourRepository, Mockito.times(1)).findAll();
    }

    @Test
    void getSingleTour() throws Exception {
        // Mock behavior of the tourRepository when retrieving a single tour
        Mockito.when(tourRepository.findById(Mockito.anyInt())).thenReturn(Optional.empty());

        // Perform a GET request to retrieve a single tour
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/1"))
                .andExpect(MockMvcResultMatchers.status().isNotFound());

        // Verify that the tourRepository's findById method was called
        Mockito.verify(tourRepository, Mockito.times(1)).findById(Mockito.anyInt());
    }

    @Test
    void updateTour() throws Exception {
        // Create an updated tour JSON payload
        String updatedTourJson = "{ \"title\": \"Updated Tour\", \"description\": \"Updated Description\", \"price\": 150.0, \"category\": \"Asia\" }";

        // Mock behavior of the tourRepository when updating a tour
        Mockito.when(tourRepository.findById(Mockito.anyInt())).thenReturn(Optional.of(new Tour()));
        Mockito.when(tourRepository.save(Mockito.any(Tour.class))).thenReturn(new Tour());

        // Perform a PUT request to update a tour
        mockMvc.perform(MockMvcRequestBuilders
                        .put("/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedTourJson))
                .andExpect(MockMvcResultMatchers.status().isOk());

        // Verify that the tourRepository's findById and save methods were called
        Mockito.verify(tourRepository, Mockito.times(1)).findById(Mockito.anyInt());
        Mockito.verify(tourRepository, Mockito.times(1)).save(Mockito.any(Tour.class));
    }

    @Test
    void deleteTour() throws Exception {
        // Mock behavior of the tourRepository when deleting a tour
        Mockito.doNothing().when(tourRepository).deleteById(Mockito.anyInt());

        // Perform a DELETE request to delete a tour
        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/1"))
                .andExpect(MockMvcResultMatchers.status().isOk());

        // Verify that the tourRepository's deleteById method was called
        Mockito.verify(tourRepository, Mockito.times(1)).deleteById(Mockito.anyInt());
    }
}