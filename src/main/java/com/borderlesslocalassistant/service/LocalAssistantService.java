package com.borderlesslocalassistant.service;

import com.borderlesslocalassistant.model.City;
import com.borderlesslocalassistant.model.CityOverview;
import com.borderlesslocalassistant.model.EtiquetteRule;
import com.borderlesslocalassistant.model.TransitGuide;
import com.borderlesslocalassistant.repository.CityRepository;
import com.borderlesslocalassistant.repository.EtiquetteRuleRepository;
import com.borderlesslocalassistant.repository.TransitGuideRepository;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

public final class LocalAssistantService {
    private final CityRepository cityRepository = new CityRepository();
    private final EtiquetteRuleRepository ruleRepository = new EtiquetteRuleRepository();
    private final TransitGuideRepository transitGuideRepository = new TransitGuideRepository();

    public List<City> listCities() throws IOException, SQLException {
        return cityRepository.findAll();
    }

    public CityOverview getCityOverview(int cityId, String languageCode) throws IOException, SQLException {
        City city = cityRepository.findById(cityId)
                .orElseThrow(() -> new IllegalArgumentException("No city found with ID " + cityId));
        List<EtiquetteRule> rules = ruleRepository.findByCityAndLanguage(cityId, languageCode);
        List<TransitGuide> guides = transitGuideRepository.findByCityAndLanguage(cityId, languageCode);
        return new CityOverview(city, rules, guides);
    }
}
