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

    // Get all locations
    public List<LocationEntity> getAllLocations() {
        return locationRepository.findAll();
    }

    // Get location by id
    public LocationEntity getLocationById(int id) {
        return locationRepository.getReferenceById(id);
    }

    // Create location
    public LocationEntity createLocation(LocationEntity location) {
        return locationRepository.save(location);
    }

    // Update location
    public LocationEntity updateLocationById(int id, LocationEntity location) {
        LocationEntity existingLocation = locationRepository.getReferenceById(id);
        existingLocation.setLatitude(location.getLatitude());
        existingLocation.setLongitude(location.getLongitude());
        existingLocation.setAccountId(location.getAccountId());
        return locationRepository.save(existingLocation);
    }

    // Delete location
    public void deleteLocationById(int id) {
        locationRepository.deleteById(id);
    }
}
