package com.mobilabsolutions.currency.api;

import java.util.Date;
import java.util.Map;
import java.util.NoSuchElementException;
import java.math.BigDecimal;

public class ExchangeRate {

    private Map<String, BigDecimal> rates;

    private String base;

    private String date;

    public Map<String, BigDecimal> getRates() {
        return rates;
    }

    public void setRates(Map<String, BigDecimal> rates) {
        this.rates = rates;
    }

    public BigDecimal getRate(String currency) {
        BigDecimal rate = rates.get(currency);

        if (rate == null)
            throw new NoSuchElementException("Currency not found.");

        return rate;
    }

    public String getBase() {
        return base;
    }

    public void setBase(String base) {
        this.base = base;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
