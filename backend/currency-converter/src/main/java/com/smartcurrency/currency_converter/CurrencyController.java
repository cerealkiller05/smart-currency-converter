package com.smartcurrency.currency_converter;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CurrencyController {

    @GetMapping("/api/convert")
    public ConversionResponse convert(
        @RequestParam String from,
        @RequestParam String to,
        @RequestParam double amount) {

        return new ConversionResponse(from, to, amount);
    }
}