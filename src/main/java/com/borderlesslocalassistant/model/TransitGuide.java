package com.borderlesslocalassistant.model;

public record TransitGuide(
        int guideId,
        int cityId,
        String transportType,
        String instructions,
        String languageCode) {
}
