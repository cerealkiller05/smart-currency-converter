package com.smartcurrency.currency_converter;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "conversion_history")
public class ConversionHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fromCurrency;
    private String toCurrency;
    private double originalAmount;
    private double convertedAmount;
    private LocalDateTime timestamp;

    public ConversionHistory() {
    }

    public ConversionHistory(
            String fromCurrency,
            String toCurrency,
            double originalAmount,
            double convertedAmount,
            LocalDateTime timestamp) {

        this.fromCurrency = fromCurrency;
        this.toCurrency = toCurrency;
        this.originalAmount = originalAmount;
        this.convertedAmount = convertedAmount;
        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public String getFromCurrency() {
        return fromCurrency;
    }

    public String getToCurrency() {
        return toCurrency;
    }

    public double getOriginalAmount() {
        return originalAmount;
    }

    public double getConvertedAmount() {
        return convertedAmount;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
}