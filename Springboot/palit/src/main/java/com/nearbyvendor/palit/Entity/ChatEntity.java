package com.nearbyvendor.palit.entity;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "chatId")
@Entity
@Table(name = "chat")
public class ChatEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int chatId;

//    private int senderId;
    @ManyToOne
    @JoinColumn(name = "senderId", referencedColumnName = "accountId")
    private AccountEntity account;

    private String messageContent;

    private Timestamp timestamp;

//    private int conversationId;
    @ManyToOne
    @JoinColumn(name = "conversationId", referencedColumnName = "conversationId")
    private ConversationEntity conversation;

    private boolean isDeleted;





    public ChatEntity() {
    }

    public ChatEntity(int chatId, AccountEntity account, String messageContent, Timestamp timestamp, ConversationEntity conversation,
            boolean isDeleted) {
        this.chatId = chatId;
        this.account = account;
        this.messageContent = messageContent;
        this.timestamp = timestamp;
        this.conversation = conversation;
        this.isDeleted = isDeleted;
    }

    public int getChatId() {
        return chatId;
    }

    public void setChatId(int chatId) {
        this.chatId = chatId;
    }
//
//    public int getSenderId() {
//        return senderId;
//    }
//
//    public void setSenderId(int senderId) {
//        this.senderId = senderId;
//    }

    public String getMessageContent() {
        return messageContent;
    }

    public void setMessageContent(String messageContent) {
        this.messageContent = messageContent;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public ConversationEntity getConversation() {
        return conversation;
    }

    public void setConversation(ConversationEntity conversation) {
        this.conversation = conversation;
    }

    public AccountEntity getAccount() {
        return account;
    }

    public void setAccount(AccountEntity account) {
        this.account = account;
    }

}
