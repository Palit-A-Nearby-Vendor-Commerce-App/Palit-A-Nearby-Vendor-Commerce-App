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
        return locationRepository.findByLocationIdAndIsDeletedFalse(id);
    }

    // Create location
    public LocationEntity createLocation(LocationEntity location) {
        return locationRepository.save(location);
    }

    // Update location by id where isDeleted is false
    public LocationEntity updateLocationById(int id, LocationEntity location) {
        LocationEntity existingLocation = locationRepository.findByLocationIdAndIsDeletedFalse(id);
        existingLocation.setLatitude(location.getLatitude());
        existingLocation.setLongitude(location.getLongitude());
        existingLocation.setAccountId(location.getAccountId());
        return locationRepository.save(existingLocation);
    }

    // Delete location by id
    public void deleteLocationById(int id) {
        LocationEntity location = locationRepository.findByLocationIdAndIsDeletedFalse(id);
        location.setIsDeleted(true);
        locationRepository.save(location);
    }
}
