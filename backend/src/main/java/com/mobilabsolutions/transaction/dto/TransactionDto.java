package com.mobilabsolutions.transaction.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mobilabsolutions.account.model.Account;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.math.BigDecimal;

public class TransactionDto {

    private String id;

    @NotNull(message = "Empty Source is not allowed.")
    private Account source;

    @NotNull(message = "Empty Destination is not allowed.")
    private Account destination;

    @NotNull(message = "Empty Amount is not allowed.")
    private BigDecimal amount;

    private Date createdOn;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Account getSource() {
        return source;
    }

    public void setSource(Account source) {
        this.source = source;
    }

    public Account getDestination() {
        return destination;
    }

    public void setDestination(Account destination) {
        this.destination = destination;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    @JsonProperty("createdOn")
    public Date getCreatedOn() {
        return createdOn;
    }

    @JsonIgnore
    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }
}
