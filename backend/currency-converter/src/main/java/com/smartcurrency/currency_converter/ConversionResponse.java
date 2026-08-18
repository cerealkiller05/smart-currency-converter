package com.smartcurrency.currency_converter;


public class ConversionResponse {

    private String fromCurrency;
    private String toCurrency;
    private double originalAmount;

    public ConversionResponse(String fromCurrency, String toCurrency, double originalAmount) {
        this.fromCurrency = fromCurrency;
        this.toCurrency = toCurrency;
        this.originalAmount = originalAmount;
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
}