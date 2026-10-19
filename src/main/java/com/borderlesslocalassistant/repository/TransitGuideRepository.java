package com.borderlesslocalassistant.repository;

import com.borderlesslocalassistant.DatabaseConnection;
import com.borderlesslocalassistant.model.TransitGuide;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public final class TransitGuideRepository {
    public List<TransitGuide> findByCityAndLanguage(int cityId, String languageCode)
            throws IOException, SQLException {
        String sql = "SELECT guide_id, city_id, transport_type, instructions, language_code "
                + "FROM transit_guides WHERE city_id = ? AND language_code = ? "
                + "ORDER BY transport_type";
        List<TransitGuide> guides = new ArrayList<>();

        try (Connection connection = DatabaseConnection.open();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, cityId);
            statement.setString(2, languageCode);
            try (ResultSet results = statement.executeQuery()) {
                while (results.next()) {
                    guides.add(new TransitGuide(
                            results.getInt("guide_id"),
                            results.getInt("city_id"),
                            results.getString("transport_type"),
                            results.getString("instructions"),
                            results.getString("language_code")));
                }
            }
        }
        return guides;
    }
}
