package com.smartcurrency.currency_converter;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CurrencyController {

    private final CurrencyService currencyService;

    public CurrencyController(CurrencyService currencyService) {
        this.currencyService = currencyService;
    }

    @GetMapping("/convert")
    public ConversionResponse convert(
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam double amount) {

        return currencyService.convert(from, to, amount);
    }

    @GetMapping("/history")
    public List<ConversionHistory> getHistory() {
        return currencyService.getHistory();
    }
}