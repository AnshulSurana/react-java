package com.mobilabsolutions.account.model;

import com.mobilabsolutions.currency.enums.Currency;
import com.mobilabsolutions.common.exception.InsufficientFundsException;

import javax.persistence.*;
import java.util.Date;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
public class Account {

    @Id
    private String id;

    @Column(nullable = false)
    private String owner;

    @Column(nullable = false)
    private BigDecimal balance;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private Currency currency;

    @Column(name = "created_on", nullable = false)
    @Temporal(value = TemporalType.TIMESTAMP)
    private Date createdOn;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        if(id==null){
            this.id = UUID.randomUUID().toString();
        }else{
            this.id=id;
        }
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public Date getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }

    public void deposit(BigDecimal amount) {
        this.balance=this.balance.add(amount);
    }

    public void withdraw(BigDecimal amount) throws InsufficientFundsException {

        if (balance.subtract(amount).compareTo(BigDecimal.ZERO)<0)
            throw new InsufficientFundsException("Sufficient funds required to perform this operation.");

        this.balance=this.balance.subtract(amount);
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", owner='" + owner + '\'' +
                ", balance=" + balance +
                ", currency=" + currency +
                ", createdOn=" + createdOn +
                '}';
    }
}
