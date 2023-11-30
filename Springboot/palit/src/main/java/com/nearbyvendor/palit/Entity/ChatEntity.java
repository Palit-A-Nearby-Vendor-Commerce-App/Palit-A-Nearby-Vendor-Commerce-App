package com.nearbyvendor.palit.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "chat")
public class ChatEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int chatId;

    private String messageContent;

    private Timestamp timestamp;

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "senderId", referencedColumnName = "accountId")
    private AccountEntity account;

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "conversationId", referencedColumnName = "conversationId")
    private ConversationEntity conversation;

    private boolean isDeleted;

    public ChatEntity() {
    }

    public ChatEntity(int chatId, AccountEntity account, String messageContent, Timestamp timestamp,
                      ConversationEntity conversation) {
        this.chatId = chatId;
        this.account = account;
        this.messageContent = messageContent;
        this.timestamp = timestamp;
        this.conversation = conversation;
        this.isDeleted = false;
    }

    public int getChatId() {
        return chatId;
    }

    public void setChatId(int chatId) {
        this.chatId = chatId;
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
