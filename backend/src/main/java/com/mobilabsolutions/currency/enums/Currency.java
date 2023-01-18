package com.mobilabsolutions.currency.enums;

public enum Currency {
    DOLLAR("USD"),
    EURO("EUR");

    String value;

    Currency(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
