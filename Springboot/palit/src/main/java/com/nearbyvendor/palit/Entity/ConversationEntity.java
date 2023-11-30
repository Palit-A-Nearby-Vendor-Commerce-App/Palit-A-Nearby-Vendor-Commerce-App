package com.nearbyvendor.palit.entity;

//import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.Set;

// @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "conversationId")
@Entity
@Table(name = "conversation")
public class ConversationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int conversationId;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "vendorAccountId", referencedColumnName = "accountId")
    private AccountEntity vendor;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "customerAccountId", referencedColumnName = "accountId")
    private AccountEntity customer;

    @JsonIgnore
    @OneToMany(mappedBy = "conversation")//, cascade = CascadeType.REMOVE)
    private Set<ChatEntity> chat;


    private boolean isDeleted;

    public ConversationEntity() {
    }

    public ConversationEntity(int conversationId, AccountEntity vendor, AccountEntity customer) {
        this.conversationId = conversationId;
        this.vendor = vendor;
        this.customer = customer;
        this.isDeleted = false;
    }

    public int getConversationId() {
        return conversationId;
    }

    public void setConversationId(int conversationId) {
        this.conversationId = conversationId;
    }

    public AccountEntity getVendor() {
        return vendor;
    }

    public void setVendor(AccountEntity vendor) {
        this.vendor = vendor;
    }

    public AccountEntity getCustomer() {
        return customer;
    }

    public void setCustomer(AccountEntity customer) {
        this.customer = customer;
    }

    public Set<ChatEntity> getChats() {
        return chat;
    }

    public void setChats(Set<ChatEntity> chats) {
        this.chat = chats;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(boolean deleted) {
        isDeleted = deleted;
    }

}
