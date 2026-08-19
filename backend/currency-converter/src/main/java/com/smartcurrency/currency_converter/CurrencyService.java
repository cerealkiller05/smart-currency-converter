package com.smartcurrency.currency_converter;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class CurrencyService {

    private final ExchangeRateService exchangeRateService;
    private final ConversionHistoryRepository conversionHistoryRepository;

    public CurrencyService(
            ExchangeRateService exchangeRateService,
            ConversionHistoryRepository conversionHistoryRepository) {

        this.exchangeRateService = exchangeRateService;
        this.conversionHistoryRepository = conversionHistoryRepository;
    }

    public ConversionResponse convert(
            String from,
            String to,
            double amount) {

        double exchangeRate =
                exchangeRateService.getExchangeRate(from, to);

        double convertedAmount =
                amount * exchangeRate;

        ConversionHistory history = new ConversionHistory(
                from,
                to,
                amount,
                convertedAmount,
                java.time.LocalDateTime.now()
        );

        conversionHistoryRepository.save(history);

        return new ConversionResponse(
                from,
                to,
                amount,
                exchangeRate,
                convertedAmount
        );
    }

    public List<ConversionHistory> getHistory() {
        return conversionHistoryRepository.findAll();
    }
}