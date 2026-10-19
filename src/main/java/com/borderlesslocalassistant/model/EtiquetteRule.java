package com.borderlesslocalassistant.model;

public record EtiquetteRule(
        int ruleId,
        int cityId,
        String category,
        String title,
        String description,
        String languageCode) {
}
