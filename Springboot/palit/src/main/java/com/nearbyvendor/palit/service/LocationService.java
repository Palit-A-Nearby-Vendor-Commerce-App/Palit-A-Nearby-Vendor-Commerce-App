package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.Location;
import com.nearbyvendor.palit.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    // Get all locations
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    // Get location by id
    public Location getLocationById(int id) {
        return locationRepository.getReferenceById(id);
    }

    // Create location
    public Location createLocation(Location location) {
        return locationRepository.save(location);
    }

    // Update location
    public Location updateLocation(int id, Location location) {
        Location existingLocation = locationRepository.getReferenceById(id);
        existingLocation.setLatitude(location.getLatitude());
        existingLocation.setLongitude(location.getLongitude());
        existingLocation.setAccountId(location.getAccountId());
        return locationRepository.save(existingLocation);
    }

    // Delete location
    public void deleteLocation(int id) {
        locationRepository.deleteById(id);
    }
}
