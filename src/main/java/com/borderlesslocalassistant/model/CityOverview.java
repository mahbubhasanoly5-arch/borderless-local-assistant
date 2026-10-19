package com.borderlesslocalassistant.model;

import java.util.List;

public record CityOverview(City city, List<EtiquetteRule> rules, List<TransitGuide> transitGuides) {
    public CityOverview {
        rules = List.copyOf(rules);
        transitGuides = List.copyOf(transitGuides);
    }
}
