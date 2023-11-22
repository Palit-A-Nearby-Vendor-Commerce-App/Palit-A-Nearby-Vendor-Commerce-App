package com.nearbyvendor.palit.entity;

import javax.persistence.*;

import java.util.Date;

@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userId")
    private int userId;

    private String name;

    @Temporal(TemporalType.DATE)
    private Date birthDate;

    private String email;

    private String password;

    private boolean isDeleted;

    @Lob
    @Column(name = "image")
    private byte[] image;

    public UserEntity() {
        super();
        this.isDeleted = false;
    }

    public UserEntity(int userId, String name, Date birthDate, String email, String password,
            byte[] image) {
        super();
        this.userId = userId;
        this.name = name;
        this.birthDate = birthDate;
        this.email = email;
        this.password = password;
        this.isDeleted = false;
        this.image = image;
    }

    // getters and setters
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
}
