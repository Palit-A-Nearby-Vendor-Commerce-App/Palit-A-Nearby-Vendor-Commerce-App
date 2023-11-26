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
    
    @OneToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private UserEntity user;

    private boolean isDeleted;

    public LocationEntity() {
    }

    public LocationEntity(int locationId, double latitude, double longitude, UserEntity user) {
        this.locationId = locationId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.user = user;
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

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
}
