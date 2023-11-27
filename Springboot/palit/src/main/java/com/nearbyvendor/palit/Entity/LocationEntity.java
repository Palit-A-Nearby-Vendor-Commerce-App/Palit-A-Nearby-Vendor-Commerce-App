package com.nearbyvendor.palit.entity;

import javax.persistence.*;

@Entity
@Table(name = "location")
public class LocationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int locationId;

    private double latitude;

    private double longitude;

    private boolean isDeleted;

    private boolean isActive;

    public LocationEntity() {
    }

    public LocationEntity(int locationId, double latitude, double longitude, UserEntity user) {
        this.locationId = locationId;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public int getId() {
        return locationId;
    }

    public void setId(int locationId) {
        this.locationId = locationId;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public boolean getIsActive() {
        return this.isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }
}
