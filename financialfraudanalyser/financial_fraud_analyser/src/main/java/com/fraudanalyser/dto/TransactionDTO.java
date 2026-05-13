package com.fraudanalyser.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;

public class TransactionDTO {

    @NotBlank(message = "Sender is required")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Sender must contain only letters and spaces")
    private String sender;

    @NotBlank(message = "Receiver is required")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Receiver must contain only letters and spaces")
    private String receiver;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be greater than 0")
    private Double amount;

    @NotBlank(message = "Location is required")
    @Pattern(regexp = "^[A-Za-z0-9, -]+$", message = "Invalid location format")
    private String location;

    @NotBlank(message = "Status is required")
    @Pattern(regexp = "^(PENDING|SUCCESS|FAILED)$", message = "Status must be PENDING, SUCCESS, or FAILED")
    private String status;

    // getters and setters
    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
