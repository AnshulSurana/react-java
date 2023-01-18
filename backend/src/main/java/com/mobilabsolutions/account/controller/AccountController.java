package com.mobilabsolutions.account.controller;

import com.mobilabsolutions.account.dto.AccountDto;
import com.mobilabsolutions.common.exception.ResourceNotFoundException;
import com.mobilabsolutions.account.model.Account;
import com.mobilabsolutions.account.service.AccountService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class AccountController {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AccountService accountService;

    @PostMapping("/accounts")
    public ResponseEntity createAccount(@RequestBody AccountDto accountDto) {
        Account acc = modelMapper.map(accountDto, Account.class);
        Account createdAcc = accountService.createAccount(acc);
        AccountDto createdAccountDto = modelMapper.map(createdAcc, AccountDto.class);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdAcc.getId()).toUri();
        return ResponseEntity.created(location).body(createdAccountDto);
    }

    @PutMapping("/accounts/{id}")
    public ResponseEntity updateAccount(@PathVariable(value = "id") String id, @RequestBody AccountDto accountDto) throws ResourceNotFoundException {
        Account acc = modelMapper.map(accountDto, Account.class);
        Account updatedAcc = accountService.updateAccount(id, acc);
        AccountDto updatedAccountDto = modelMapper.map(updatedAcc, AccountDto.class);
        return ResponseEntity.ok(updatedAccountDto);
    }
    
    @GetMapping("/accounts/{id}")
    public ResponseEntity getAccount(@PathVariable(value = "id") String id) throws ResourceNotFoundException {
        Account acc = accountService.getAccount(id);
        AccountDto accountDto = modelMapper.map(acc, AccountDto.class);
        return ResponseEntity.ok(accountDto);
    }

    @GetMapping("/accounts")
    public ResponseEntity getAllAccounts(@RequestParam Integer page, @RequestParam Integer size) throws ResourceNotFoundException {
        List<Account> accs = accountService.getAllAccounts(page, size);
        List<AccountDto> accDtos = modelMapper.map(accs, new TypeToken<List<AccountDto>>(){}.getType());
        return ResponseEntity.ok(accDtos);
    }
}
