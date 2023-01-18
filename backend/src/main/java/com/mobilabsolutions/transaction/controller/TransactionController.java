package com.mobilabsolutions.transaction.controller;

import com.mobilabsolutions.transaction.dto.TransactionDto;
import com.mobilabsolutions.common.exception.InsufficientFundsException;
import com.mobilabsolutions.common.exception.ResourceNotFoundException;
import com.mobilabsolutions.transaction.model.Transaction;
import com.mobilabsolutions.transaction.service.TransactionService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class TransactionController {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/transactions")
    public ResponseEntity createTransaction(@RequestBody TransactionDto transactionDto) throws ResourceNotFoundException, InsufficientFundsException {
        Transaction trans = modelMapper.map(transactionDto, Transaction.class);
        Transaction createdTrans = transactionService.createTransaction(trans);
        TransactionDto createdTransDto = modelMapper.map(createdTrans, TransactionDto.class);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdTransDto.getId()).toUri();
        return ResponseEntity.created(location).body(createdTransDto);
    }

    @GetMapping("/transactions")
    public ResponseEntity getAllTransactionsByDate(@RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") Date from, @RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") Date to) {
        List<Transaction> trans = transactionService.getAllTransactionsBetween(from, to);
        List<TransactionDto> transDtos = modelMapper.map(trans, new TypeToken<List<TransactionDto>>(){}.getType());
        return ResponseEntity.ok(transDtos);
    }
}
