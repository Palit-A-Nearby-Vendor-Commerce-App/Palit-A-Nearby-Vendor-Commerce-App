package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.LocationEntity;
import com.nearbyvendor.palit.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LocationController {

    @Autowired
    private LocationService locationService;

    // Get all locations
    @GetMapping("/getAllLocations")
    public ResponseEntity<List<LocationEntity>> getAllLocations() {
        List<LocationEntity> locations = locationService.getAllLocations();
        return new ResponseEntity<>(locations, HttpStatus.OK);
    }

    // Get location by id
    @GetMapping("/getLocationById/{id}")
    public ResponseEntity<LocationEntity> getLocationById(@PathVariable("id") int id) {
        LocationEntity location = locationService.getLocationById(id);
        if (location != null) {
            return new ResponseEntity<>(location, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Create location
    @PostMapping("/createLocation")
    public ResponseEntity<LocationEntity> createLocation(@RequestBody LocationEntity location) {
        LocationEntity newLocation = locationService.createLocation(location);
        return new ResponseEntity<>(newLocation, HttpStatus.CREATED);
    }

    // Update location
    @PutMapping("/updateLocationById/{id}")
    public ResponseEntity<LocationEntity> updateLocationById(@PathVariable("id") int id, @RequestBody LocationEntity location) {
        LocationEntity updatedLocation = locationService.updateLocationById(id, location);
        if (updatedLocation != null) {
            return new ResponseEntity<>(updatedLocation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete location
    @DeleteMapping("/deleteLocationById/{id}")
    public ResponseEntity<Void> deleteLocationById(@PathVariable("id") int id) {
        boolean deleted = locationService.deleteLocationById(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
