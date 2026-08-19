package com.smartcurrency.currency_converter;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ConversionHistoryRepository
        extends JpaRepository<ConversionHistory, Long> {
}
