package com.mobilabsolutions.account.service;

import com.mobilabsolutions.common.exception.ResourceNotFoundException;
import com.mobilabsolutions.account.model.Account;

import java.util.List;

public interface AccountService {

    Account createAccount(Account account);

    Account updateAccount(String id, Account account) throws ResourceNotFoundException;

    Account getAccount(String id) throws ResourceNotFoundException;

    List<Account> getAllAccounts(int page, int size);
}
