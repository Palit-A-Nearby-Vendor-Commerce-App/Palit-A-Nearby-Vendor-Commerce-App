package com.nearbyvendor.palit.entity;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "conversation")
public class ConversationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int conversationId;

//    private int vendorAccountId;

//    private int customerAccountId;
    @ManyToOne
    @JoinColumn(name = "vendorAccountId", referencedColumnName = "accountId")
    private AccountEntity vendor;

    @ManyToOne
    @JoinColumn(name = "customerAccountId", referencedColumnName = "accountId")
    private AccountEntity customer;

    @OneToMany(mappedBy = "conversation")
    private Set<ChatEntity> chat;    
    
    private boolean isDeleted;

//    @ManyToMany
//    @JoinTable(
//        name = "conversation_account", 
//        joinColumns = @JoinColumn(name = "conversationId"), 
//        inverseJoinColumns = @JoinColumn(name = "accountId")
//    )
//    private Set<AccountEntity> participants;
    

    public ConversationEntity() {
    }

//    public ConversationEntity(int conversationId, int vendorAccountId, int customerAccountId, boolean isDeleted,
//            Set<AccountEntity> participants, Set<ChatEntity> chat) {
//        this.conversationId = conversationId;
//        this.vendorAccountId = vendorAccountId;
//        this.customerAccountId = customerAccountId;
//        this.isDeleted = isDeleted;
//        this.participants = participants;
//        this.chat = chat;
//    }
    
    public ConversationEntity(int conversationId, AccountEntity vendor, AccountEntity customer, boolean isDeleted) {
        this.conversationId = conversationId;
        this.vendor = vendor;
        this.customer = customer;
        this.isDeleted = isDeleted;
    }


//    public int getConversationId() {
//        return conversationId;
//    }
//
//    public void setConversationId(int conversationId) {
//        this.conversationId = conversationId;
//    }
//
//    public int getVendorAccountId() {
//        return vendorAccountId;
//    }
//
//    public void setVendorAccountId(int vendorAccountId) {
//        this.vendorAccountId = vendorAccountId;
//    }
//
//    public int getCustomerAccountId() {
//        return customerAccountId;
//    }
//
//    public void setCustomerAccountId(int customerAccountId) {
//        this.customerAccountId = customerAccountId;
//    }
//
//    public boolean isDeleted() {
//        return isDeleted;
//    }
//
//    public void setDeleted(boolean isDeleted) {
//        this.isDeleted = isDeleted;
//    }
//
//    public Set<AccountEntity> getParticipants() {
//        return participants;
//    }
//
//    public void setParticipants(Set<AccountEntity> participants) {
//        this.participants = participants;
//    }
//
//    public Set<ChatEntity> getChat() {
//        return chat;
//    }
//
//    public void setChat(Set<ChatEntity> chat) {
//        this.chat = chat;
//    }
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
