package com.borderlesslocalassistant.repository;

import com.borderlesslocalassistant.DatabaseConnection;
import com.borderlesslocalassistant.model.EtiquetteRule;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public final class EtiquetteRuleRepository {
    public List<EtiquetteRule> findByCityAndLanguage(int cityId, String languageCode)
            throws IOException, SQLException {
        String sql = "SELECT rule_id, city_id, category, title, description, language_code "
                + "FROM rules_and_etiquette WHERE city_id = ? AND language_code = ? "
                + "ORDER BY category, title";
        List<EtiquetteRule> rules = new ArrayList<>();

        try (Connection connection = DatabaseConnection.open();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, cityId);
            statement.setString(2, languageCode);
            try (ResultSet results = statement.executeQuery()) {
                while (results.next()) {
                    rules.add(new EtiquetteRule(
                            results.getInt("rule_id"),
                            results.getInt("city_id"),
                            results.getString("category"),
                            results.getString("title"),
                            results.getString("description"),
                            results.getString("language_code")));
                }
            }
        }
        return rules;
    }
}
