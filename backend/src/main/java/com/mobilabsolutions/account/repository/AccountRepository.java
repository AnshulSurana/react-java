package com.mobilabsolutions.account.repository;

import com.mobilabsolutions.account.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, String> {

}
