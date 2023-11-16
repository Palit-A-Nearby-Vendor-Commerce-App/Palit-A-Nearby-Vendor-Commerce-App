package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.Location;
import com.nearbyvendor.palit.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locations")
public class LocationController {

    @Autowired
    private LocationService locationService;

    // Get all locations
    @GetMapping
    public ResponseEntity<List<Location>> getAllLocations() {
        List<Location> locations = locationService.getAllLocations();
        return new ResponseEntity<>(locations, HttpStatus.OK);
    }

    // Get location by id
    @GetMapping("/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable("id") int id) {
        Location location = locationService.getLocationById(id);
        return new ResponseEntity<>(location, HttpStatus.OK);
    }

    // Create location
    @PostMapping
    public ResponseEntity<Location> createLocation(@RequestBody Location location) {
        Location newLocation = locationService.createLocation(location);
        return new ResponseEntity<>(newLocation, HttpStatus.CREATED);
    }

    // Update location
    @PutMapping("/{id}")
    public ResponseEntity<Location> updateLocation(@PathVariable("id") int id, @RequestBody Location location) {
        Location updatedLocation = locationService.updateLocation(id, location);
        return new ResponseEntity<>(updatedLocation, HttpStatus.OK);
    }

    // Delete location
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable("id") int id) {
        locationService.deleteLocation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
