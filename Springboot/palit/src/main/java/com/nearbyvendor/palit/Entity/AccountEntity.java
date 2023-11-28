package com.nearbyvendor.palit.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "account")
public class AccountEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer accountId;

	private String email;

	private String password;

	private boolean isVendor;

	private boolean isAdmin;

	private boolean isDeleted;

	@OneToOne(mappedBy = "account")
	private UserEntity user;

	@OneToOne
	@JoinColumn(name = "locationId", referencedColumnName = "locationId")
	private LocationEntity location;

	@OneToOne
	@JoinColumn(name = "storeId", referencedColumnName = "storeId")
	private StoreEntity store;

	@ManyToMany(mappedBy = "participants")
	private Set<ConversationEntity> conversation;
	// constructors
	public AccountEntity() {
		super();
	}

	public AccountEntity(int accountId, String email, String password, LocationEntity location, StoreEntity store,
			boolean isVendor, boolean isAdmin, boolean isDeleted, Set<ConversationEntity> conversation) {
		super();
		this.accountId = accountId;
		this.email = email;
		this.password = password;
		this.location = location;
		this.store = store;
		this.isVendor = isVendor;
		this.isAdmin = isAdmin;
		this.isDeleted = isDeleted;
		this.conversation = conversation;
	}

	// getters and setters

	public Integer getAccountId() {
		return accountId;
	}

	public void setAccountId(Integer accountId) {
		this.accountId = accountId;
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

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public LocationEntity getLocation() {
		return location;
	}

	public void setLocation(LocationEntity location) {
		this.location = location;
	}

	public StoreEntity getStore() {
		return store;
	}

	public void setStore(StoreEntity store) {
		this.store = store;
	}

	public boolean getIsVendor() {
		return isVendor;
	}

	public void setIsVendor(boolean isVendor) {
		this.isVendor = isVendor;
	}

	public boolean getIsAdmin() {
		return isAdmin;
	}

	public void setIsAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

	public boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public Set<ConversationEntity> getConversation() {
		return conversation;
	}
	
	public void setConversation(Set<ConversationEntity> conversation) {
		this.conversation = conversation;
	}

}
