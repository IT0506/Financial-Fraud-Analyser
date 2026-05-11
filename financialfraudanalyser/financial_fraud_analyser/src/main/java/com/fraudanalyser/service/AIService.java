package com.fraudanalyser.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class AIService {

    public Map analyzeTransaction(Object transaction) {

        RestTemplate restTemplate = new RestTemplate();

        String url = "http://127.0.0.1:8000/predict";

        Map response = restTemplate.postForObject(
                url,
                transaction,
                Map.class
        );

        return response;
    }
}
