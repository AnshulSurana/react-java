package com.mobilabsolutions.transaction.service;

import com.mobilabsolutions.currency.api.CurrencyConverter;
import com.mobilabsolutions.common.exception.InsufficientFundsException;
import com.mobilabsolutions.common.exception.ResourceNotFoundException;
import com.mobilabsolutions.account.model.Account;
import com.mobilabsolutions.transaction.model.Transaction;
import com.mobilabsolutions.account.repository.AccountRepository;
import com.mobilabsolutions.transaction.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.math.BigDecimal;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CurrencyConverter currencyConverter;

    @Override
    public Transaction createTransaction(Transaction transaction) throws ResourceNotFoundException, InsufficientFundsException {
        transaction.setCreatedOn(new Date());
        Account source = accountRepository.findById(transaction.getSource().getId()).orElseThrow(() -> new ResourceNotFoundException("Account not available."));
        Account destination = accountRepository.findById(transaction.getDestination().getId()).orElseThrow(() -> new ResourceNotFoundException("Account not available."));

        if (source.getCurrency() == destination.getCurrency()) {
            source.withdraw(transaction.getAmount());
            destination.deposit(transaction.getAmount());
        }

        else {
            BigDecimal convertedAmount = currencyConverter.convert(transaction.getAmount(), source.getCurrency(), destination.getCurrency());
            source.withdraw(transaction.getAmount());
            destination.deposit(convertedAmount);
        }

        accountRepository.save(source);
        accountRepository.save(destination);
        return transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> getAllTransactionsBetween(Date from, Date to) {
        return transactionRepository.getAllByCreatedOnBetweenOrderByCreatedOn(from, to);
    }
}
