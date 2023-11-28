package com.nearbyvendor.palit.entity;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "chat")
public class ChatEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int chatId;

    private int senderId;

    private String messageContent;

    private Timestamp timestamp;

    private int conversationId;

    private boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "conversationId", referencedColumnName = "conversationId")
    private ConversationEntity conversation;

    @ManyToOne
    @JoinColumn(name = "senderId", referencedColumnName = "accountId")
    private AccountEntity account;

    public ChatEntity() {
    }

    public ChatEntity(int chatId, int senderId, String messageContent, Timestamp timestamp, int conversationId,
            boolean isDeleted, ConversationEntity conversation, AccountEntity account) {
        this.chatId = chatId;
        this.senderId = senderId;
        this.messageContent = messageContent;
        this.timestamp = timestamp;
        this.conversationId = conversationId;
        this.isDeleted = isDeleted;
        this.conversation = conversation;
        this.account = account;
    }

    public int getChatId() {
        return chatId;
    }

    public void setChatId(int chatId) {
        this.chatId = chatId;
    }

    public int getSenderId() {
        return senderId;
    }

    public void setSenderId(int senderId) {
        this.senderId = senderId;
    }

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

    public int getConversationId() {
        return conversationId;
    }

    public void setConversationId(int conversationId) {
        this.conversationId = conversationId;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean isDeleted) {
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
