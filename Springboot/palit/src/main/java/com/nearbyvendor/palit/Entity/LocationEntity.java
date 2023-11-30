package com.nearbyvendor.palit.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

    @JsonIgnore
    @OneToOne(mappedBy = "location")
    private AccountEntity account;

    public LocationEntity() {
    }

    public LocationEntity(int locationId, double latitude, double longitude, boolean isActive, AccountEntity account) {
        this.locationId = locationId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.isActive = isActive;
        this.account = account;
        this.isDeleted = false;
    }

    public int getLocationId() {
        return locationId;
    }

    public void setLocationId(int locationId) {
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
