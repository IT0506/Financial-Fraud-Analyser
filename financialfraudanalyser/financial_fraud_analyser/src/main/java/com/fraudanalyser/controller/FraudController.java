package com.fraudanalyser.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fraudanalyser.entity.Transaction;
import com.fraudanalyser.service.AIService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/fraud")
public class FraudController {

    @Autowired
    private AIService aiService;

    @GetMapping("/test")
    public String test() {
        return "Backend Working";
    }

    @PostMapping("/analyze")
    public Map analyze(@RequestBody Transaction txn) {

        // Call AI service (your real flow)
        return aiService.analyzeTransaction(txn);
    }
}