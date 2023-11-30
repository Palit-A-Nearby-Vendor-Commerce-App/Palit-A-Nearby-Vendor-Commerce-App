package com.nearbyvendor.palit.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "report")
public class ReportEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reportId;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "senderId")
    private AccountEntity account;

    private String messageContent;

    private Timestamp timestamp;

    private boolean isResolved;

    private boolean isDeleted;

    public ReportEntity() {
    }

    public ReportEntity(AccountEntity account, String messageContent, Timestamp timestamp, boolean isResolved) {
        this.account = account;
        this.messageContent = messageContent;
        this.timestamp = timestamp;
        this.isResolved = isResolved;
        this.isDeleted = false;
    }

    public int getReportId() {
        return reportId;
    }

    public void setReportId(int reportId) {
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
