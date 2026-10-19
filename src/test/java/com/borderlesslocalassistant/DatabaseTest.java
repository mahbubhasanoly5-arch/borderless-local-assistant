package com.borderlesslocalassistant;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/** A small manual smoke test for the local MySQL connection. */
public final class DatabaseTest {
    private DatabaseTest() {
    }

    public static void main(String[] args) {
        try (Connection connection = DatabaseConnection.open();
             Statement statement = connection.createStatement();
             ResultSet result = statement.executeQuery("SELECT 1")) {
            if (result.next() && result.getInt(1) == 1) {
                System.out.println("MySQL connection successful.");
                System.out.println("Database: " + connection.getCatalog());
                System.out.println("MySQL version: " + connection.getMetaData().getDatabaseProductVersion());
                printTableColumns(connection);
                printDataSummary(connection);
            } else {
                throw new IllegalStateException("Connected to MySQL, but the test query returned no result.");
            }
        } catch (SQLException | java.io.IOException exception) {
            throw new IllegalStateException("MySQL connection test failed: " + exception.getMessage()
                    + ". Check that MySQL is running and local.properties has the correct URL, username, and password.", exception);
        }
    }

    private static void printTableColumns(Connection connection) throws SQLException {
        DatabaseMetaData metadata = connection.getMetaData();
        try (ResultSet tables = metadata.getTables(connection.getCatalog(), null, "%", new String[]{"TABLE"})) {
            while (tables.next()) {
                String tableName = tables.getString("TABLE_NAME");
                System.out.println("Table: " + tableName);
                try (ResultSet columns = metadata.getColumns(connection.getCatalog(), null, tableName, "%")) {
                    while (columns.next()) {
                        System.out.printf("  %s (%s)%n", columns.getString("COLUMN_NAME"), columns.getString("TYPE_NAME"));
                    }
                }
            }
        }
    }

    private static void printDataSummary(Connection connection) throws SQLException {
        System.out.println("City sample:");
        try (Statement statement = connection.createStatement();
             ResultSet cities = statement.executeQuery("SELECT city_id, city_name FROM cities ORDER BY city_id")) {
            while (cities.next()) {
                System.out.printf("  %d: %s%n", cities.getInt("city_id"), cities.getString("city_name"));
            }
        }

        for (String table : new String[]{"rules_and_etiquette", "transit_guides"}) {
            try (Statement statement = connection.createStatement();
                 ResultSet languages = statement.executeQuery(
                         "SELECT DISTINCT language_code FROM " + table + " ORDER BY language_code")) {
                System.out.print("Languages in " + table + ": ");
                boolean first = true;
                while (languages.next()) {
                    if (!first) {
                        System.out.print(", ");
                    }
                    System.out.print(languages.getString("language_code"));
                    first = false;
                }
                System.out.println();
            }
        }

    }
}
