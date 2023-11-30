package com.nearbyvendor.palit.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "conversation")
public class ConversationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int conversationId;

    @ManyToOne
    @JoinColumn(name = "vendorAccountId", referencedColumnName = "accountId")
    private AccountEntity vendor;

    @ManyToOne
    @JoinColumn(name = "customerAccountId", referencedColumnName = "accountId")
    private AccountEntity customer;

    @JsonIgnore
    @OneToMany(mappedBy = "conversation")
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
