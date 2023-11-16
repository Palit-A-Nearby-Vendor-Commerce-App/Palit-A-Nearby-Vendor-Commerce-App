package com.nearbyvendor.palit.entity;

import java.io.Serializable;
import java.util.Objects;

public class TransactionId implements Serializable {

    private int accountCustomerId;
    private int accountVendorId;

    public TransactionId() {
    }

    public TransactionId(int accountCustomerId, int accountVendorId) {
        this.accountCustomerId = accountCustomerId;
        this.accountVendorId = accountVendorId;
    }

    public int getAccountCustomerId() {
        return accountCustomerId;
    }

    public void setAccountCustomerId(int accountCustomerId) {
        this.accountCustomerId = accountCustomerId;
    }

    public int getAccountVendorId() {
        return accountVendorId;
    }

    public void setAccountVendorId(int accountVendorId) {
        this.accountVendorId = accountVendorId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TransactionId)) return false;
        TransactionId that = (TransactionId) o;
        return accountCustomerId == that.accountCustomerId && accountVendorId == that.accountVendorId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(accountCustomerId, accountVendorId);
    }
}
