package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.LocationEntity;
import com.nearbyvendor.palit.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LocationController {

    @Autowired
    private LocationService locationService;

    // Get all locations
    @GetMapping
    public List<LocationEntity> getAllLocations() {
        return locationService.getAllLocations();
    }

    // Get location by id
    @GetMapping("/getLocationById/{id}")
    public LocationEntity getLocationById(@PathVariable("id") int id) {
        return locationService.getLocationById(id);
    }

    // Create location
    @PostMapping
    public LocationEntity createLocation(@RequestBody LocationEntity location) {
        return locationService.createLocation(location);
    }

    // Update location
    @PutMapping("/updateLocationById/{id}")
    public LocationEntity updateLocationById(@PathVariable("id") int id, @RequestBody LocationEntity location) {
        return locationService.updateLocationById(id, location);
    }

    // Delete location
    @DeleteMapping("/deleteLocationById/{id}")
    public void deleteLocationById(@PathVariable("id") int id) {
        locationService.deleteLocationById(id);
    }
}
