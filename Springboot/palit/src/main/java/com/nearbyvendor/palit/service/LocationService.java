package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.LocationEntity;
import com.nearbyvendor.palit.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    public List<LocationEntity> getAllLocations() {
        return locationRepository.findByIsDeletedFalse();
    }

    public LocationEntity getLocationById(int id) {
        LocationEntity location = locationRepository.findByLocationIdAndIsDeletedFalse(id);
        if (location != null) {
            return location;
        } else {

            System.err.println("LocationEntity not found with id: " + id);
            throw new RuntimeException("LocationEntity not found with id: " + id);
        }
    }

    public LocationEntity createLocation(LocationEntity location) {
        return locationRepository.save(location);
    }

    public LocationEntity updateLocationById(int id, LocationEntity location) {
        LocationEntity existingLocation = locationRepository.findByLocationIdAndIsDeletedFalse(id);
        if (existingLocation != null) {
            existingLocation.setIsActive(location.getIsActive());
            existingLocation.setLatitude(location.getLatitude());
            existingLocation.setLongitude(location.getLongitude());
            return locationRepository.save(existingLocation);
        } else {

            System.err.println("LocationEntity not found with id: " + id);
            throw new RuntimeException("LocationEntity not found with id: " + id);
        }
    }

    public boolean deleteLocationById(int id) {
        LocationEntity location = locationRepository.findByLocationIdAndIsDeletedFalse(id);
        if (location != null) {
            location.setIsDeleted(true);
            locationRepository.save(location);
            return true;
        } else {

            System.err.println("LocationEntity not found with id: " + id);
            throw new RuntimeException("LocationEntity not found with id: " + id);
        }
    }
}
