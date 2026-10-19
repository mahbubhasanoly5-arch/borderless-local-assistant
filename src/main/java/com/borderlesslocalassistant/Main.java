package com.borderlesslocalassistant;

import com.borderlesslocalassistant.model.City;
import com.borderlesslocalassistant.model.CityOverview;
import com.borderlesslocalassistant.service.LocalAssistantService;

import java.util.List;
import java.util.Scanner;

public final class Main {
    private Main() {
    }

    public static void main(String[] args) {
        LocalAssistantService service = new LocalAssistantService();

        try (Scanner input = new Scanner(System.in)) {
            List<City> cities = service.listCities();
            if (cities.isEmpty()) {
                System.out.println("There are no cities in the database yet.");
                return;
            }

            System.out.println("Cities:");
            for (City city : cities) {
                System.out.printf("%d. %s%n", city.cityId(), city.cityName());
            }

            System.out.print("Enter a city ID: ");
            int cityId = Integer.parseInt(input.nextLine().trim());
            System.out.print("Language code (bn, en, ja, my): ");
            String languageCode = input.nextLine().trim().toLowerCase();

            CityOverview overview = service.getCityOverview(cityId, languageCode);
            System.out.println("\n" + overview.city().cityName());

            System.out.println("\nRules and etiquette:");
            if (overview.rules().isEmpty()) {
                System.out.println("No rules are available for this language.");
            } else {
                overview.rules().forEach(rule -> System.out.printf("- [%s] %s: %s%n",
                        rule.category(), rule.title(), rule.description()));
            }

            System.out.println("\nTransit guides:");
            if (overview.transitGuides().isEmpty()) {
                System.out.println("No transit guides are available for this language.");
            } else {
                overview.transitGuides().forEach(guide -> System.out.printf("- %s: %s%n",
                        guide.transportType(), guide.instructions()));
            }
        } catch (NumberFormatException exception) {
            System.err.println("Please enter the city ID as a number, such as 1.");
        } catch (IllegalArgumentException exception) {
            System.err.println(exception.getMessage());
        } catch (Exception exception) {
            System.err.println("The assistant could not load data: " + exception.getMessage());
        }
    }
}
