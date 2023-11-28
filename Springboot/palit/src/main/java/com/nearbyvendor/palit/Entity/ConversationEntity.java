package com.nearbyvendor.palit.entity;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Set;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity
@Table(name = "conversation")
public class ConversationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int conversationId;

    private int vendorAccountId;

    private int customerAccountId;
    
    private boolean isDeleted;

    @ManyToMany
    @JoinTable(
        name = "conversation_account", 
        joinColumns = @JoinColumn(name = "conversationId"), 
        inverseJoinColumns = @JoinColumn(name = "accountId")
    )
    private Set<AccountEntity> participants;
    
    @OneToMany(mappedBy = "conversation")
    private Set<ChatEntity> chat;

    public ConversationEntity() {
    }

    public ConversationEntity(int conversationId, int vendorAccountId, int customerAccountId, boolean isDeleted,
            Set<AccountEntity> participants, Set<ChatEntity> chat) {
        this.conversationId = conversationId;
        this.vendorAccountId = vendorAccountId;
        this.customerAccountId = customerAccountId;
        this.isDeleted = isDeleted;
        this.participants = participants;
        this.chat = chat;
    }

    public int getConversationId() {
        return conversationId;
    }

    public void setConversationId(int conversationId) {
        this.conversationId = conversationId;
    }

    public int getVendorAccountId() {
        return vendorAccountId;
    }

    public void setVendorAccountId(int vendorAccountId) {
        this.vendorAccountId = vendorAccountId;
    }

    public int getCustomerAccountId() {
        return customerAccountId;
    }

    public void setCustomerAccountId(int customerAccountId) {
        this.customerAccountId = customerAccountId;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public Set<AccountEntity> getParticipants() {
        return participants;
    }

    public void setParticipants(Set<AccountEntity> participants) {
        this.participants = participants;
    }

    public Set<ChatEntity> getChat() {
        return chat;
    }

    public void setChat(Set<ChatEntity> chat) {
        this.chat = chat;
    }

    

}
