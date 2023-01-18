package com.mobilabsolutions.transaction.model;

import com.mobilabsolutions.account.model.Account;
import javax.persistence.*;
import java.util.Date;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
public class Transaction {

    @Id
    private String id;

    @ManyToOne
    @JoinColumn(name = "source_id", nullable = false)
    private Account source;

    @ManyToOne
    @JoinColumn(name = "destination_id", nullable = false)
    private Account destination;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(name = "created_on", nullable = false)
    @Temporal(value = TemporalType.TIMESTAMP)
    private Date createdOn;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = UUID.randomUUID().toString();
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

    public Date getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "id=" + id +
                ", source=" + source +
                ", destination=" + destination +
                ", amount=" + amount +
                ", createdOn=" + createdOn +
                '}';
    }
}
