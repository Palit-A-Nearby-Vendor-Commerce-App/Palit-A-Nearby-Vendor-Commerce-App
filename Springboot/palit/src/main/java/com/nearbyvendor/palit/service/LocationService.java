package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.LocationEntity;
import com.nearbyvendor.palit.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    // Get all locations where isDeleted is false
    public List<LocationEntity> getAllLocations() {
        return locationRepository.findByIsDeletedFalse();
    }

    // Get location by id where isDeleted is false
    public LocationEntity getLocationById(int id) {
        LocationEntity location = locationRepository.findByLocationIdAndIsDeletedFalse(id);
        if (location != null) {
            return location;
        } else {
            // Log an error message for debugging
            System.err.println("LocationEntity not found with id: " + id);
            throw new RuntimeException("LocationEntity not found with id: " + id);
        }
    }

    // Create location
    public LocationEntity createLocation(LocationEntity location) {
        return locationRepository.save(location);
    }

    // Update location by id where isDeleted is false
    public LocationEntity updateLocationById(int id, LocationEntity location) {
        LocationEntity existingLocation = locationRepository.findByLocationIdAndIsDeletedFalse(id);
        if (existingLocation != null) {
            existingLocation.setLatitude(location.getLatitude());
            existingLocation.setLongitude(location.getLongitude());
            existingLocation.setUser(location.getUser());
            return locationRepository.save(existingLocation);
        } else {
            // Log an error message for debugging
            System.err.println("LocationEntity not found with id: " + id);
            throw new RuntimeException("LocationEntity not found with id: " + id);
        }
    }

    // Delete location by id
    public boolean deleteLocationById(int id) {
        LocationEntity location = locationRepository.findByLocationIdAndIsDeletedFalse(id);
        if (location != null) {
            location.setIsDeleted(true);
            locationRepository.save(location);
            return true; // Deletion was successful
        } else {
            // Log an error message for debugging
            System.err.println("LocationEntity not found with id: " + id);
            throw new RuntimeException("LocationEntity not found with id: " + id);
        }
    }
}
