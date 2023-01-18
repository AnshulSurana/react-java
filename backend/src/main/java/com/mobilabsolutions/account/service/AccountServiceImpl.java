package com.mobilabsolutions.account.service;

import com.mobilabsolutions.common.exception.ResourceNotFoundException;
import com.mobilabsolutions.account.model.Account;
import com.mobilabsolutions.account.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Account createAccount(Account account) {
        account.setCreatedOn(new Date());
        return accountRepository.save(account);
    }

    @Override
    public Account updateAccount(String id, Account acc) throws ResourceNotFoundException {
        Account currentAcc = getAccount(id);
        acc.setId(currentAcc.getId());
        acc.setCreatedOn(currentAcc.getCreatedOn());
        return accountRepository.save(acc);
    }

    @Override
    public Account getAccount(String id) throws ResourceNotFoundException {
        return accountRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Account not available."));
    }

    @Override
    public List<Account> getAllAccounts(int page, int size) {
        Page<Account> accs = accountRepository.findAll(PageRequest.of(page, size));
        return accs.getContent();
    }
}
