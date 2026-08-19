package com.smartcurrency.currency_converter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class ExchangeRateService {

    private final WebClient webClient;

    @Value("${exchange-rate.api.key}")
    private String apiKey;

    public ExchangeRateService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }
    public double getExchangeRate(String from, String to) {

    String url = "https://v6.exchangerate-api.com/v6/"
            + apiKey
            + "/latest/"
            + from;

    ExchangeRateResponse response = webClient
            .get()
            .uri(url)
            .retrieve()
            .bodyToMono(ExchangeRateResponse.class)
            .block();

    if (response == null || !"success".equals(response.getResult())) {
        throw new RuntimeException("Failed to retrieve exchange rate");
    }

    Double rate = response.getConversion_rates().get(to);

    if (rate == null) {
        throw new RuntimeException("Unsupported target currency: " + to);
    }

    return rate;
}
}