package com.fraudanalyser.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fraudanalyser.entity.Transaction;
@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

}
