package com.mobilabsolutions.transaction.repository;

import com.mobilabsolutions.transaction.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, String> {

    List<Transaction> getAllByCreatedOnBetweenOrderByCreatedOn(Date from, Date to);
}
