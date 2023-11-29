package com.nearbyvendor.palit.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import java.sql.Timestamp;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "reportId")
@Entity
@Table(name = "report")
public class ReportEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reportId;

//    @Column(nullable = false)
//    private int senderId; //remove sa daw ni
    
    @ManyToOne
    @JoinColumn(name = "senderId")
    private AccountEntity account;

    @Column(nullable = false)
    private String messageContent;

    @Column(nullable = false)
    private Timestamp timestamp;

    @Column(nullable = false)
    private boolean isResolved;
    
    private boolean isDeleted;
    

    public ReportEntity() {
    }

    public ReportEntity(AccountEntity account, String messageContent, Timestamp timestamp, boolean isResolved) {
        this.account = account;
        this.messageContent = messageContent;
        this.timestamp = timestamp;
        this.isResolved = isResolved;
    }

    public int getId() {
        return reportId;
    }

    public void setId(int reportId) {
        this.reportId = reportId;
    }

    public AccountEntity getSenderId() {
        return account;
    }

    public void setSenderId(AccountEntity account) {
        this.account = account;
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

    public boolean getIsResolved() {
        return isResolved;
    }

    public void setIsResolved(boolean isResolved) {
        this.isResolved = isResolved;
    }

    public boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
}
