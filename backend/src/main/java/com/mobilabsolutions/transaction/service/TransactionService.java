package com.mobilabsolutions.transaction.service;

import com.mobilabsolutions.common.exception.InsufficientFundsException;
import com.mobilabsolutions.common.exception.ResourceNotFoundException;
import com.mobilabsolutions.transaction.model.Transaction;

import java.util.Date;
import java.util.List;

public interface TransactionService {

    Transaction createTransaction(Transaction transaction) throws ResourceNotFoundException, InsufficientFundsException;

    List<Transaction> getAllTransactionsBetween(Date from, Date to);
}
