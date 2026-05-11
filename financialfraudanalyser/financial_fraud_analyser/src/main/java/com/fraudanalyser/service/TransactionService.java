package com.fraudanalyser.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fraudanalyser.entity.Transaction;
import com.fraudanalyser.repo.TransactionRepository;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository repo;

    public Transaction save(Transaction txn) {
        return repo.save(txn);
    }
}