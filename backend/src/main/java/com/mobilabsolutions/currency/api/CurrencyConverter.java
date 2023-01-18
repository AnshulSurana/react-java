package com.mobilabsolutions.currency.api;

import com.mobilabsolutions.currency.enums.Currency;
import java.math.BigDecimal;

public interface CurrencyConverter {

    BigDecimal convert(BigDecimal amount, Currency from, Currency to);
}
