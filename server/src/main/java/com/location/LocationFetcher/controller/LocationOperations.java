package com.location.LocationFetcher.controller;

import com.location.LocationFetcher.model.GpsData;
import com.location.LocationFetcher.model.UserData;
import com.location.LocationFetcher.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*")
public class LocationOperations {

    @Autowired
    UserRepository userRepository;

    @PostMapping(value = "/location")
    public String autoHaltsGeneration(@RequestBody UserData userData) throws Exception {
        System.out.println(userData);
        userRepository.save(userData);
        return "Success";
    }

}
