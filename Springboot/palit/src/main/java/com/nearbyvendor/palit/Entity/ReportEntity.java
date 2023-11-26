package com.nearbyvendor.palit.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "report")
public class ReportEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reportId;

    @Column(nullable = false)
    private int senderId;

    @Column(nullable = false)
    private String messageContent;

    @Column(nullable = false)
    private Timestamp timestamp;

    @Column(nullable = false)
    private boolean isResolved;
    
    private boolean isDeleted;

    public ReportEntity() {
    }

    public ReportEntity(int senderId, String messageContent, Timestamp timestamp, boolean isResolved) {
        this.senderId = senderId;
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
