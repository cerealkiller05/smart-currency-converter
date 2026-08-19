package com.smartcurrency.currency_converter;

public class ConversionResponse {

    private String fromCurrency;
    private String toCurrency;
    private double originalAmount;
    private double exchangeRate;
    private double convertedAmount;

    public ConversionResponse(
            String fromCurrency,
            String toCurrency,
            double originalAmount,
            double exchangeRate,
            double convertedAmount) {

        this.fromCurrency = fromCurrency;
        this.toCurrency = toCurrency;
        this.originalAmount = originalAmount;
        this.exchangeRate = exchangeRate;
        this.convertedAmount = convertedAmount;
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

    public double getExchangeRate() {
        return exchangeRate;
    }

    public double getConvertedAmount() {
        return convertedAmount;
    }
}