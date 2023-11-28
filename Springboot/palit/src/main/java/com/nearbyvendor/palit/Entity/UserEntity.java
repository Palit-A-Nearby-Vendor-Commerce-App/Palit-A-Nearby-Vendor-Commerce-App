package com.nearbyvendor.palit.entity;

import javax.persistence.*;

import java.util.Date;

@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    private String firstName;
    
    private String lastName;

    @Temporal(TemporalType.DATE)
    private Date birthDate;


    private boolean isDeleted;

    @Lob
    private byte[] image;
    
    @OneToOne
    @JoinColumn(name = "accountId", referencedColumnName = "accountId")
    private AccountEntity account;

//    @OneToOne
//    @JoinColumn(name = "locationId", referencedColumnName = "locationId")
//    private LocationEntity location;
//
//    @OneToOne
//    @JoinColumn(name = "storeId", referencedColumnName = "storeId")
//    private StoreEntity store;

    // constructors
    public UserEntity() {
        super();
    }

    // constructor with all fields
    public UserEntity(int userId, String firstName, String lastName, Date birthDate, boolean isDeleted, byte[] image, AccountEntity account) {
        super();
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.isDeleted = isDeleted;
        this.image = image;
        this.account = account;
    }

    public UserEntity(int userId, String firstName, String lastName, Date birthDate, byte[] image, AccountEntity account) {
        super();
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
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

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
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

    public AccountEntity getAccount() {
        return this.account;
    }
    
    public void setAccount(AccountEntity account) {
        this.account = account;
    }
    
   
}
