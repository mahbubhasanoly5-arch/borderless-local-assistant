package com.borderlesslocalassistant.repository;

import com.borderlesslocalassistant.DatabaseConnection;
import com.borderlesslocalassistant.model.City;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public final class CityRepository {
    public List<City> findAll() throws IOException, SQLException {
        String sql = "SELECT city_id, city_name FROM cities ORDER BY city_id";
        List<City> cities = new ArrayList<>();

        try (Connection connection = DatabaseConnection.open();
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet results = statement.executeQuery()) {
            while (results.next()) {
                cities.add(new City(results.getInt("city_id"), results.getString("city_name")));
            }
        }
        return cities;
    }

    public Optional<City> findById(int cityId) throws IOException, SQLException {
        String sql = "SELECT city_id, city_name FROM cities WHERE city_id = ?";

        try (Connection connection = DatabaseConnection.open();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, cityId);
            try (ResultSet results = statement.executeQuery()) {
                if (results.next()) {
                    return Optional.of(new City(results.getInt("city_id"), results.getString("city_name")));
                }
            }
        }
        return Optional.empty();
    }
}
