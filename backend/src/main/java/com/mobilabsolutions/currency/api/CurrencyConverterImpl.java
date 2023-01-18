package com.mobilabsolutions.currency.api;

import com.mobilabsolutions.currency.enums.Currency;
import com.mobilabsolutions.common.exception.ServiceUnavailableException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import java.math.BigDecimal;

@Component
public class CurrencyConverterImpl implements CurrencyConverter {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${api.exchange-rate}")
    private String baseURL;

    public BigDecimal convert(BigDecimal amount, Currency from, Currency to) {
        try {
            String url = baseURL + "latest?base=" + from.getValue() + "&symbols=" + to.getValue();
            ExchangeRate exchangeRate = restTemplate.getForObject(url, ExchangeRate.class);
            BigDecimal rate = exchangeRate.getRate(to.getValue());
            return rate.multiply(amount);
        } catch (Exception e) {
            throw new ServiceUnavailableException("Connection to currency conversion api failed.", e);
        }
    }
}
