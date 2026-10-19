const destinations = [
 {country:'Australia',region:'Oceania',cities:[
  {name:'Sydney',sights:['Sydney Opera House','Sydney Harbour Bridge','Bondi to Coogee coastal walk'],foods:['Meat pie','Lamington'],transit:['Use trains, buses, ferries and light rail; tap-on/payment rules vary by service.','From the airport, compare the airport train with bus or taxi options for your address.']},
  {name:'Melbourne',sights:['Royal Botanic Gardens Victoria','Federation Square','National Gallery of Victoria'],foods:['Flat white coffee','Meat pie'],transit:['Trams, trains and buses cover the city; check current fare zones and ticket rules.','Compare airport bus, taxi and rideshare options before arrival.']}
 ]},
 {country:'Canada',region:'North America',cities:[
  {name:'Toronto',sights:['CN Tower','Royal Ontario Museum','Toronto Islands'],foods:['Peameal bacon sandwich','Butter tart'],transit:['Use TTC subway, streetcars and buses; check service alerts and fare options.','Airport rail and bus connections are available; confirm the best route for your stay.']},
  {name:'Vancouver',sights:['Stanley Park','Granville Island','Capilano Suspension Bridge Park'],foods:['Pacific salmon','Japadog'],transit:['SkyTrain, buses and SeaBus connect many visitor areas.','Check TransLink for current fares, airport links and service notices.']}
 ]},
 {country:'China',region:'East Asia',cities:[
  {name:'Beijing',sights:['Great Wall of China','Forbidden City','Temple of Heaven'],foods:['Peking duck','Zhajiangmian noodles'],transit:['Metro and buses serve the city; check current payment and visitor entry requirements.','From the airport or rail station, compare metro, airport rail and licensed taxi options.']},
  {name:'Shanghai',sights:['The Bund','Yu Garden','Shanghai Museum'],foods:['Xiaolongbao','Shengjianbao'],transit:['Metro is extensive; confirm station exits, payment methods and operating hours.','Use official airport and railway information for onward connections.']}
 ]},
 {country:'Egypt',region:'Africa',cities:[
  {name:'Cairo',sights:['Pyramids of Giza','Egyptian Museum','Khan el-Khalili'],foods:['Koshari','Ful medames'],transit:['Use licensed taxis or ride services and check current metro coverage for your route.','Arrange airport transfer details in advance and follow current local travel advice.']},
  {name:'Luxor',sights:['Karnak Temple','Valley of the Kings','Luxor Temple'],foods:['Taameya','Egyptian grilled dishes'],transit:['Taxis, local buses and organized tours are common; agree on the trip details before departure.','Confirm site opening and transport arrangements with official visitor sources.']}
 ]},
 {country:'France',region:'Europe',cities:[
  {name:'Paris',sights:['Eiffel Tower','Louvre Museum','Notre-Dame Cathedral'],foods:['Croissant','Crêpe','French onion soup'],transit:['Metro, RER trains, buses and trams serve the city; check current passes and service updates.','Compare airport rail, bus and licensed taxi routes for your destination.']},
  {name:'Nice',sights:['Promenade des Anglais','Vieux Nice','Castle Hill'],foods:['Socca','Salade niçoise'],transit:['Trams and buses serve Nice; regional trains connect coastal towns.','Check airport tram/bus service and current schedules before travelling.']}
 ]},
 {country:'Germany',region:'Europe',cities:[
  {name:'Berlin',sights:['Brandenburg Gate','Museum Island','Berlin Wall Memorial'],foods:['Currywurst','Berliner doughnut'],transit:['U-Bahn, S-Bahn, trams and buses; validate tickets where required.','Use official BVG or airport information for routes, fares and disruptions.']},
  {name:'Munich',sights:['Marienplatz','Deutsches Museum','Nymphenburg Palace'],foods:['Pretzel','Weisswurst'],transit:['U-Bahn, S-Bahn, trams and buses cover central areas.','Check MVV for current airport connections, tickets and timetables.']}
 ]},
 {country:'Greece',region:'Europe',cities:[
  {name:'Athens',sights:['Acropolis of Athens','Acropolis Museum','Plaka'],foods:['Souvlaki','Spanakopita'],transit:['Metro, buses and trams serve the city; check service and ticket information.','Airport metro and bus options vary by time; confirm current schedules.']},
  {name:'Santorini',sights:['Oia','Fira','Akrotiri archaeological site'],foods:['Tomato fritters','Fava Santorinis'],transit:['Local buses connect popular settlements; schedules can vary by season.','Ferries and flights serve the island; check operator schedules and port details.']}
 ]},
 {country:'India',region:'South Asia',cities:[
  {name:'Delhi',sights:['Humayun’s Tomb','Qutub Minar','India Gate'],foods:['Chole bhature','Paratha'],transit:['Delhi Metro and buses cover many areas; use official fare and route information.','Compare airport metro, prepaid taxi and app-based rides for your destination.']},
  {name:'Agra',sights:['Taj Mahal','Agra Fort','Fatehpur Sikri'],foods:['Petha','Mughlai dishes'],transit:['Use licensed taxis or local transport; confirm monument entry rules and timings.','Rail and road links connect Agra with major cities; check current schedules.']}
 ]},
 {country:'Indonesia',region:'Southeast Asia',cities:[
  {name:'Bali (Denpasar)',sights:['Uluwatu Temple','Tegallalang Rice Terraces','Ubud Art Market'],foods:['Nasi campur','Satay lilit'],transit:['Ride-hailing, taxis and private drivers are common; agree on pickup details.','Check current airport transfer options and local road conditions.']},
  {name:'Jakarta',sights:['National Monument','Kota Tua','Istiqlal Mosque'],foods:['Nasi goreng','Soto Betawi'],transit:['MRT, commuter rail, buses and app-based rides serve different areas.','Traffic can affect journey times; check live route options before leaving.']}
 ]},
 {country:'Italy',region:'Europe',cities:[
  {name:'Rome',sights:['Colosseum','Vatican Museums','Trevi Fountain'],foods:['Carbonara','Supplì','Gelato'],transit:['Metro, buses and trams serve the city; walking is useful in historic areas.','Use official airport train/bus details and reserve timed-entry sites when needed.']},
  {name:'Florence',sights:['Uffizi Gallery','Florence Cathedral','Ponte Vecchio'],foods:['Bistecca alla fiorentina','Ribollita'],transit:['The historic centre is walkable; trams and buses cover farther areas.','Regional trains connect Florence with other Italian cities; check current schedules.']}
 ]},
 {country:'Japan',region:'East Asia',cities:[
  {name:'Tokyo',sights:['Senso-ji Temple','Shibuya Crossing','Tokyo National Museum'],foods:['Sushi','Ramen','Tempura'],transit:['JR trains, metro and buses are extensive; check route, last-train and ticket details.','Airport rail, bus and taxi options depend on which airport and neighbourhood you use.']},
  {name:'Kyoto',sights:['Fushimi Inari Taisha','Kiyomizu-dera','Arashiyama Bamboo Grove'],foods:['Yudofu','Matcha sweets','Kyoto-style sushi'],transit:['Buses, subway and trains connect sights; allow extra time at busy periods.','Shinkansen and regional trains connect Kyoto to other cities; confirm station and ticket details.']}
 ]},
 {country:'Malaysia',region:'Southeast Asia',cities:[
  {name:'Kuala Lumpur',sights:['Petronas Twin Towers','Batu Caves','Central Market'],foods:['Nasi lemak','Roti canai'],transit:['MRT, LRT, monorail, commuter rail and buses cover many areas.','Check airport express, bus and taxi options for your hotel area.']},
  {name:'George Town (Penang)',sights:['George Town UNESCO heritage area','Kek Lok Si Temple','Penang Hill'],foods:['Char kway teow','Asam laksa'],transit:['Local buses and ride services are available; walking works in the heritage core.','Ferries, buses and flights connect Penang; verify current operator schedules.']}
 ]},
 {country:'Mexico',region:'North America',cities:[
  {name:'Mexico City',sights:['Museo Nacional de Antropología','Chapultepec Park','Historic Centre'],foods:['Tacos al pastor','Tamales'],transit:['Metro, Metrobús and buses operate across the city; review official safety and ticket guidance.','Use authorized airport transport and check current route information.']},
  {name:'Cancún',sights:['Maya Museum of Cancún','Isla Mujeres','El Rey archaeological zone'],foods:['Cochinita pibil','Panuchos'],transit:['Local buses and authorized taxis serve visitor areas; confirm fares before boarding.','Airport shuttles, buses and taxis serve the hotel zone; compare official options.']}
 ]},
 {country:'Morocco',region:'Africa',cities:[
  {name:'Marrakech',sights:['Jemaa el-Fnaa','Bahia Palace','Majorelle Garden'],foods:['Tagine','Couscous'],transit:['Walk in the medina and use licensed taxis or buses for longer distances.','Confirm airport transfer and agreed fare before setting off.']},
  {name:'Fes',sights:['Fes el Bali medina','Bou Inania Madrasa','Chouara Tannery'],foods:['Pastilla','Harira'],transit:['The old medina is largely explored on foot; use landmarks and official guides.','Rail and road connections are available; check current schedules.']}
 ]},
 {country:'Portugal',region:'Europe',cities:[
  {name:'Lisbon',sights:['Belém Tower','Jerónimos Monastery','Alfama'],foods:['Pastel de nata','Bacalhau'],transit:['Metro, buses, trams and suburban trains; check current ticket options.','Metro and bus links serve the airport; verify schedules and route changes.']},
  {name:'Porto',sights:['Ribeira','Livraria Lello','São Bento Station'],foods:['Francesinha','Pastel de nata'],transit:['Metro, buses and suburban rail; central hills can make walking slower.','Metro connects the airport with the city; confirm current timetable.']}
 ]},
 {country:'Singapore',region:'Southeast Asia',cities:[
  {name:'Singapore',sights:['Gardens by the Bay','National Gallery Singapore','Singapore Botanic Gardens'],foods:['Hainanese chicken rice','Laksa','Chilli crab'],transit:['MRT and buses are convenient; check current fare media and attraction opening times.','MRT, bus and taxi options connect Changi Airport with the city.']}
 ]},
 {country:'South Korea',region:'East Asia',cities:[
  {name:'Seoul',sights:['Gyeongbokgung Palace','National Museum of Korea','N Seoul Tower'],foods:['Bibimbap','Kimchi jjigae','Tteokbokki'],transit:['Subway and buses cover the city; confirm transit-card and route details.','Airport rail, bus and taxi options serve different districts.']},
  {name:'Busan',sights:['Gamcheon Culture Village','Haeundae Beach','Jagalchi Market'],foods:['Dwaeji gukbap','Milmyeon'],transit:['Metro and buses serve the city; some coastal sights need a bus or taxi connection.','Rail and air links connect Busan with other cities; check current operator information.']}
 ]},
 {country:'Spain',region:'Europe',cities:[
  {name:'Barcelona',sights:['Sagrada Família','Park Güell','Gothic Quarter'],foods:['Pa amb tomàquet','Tapas','Crema catalana'],transit:['Metro, buses, trams and regional trains; check ticket zones and airport service.','Airport metro, train, bus and taxi options vary by terminal and destination.']},
  {name:'Madrid',sights:['Prado Museum','Royal Palace of Madrid','Retiro Park'],foods:['Churros con chocolate','Bocadillo de calamares'],transit:['Metro, buses and suburban trains serve the city.','Metro, train, bus and taxi options connect the airport; check current service.']}
 ]},
 {country:'Thailand',region:'Southeast Asia',cities:[
  {name:'Bangkok',sights:['Grand Palace','Wat Arun','Chatuchak Weekend Market'],foods:['Pad Thai','Tom yum','Mango sticky rice'],transit:['BTS, MRT, river boats and buses; plan for traffic and check operating hours.','Airport rail, bus and taxi routes depend on which airport you arrive at.']},
  {name:'Chiang Mai',sights:['Wat Phra That Doi Suthep','Old City temples','Night Bazaar'],foods:['Khao soi','Sai ua sausage'],transit:['Songthaews, local buses and ride services are common; agree destination and fare.','Airport is near the city; check current transfer options and local schedules.']}
 ]},
 {country:'Türkiye',region:'Europe & West Asia',cities:[
  {name:'Istanbul',sights:['Hagia Sophia','Topkapı Palace','Grand Bazaar'],foods:['Simit','Döner kebab','Baklava'],transit:['Metro, tram, buses and ferries; check current transit-card and route information.','Airport transfer options vary by airport; use official transport details.']},
  {name:'Cappadocia (Göreme)',sights:['Göreme Open-Air Museum','Uçhisar Castle','Ihlara Valley'],foods:['Testi kebabı','Manti'],transit:['Regional buses and tours connect sites; distances between valleys can be substantial.','Flights usually arrive via nearby regional airports; verify onward shuttle schedules.']}
 ]},
 {country:'United Arab Emirates',region:'West Asia',cities:[
  {name:'Dubai',sights:['Burj Khalifa','Museum of the Future','Al Fahidi Historical Neighbourhood'],foods:['Machboos','Luqaimat'],transit:['Metro, tram, buses and taxis; check service hours and station connections.','Airport metro, bus and taxi connections depend on terminal and destination.']},
  {name:'Abu Dhabi',sights:['Sheikh Zayed Grand Mosque','Louvre Abu Dhabi','Qasr Al Watan'],foods:['Harees','Shawarma'],transit:['Buses and taxis connect major areas; check current routes and attraction access rules.','Airport taxi and bus services are available; verify schedules before travel.']}
 ]},
 {country:'United Kingdom',region:'Europe',cities:[
  {name:'London',sights:['British Museum','Tower of London','National Gallery'],foods:['Fish and chips','Sunday roast'],transit:['Tube, Elizabeth line, DLR, Overground, buses and river services.','Heathrow and Gatwick offer rail and other transport links; check current routes and fares.']},
  {name:'Edinburgh',sights:['Edinburgh Castle','National Museum of Scotland','Royal Mile'],foods:['Haggis','Cranachan'],transit:['Trams and buses serve the city; much of the historic centre is walkable.','Airport tram, bus and taxi options connect to the centre; verify current times.']}
 ]},
 {country:'United States',region:'North America',cities:[
  {name:'New York City',sights:['Statue of Liberty','Central Park','Metropolitan Museum of Art'],foods:['New York-style pizza','Bagel'],transit:['Subway, buses and commuter rail; check service alerts and payment rules.','Airport transfer choices differ across JFK, LaGuardia and Newark.']},
  {name:'San Francisco',sights:['Golden Gate Bridge','Alcatraz Island','Fisherman’s Wharf'],foods:['Sourdough bread','Mission-style burrito'],transit:['Muni buses, light rail, cable cars and BART; confirm route and fare details.','Airport rail and bus options connect to the city; check current schedules.']}
 ]},
 {country:'Vietnam',region:'Southeast Asia',cities:[
  {name:'Hanoi',sights:['Temple of Literature','Hoàn Kiếm Lake','Thăng Long Imperial Citadel'],foods:['Phở','Bún chả','Egg coffee'],transit:['Buses and taxis are available; check current metro coverage and local traffic.','Use airport bus, shuttle or licensed taxi options and confirm destination details.']},
  {name:'Ho Chi Minh City',sights:['War Remnants Museum','Independence Palace','Bến Thành Market'],foods:['Bánh mì','Cơm tấm'],transit:['Buses and ride services are common; check current metro service status.','Airport bus and licensed taxi options connect the airport with the city.']}
 ]},
 {country:'Argentina',region:'South America',cities:[
  {name:'Buenos Aires',sights:['Recoleta Cemetery','Teatro Colón','La Boca'],foods:['Asado','Empanadas'],transit:['Subway, buses and commuter rail serve the city; check current payment and route information.','Use official airport transfer information and confirm which airport serves your flight.']},
  {name:'Mendoza',sights:['General San Martín Park','Independence Square','Mendoza wine region'],foods:['Empanadas mendocinas','Asado'],transit:['Local buses and taxis serve the city; winery visits often need advance transport planning.','Check current regional bus and airport connections before setting out.']}
 ]},
 {country:'Austria',region:'Europe',cities:[
  {name:'Vienna',sights:['Schönbrunn Palace','Belvedere Palace','St. Stephen’s Cathedral'],foods:['Wiener schnitzel','Sachertorte'],transit:['U-Bahn, trams and buses cover the city; verify ticket validation rules.','City rail and buses connect the airport; check current fares and schedules.']},
  {name:'Salzburg',sights:['Hohensalzburg Fortress','Mirabell Palace','Salzburg Cathedral'],foods:['Salzburger Nockerl','Bosna sausage'],transit:['The historic centre is walkable; buses connect farther sights.','Rail and bus connections link Salzburg with nearby cities; verify schedules.']}
 ]},
 {country:'Brazil',region:'South America',cities:[
  {name:'Rio de Janeiro',sights:['Christ the Redeemer','Sugarloaf Mountain','Copacabana Beach'],foods:['Feijoada','Pão de queijo'],transit:['Metro, buses and licensed taxis serve visitor areas; check current safety and service advice.','Use official airport transfer choices and confirm your destination before departure.']},
  {name:'São Paulo',sights:['Ibirapuera Park','São Paulo Museum of Art','Municipal Market'],foods:['Pão de queijo','Mortadella sandwich'],transit:['Metro, commuter rail and buses cover the city; plan for traffic and service alerts.','The city has more than one airport; verify the airport and onward route for your ticket.']}
 ]},
 {country:'Cambodia',region:'Southeast Asia',cities:[
  {name:'Siem Reap',sights:['Angkor Wat','Bayon Temple','Ta Prohm'],foods:['Fish amok','Nom banh chok'],transit:['Licensed tuk-tuks and tours are common for temple visits; confirm access and ticket rules.','Check current airport and bus connections into town.']},
  {name:'Phnom Penh',sights:['Royal Palace','National Museum of Cambodia','Tuol Sleng Genocide Museum'],foods:['Bai sach chrouk','Khmer curry'],transit:['Tuk-tuks, buses and taxis are used around the city; confirm fares and pickup points.','Use current airport and intercity bus information for onward travel.']}
 ]},
 {country:'Czechia',region:'Europe',cities:[
  {name:'Prague',sights:['Prague Castle','Charles Bridge','Old Town Square'],foods:['Svíčková','Trdelník'],transit:['Metro, trams and buses connect the city; validate tickets as required.','Airport buses and taxis connect with the centre; check current routes and fares.']}
 ]},
 {country:'Ireland',region:'Europe',cities:[
  {name:'Dublin',sights:['Trinity College Dublin','Kilmainham Gaol','National Museum of Ireland'],foods:['Irish stew','Soda bread'],transit:['DART, Luas trams and buses serve the city; check Leap fare and route details.','Airport bus and taxi options reach the centre; verify current schedules.']},
  {name:'Galway',sights:['Galway City Museum','Spanish Arch','Salthill Promenade'],foods:['Seafood chowder','Soda bread'],transit:['The centre is walkable; buses and regional rail serve wider areas.','Rail and coach links connect Galway with other Irish cities; check operators.']}
 ]},
 {country:'Nepal',region:'South Asia',cities:[
  {name:'Kathmandu',sights:['Swayambhunath Stupa','Pashupatinath Temple','Kathmandu Durbar Square'],foods:['Momo','Dal bhat'],transit:['Taxis and local buses are common; agree on pickup and route details.','Confirm airport transfer and current local travel guidance on arrival.']},
  {name:'Pokhara',sights:['Phewa Lake','World Peace Pagoda','International Mountain Museum'],foods:['Momo','Thakali set'],transit:['Taxis and local buses connect the city; trekking areas need separate planning.','Road and air links operate from Kathmandu; check weather and current schedules.']}
 ]},
 {country:'Netherlands',region:'Europe',cities:[
  {name:'Amsterdam',sights:['Rijksmuseum','Anne Frank House','Canal District'],foods:['Stroopwafel','Herring'],transit:['Trams, metro, buses and ferries; cycling rules and parking need care.','Train and bus services connect Schiphol Airport; check the current route.']},
  {name:'Rotterdam',sights:['Museum Boijmans Van Beuningen','Markthal','Erasmus Bridge'],foods:['Stroopwafel','Kapsalon'],transit:['Metro, trams and buses cover the city; use current RET travel information.','Rail and metro connect Rotterdam with other Dutch cities and the airport region.']}
 ]},
 {country:'New Zealand',region:'Oceania',cities:[
  {name:'Auckland',sights:['Auckland War Memorial Museum','Waiheke Island','Sky Tower'],foods:['Hāngī','Hokey pokey ice cream'],transit:['Trains, buses and ferries serve the region; check AT service and ferry notices.','Airport bus, shuttle and taxi options vary by destination and time.']},
  {name:'Queenstown',sights:['Lake Wakatipu','Queenstown Gardens','Skyline Queenstown'],foods:['Hāngī','New Zealand lamb'],transit:['Local buses and shuttles serve the area; activities may require advance transfers.','Check airport shuttle and regional coach schedules, especially seasonally.']}
 ]},
 {country:'Norway',region:'Europe',cities:[
  {name:'Oslo',sights:['Vigeland Sculpture Park','MUNCH','Akershus Fortress'],foods:['Fårikål','Brown cheese'],transit:['Metro, trams, buses and ferries serve the city; check current Ruter tickets.','Train and bus routes connect the airport with Oslo; verify schedules.']},
  {name:'Bergen',sights:['Bryggen','Fløibanen funicular','Bergen Fish Market'],foods:['Fish soup','Skillingsbolle'],transit:['Light rail, buses and walking connect central sights; weather can change plans.','Light rail and buses connect Bergen Airport with the city; check current service.']}
 ]},
 {country:'Peru',region:'South America',cities:[
  {name:'Lima',sights:['Historic Centre of Lima','Larco Museum','Miraflores waterfront'],foods:['Ceviche','Lomo saltado'],transit:['Buses and the Metropolitano serve the city; use reputable transport and check route info.','Use authorized airport transport and confirm the destination and fare before travel.']},
  {name:'Cusco',sights:['Sacsayhuamán','Qorikancha','Cusco Cathedral'],foods:['Cuy al horno','Chiri uchu'],transit:['The historic centre is walkable; use arranged transport for sites outside town.','Altitude and weather can affect travel; verify train, bus and site-entry arrangements.']}
 ]},
 {country:'Philippines',region:'Southeast Asia',cities:[
  {name:'Manila',sights:['Intramuros','National Museum of the Philippines','Rizal Park'],foods:['Adobo','Halo-halo'],transit:['LRT, MRT, buses and ride services; account for traffic and check service updates.','Airport routes vary by terminal; verify airport transport and pickup zone.']},
  {name:'Cebu City',sights:['Magellan’s Cross','Basilica Minore del Santo Niño','Fort San Pedro'],foods:['Lechon Cebu','Puso rice'],transit:['Buses, jeepneys and taxis serve the city; confirm route and fare locally.','Ferry and air links connect nearby islands; check operator and port details.']}
 ]},
 {country:'Qatar',region:'West Asia',cities:[
  {name:'Doha',sights:['Museum of Islamic Art','National Museum of Qatar','Souq Waqif'],foods:['Machboos','Luqaimat'],transit:['Doha Metro and buses serve many areas; check current service and visitor rules.','Metro, bus and taxi options connect Hamad International Airport with the city.']}
 ]},
 {country:'South Africa',region:'Africa',cities:[
  {name:'Cape Town',sights:['Table Mountain','Robben Island','Kirstenbosch National Botanical Garden'],foods:['Bobotie','Koeksister'],transit:['Buses and licensed taxis serve some visitor areas; use current local safety advice.','Check airport transport options and arrange transfers for areas beyond the centre.']},
  {name:'Johannesburg',sights:['Apartheid Museum','Constitution Hill','Cradle of Humankind'],foods:['Bunny chow','Chakalaka'],transit:['Gautrain, buses and ride services cover different routes; check service areas.','Use official airport rail and licensed transfer information for your destination.']}
 ]},
 {country:'Sri Lanka',region:'South Asia',cities:[
  {name:'Colombo',sights:['Gangaramaya Temple','National Museum of Colombo','Galle Face Green'],foods:['Kottu roti','Hoppers'],transit:['Buses, commuter rail and taxis operate; check local service and route details.','Use current airport bus, rail or licensed taxi information.']},
  {name:'Kandy',sights:['Temple of the Sacred Tooth Relic','Kandy Lake','Royal Botanic Gardens, Peradeniya'],foods:['Kiribath','Kottu roti'],transit:['Local buses and taxis serve the city; allow time for hills and traffic.','Rail and road links connect Kandy with Colombo; confirm current schedules.']}
 ]},
 {country:'Sweden',region:'Europe',cities:[
  {name:'Stockholm',sights:['Vasa Museum','Gamla Stan','Skansen'],foods:['Cinnamon bun','Swedish meatballs'],transit:['Metro, buses, trams and ferries; check SL tickets and island connections.','Rail, bus and commuter services connect Arlanda Airport with the city.']}
 ]},
 {country:'Switzerland',region:'Europe',cities:[
  {name:'Zurich',sights:['Kunsthaus Zürich','Old Town','Lake Zurich'],foods:['Zürcher Geschnetzeltes','Rösti'],transit:['Trams, buses and trains are well connected; check ZVV tickets and zones.','Trains connect the airport with the city; verify schedules and ticket validity.']},
  {name:'Lucerne',sights:['Chapel Bridge','Swiss Museum of Transport','Lake Lucerne'],foods:['Älplermagronen','Luzerner Chügelipastete'],transit:['The centre is walkable; trains, boats and buses connect the region.','Rail links connect Lucerne with Zurich and other cities; check current timetables.']}
 ]},
 {country:'Taiwan',region:'East Asia',cities:[
  {name:'Taipei',sights:['National Palace Museum','Taipei 101','Longshan Temple'],foods:['Beef noodle soup','Xiaolongbao','Night-market snacks'],transit:['MRT, buses and regional rail cover many areas; check current EasyCard and route info.','Airport MRT, buses and taxis connect Taoyuan Airport with Taipei.']}
 ]}
];

// Approximate city-centre coordinates are used only for an on-device nearest-guide match.
const cityCoordinates = {
 'Sydney':[-33.8688,151.2093],'Melbourne':[-37.8136,144.9631],
 'Toronto':[43.6532,-79.3832],'Vancouver':[49.2827,-123.1207],
 'Beijing':[39.9042,116.4074],'Shanghai':[31.2304,121.4737],
 'Cairo':[30.0444,31.2357],'Luxor':[25.6872,32.6396],
 'Paris':[48.8566,2.3522],'Nice':[43.7102,7.2620],
 'Berlin':[52.5200,13.4050],'Munich':[48.1351,11.5820],
 'Athens':[37.9838,23.7275],'Santorini':[36.3932,25.4615],
 'Delhi':[28.6139,77.2090],'Agra':[27.1767,78.0081],
 'Bali (Denpasar)':[-8.6500,115.2167],'Jakarta':[-6.2088,106.8456],
 'Rome':[41.9028,12.4964],'Florence':[43.7696,11.2558],
 'Tokyo':[35.6762,139.6503],'Kyoto':[35.0116,135.7681],
 'Kuala Lumpur':[3.1390,101.6869],'George Town (Penang)':[5.4141,100.3288],
 'Mexico City':[19.4326,-99.1332],'Cancún':[21.1619,-86.8515],
 'Marrakech':[31.6295,-7.9811],'Fes':[34.0181,-5.0078],
 'Lisbon':[38.7223,-9.1393],'Porto':[41.1579,-8.6291],
 'Singapore':[1.3521,103.8198],
 'Seoul':[37.5665,126.9780],'Busan':[35.1796,129.0756],
 'Barcelona':[41.3874,2.1686],'Madrid':[40.4168,-3.7038],
 'Bangkok':[13.7563,100.5018],'Chiang Mai':[18.7883,98.9853],
 'Istanbul':[41.0082,28.9784],'Cappadocia (Göreme)':[38.6431,34.8289],
 'Dubai':[25.2048,55.2708],'Abu Dhabi':[24.4539,54.3773],
 'London':[51.5072,-0.1276],'Edinburgh':[55.9533,-3.1883],
 'New York City':[40.7128,-74.0060],'San Francisco':[37.7749,-122.4194],
 'Hanoi':[21.0278,105.8342],'Ho Chi Minh City':[10.8231,106.6297],
 'Buenos Aires':[-34.6037,-58.3816],'Mendoza':[-32.8895,-68.8458],
 'Vienna':[48.2082,16.3738],'Salzburg':[47.8095,13.0550],
 'Rio de Janeiro':[-22.9068,-43.1729],'São Paulo':[-23.5505,-46.6333],
 'Siem Reap':[13.3633,103.8564],'Phnom Penh':[11.5564,104.9282],
 'Prague':[50.0755,14.4378],'Dublin':[53.3498,-6.2603],'Galway':[53.2707,-9.0568],
 'Kathmandu':[27.7172,85.3240],'Pokhara':[28.2096,83.9856],
 'Amsterdam':[52.3676,4.9041],'Rotterdam':[51.9244,4.4777],
 'Auckland':[-36.8509,174.7645],'Queenstown':[-45.0312,168.6626],
 'Oslo':[59.9139,10.7522],'Bergen':[60.3913,5.3221],
 'Lima':[-12.0464,-77.0428],'Cusco':[-13.5319,-71.9675],
 'Manila':[14.5995,120.9842],'Cebu City':[10.3157,123.8854],
 'Doha':[25.2854,51.5310],'Cape Town':[-33.9249,18.4241],
 'Johannesburg':[-26.2041,28.0473],'Colombo':[6.9271,79.8612],
 'Kandy':[7.2906,80.6337],'Stockholm':[59.3293,18.0686],
 'Zurich':[47.3769,8.5417],'Lucerne':[47.0502,8.3093],'Taipei':[25.0330,121.5654]
};

const copy = {
 bn:{language:'ভাষা',eyebrow:'বিশ্বভ্রমণ শুরু হোক এখান থেকে',headline:'পৃথিবীটা ঘুরে দেখুন,<br><em>নিজের মতো করে।</em>',intro:'দেশ ও শহর বেছে নিয়ে জনপ্রিয় দর্শনীয় স্থান, স্থানীয় খাবার এবং শহরের ভেতরে যাতায়াতের প্রাথমিক ধারণা পান।',countryLabel:'কোন দেশে যেতে চান?',country:'দেশ বেছে নিন',city:'শহর বেছে নিন',button:'গাইড দেখুন',location:'আমার অবস্থান ব্যবহার করুন',locationPrivacy:'আপনি অবস্থান বা Directions চাপলেই location permission চাওয়া হবে। কাছের গাইড খুঁজতে অ্যাপটি অবস্থান ব্যবহার করে। Directions চাইলে coordinates Google Maps-এ পাঠানো হয়; এই অ্যাপ সেগুলো সংরক্ষণ করে না।',languageNote:'২৩টি ভাষার option আছে। Google Cloud Translation সেট করলে interface ও guide-এর বর্ণনা অনুবাদ হবে; জায়গা ও খাবারের নাম স্বাভাবিক বানানে থাকবে। গুরুত্বপূর্ণ নিয়ম official source থেকে যাচাই করুন।',accuracy:'এটি প্রাথমিক ভ্রমণ-পরিকল্পনার তথ্য। যাতায়াত, প্রবেশ-সময়, টিকিট, ভিসা ও নিরাপত্তার নিয়ম বদলাতে পারে—যাত্রার আগে সংশ্লিষ্ট সরকারি বা পরিবহন সংস্থার তথ্য যাচাই করুন।',locating:'আপনার অবস্থান খোঁজা হচ্ছে…',locationDenied:'অবস্থান পাওয়া যায়নি। Browser-এ location permission দিন, অথবা দেশ ও শহর বেছে নিন।',locationUnsupported:'এই browser-এ location সুবিধা নেই। দেশ ও শহর বেছে নিন।',locationFar:'কাছাকাছি কোনো গাইড নেই। সবচেয়ে কাছের catalogue city',locationFound:'কাছের গাইড পাওয়া গেছে:',guide:'গন্তব্য গাইড',places:'দেখার মতো জায়গা',food:'স্থানীয় খাবার',transit:'কীভাবে চলবেন',search:'দেশ, শহর, জায়গা বা খাবার খুঁজুন',footer:'ভ্রমণের পরিকল্পনা আপনার, তথ্য যাচাই করুন যাত্রার আগে',empty:'এই খোঁজে কোনো গন্তব্য মেলেনি।',coverage:'এখানে নির্বাচিত জনপ্রিয় দেশের প্রাথমিক city guide আছে। এটি সব দেশের পূর্ণাঙ্গ তালিকা বা live route planner নয়.'},
 en:{language:'Language',eyebrow:'START YOUR WORLD JOURNEY HERE',headline:'See more of the world,<br><em>your own way.</em>',intro:'Choose a country and city for a starter guide to popular sights, local foods and ways to get around.',countryLabel:'Where would you like to go?',country:'Choose a country',city:'Choose a city',button:'Explore guide',location:'Use my location',locationPrivacy:'Location is requested only when you tap Use my location or a directions button. This app uses it to find a nearby guide. Directions send coordinates to Google Maps; this app does not save them.',languageNote:'23 languages are available. Configure Google Cloud Translation to translate the interface and guide descriptions. Place and food names stay in their standard spelling. Verify important rules with official sources.',accuracy:'This is starter trip-planning information. Transit, opening hours, tickets, visa and safety rules can change. Check official local or transport sources before travelling.',locating:'Finding your location…',locationDenied:'Could not get your location. Allow browser location access, or choose a country and city.',locationUnsupported:'Location is not available in this browser. Choose a country and city.',locationFar:'There is no guide nearby. The closest city in this catalogue is',locationFound:'Nearby guide found:',guide:'DESTINATION GUIDE',places:'Places to explore',food:'Local foods',transit:'Getting around',search:'Search countries, cities, sights or foods',footer:'Plan your trip and verify details before you travel',empty:'No destinations match that search.',coverage:'A starter guide to selected popular countries. This is not a complete world directory or a live route planner.'}
};
const $=id=>document.getElementById(id);
const language=$('language'), country=$('country'), city=$('city'), search=$('search');
let selectedDestination=null;
let currentLocation=null;
let translationRun=0;
const translationCache=new Map();
const translatedSources=new WeakMap();
try{for(const [key,value] of Object.entries(JSON.parse(localStorage.getItem('borderless-translation-cache-v1')||'{}')))translationCache.set(key,value)}catch{}
function strings(){return copy[language.value]||copy.en}
function setText(id,value){$(id).textContent=value}
function mapLink(place, cityName){const q=encodeURIComponent(place+', '+cityName);return 'https://www.google.com/maps/search/?api=1&query='+q}
function directionsLink(place,cityName,origin){const params=new URLSearchParams({api:'1',destination:place+', '+cityName,travelmode:'transit'});if(origin)params.set('origin',origin.latitude+','+origin.longitude);return 'https://www.google.com/maps/dir/?'+params.toString()}
function fillOptions(select,items,placeholder,valueFn,labelFn){
 select.replaceChildren(new Option(placeholder,''));
 items.forEach(item=>select.add(new Option(labelFn(item),valueFn(item))));
}
function applyLanguage(){
 const s=strings();
 const selectedCountry=country.value;
 const selectedCity=city.value;
 const hadResults=!$('results').hidden;
 document.documentElement.lang=language.value;
 setText('language-label',s.language); setText('eyebrow-text',s.eyebrow); $('headline').innerHTML=s.headline;
 setText('intro',s.intro); setText('country-label',s.countryLabel); setText('country-field-label',s.country); setText('city-field-label',s.city);
 setText('button-text',s.button); setText('guide-kicker',s.guide); setText('places-title',s.places); setText('food-title',s.food); setText('transit-title',s.transit);
 setText('location-button-text',s.location); setText('location-privacy',s.locationPrivacy);
 setText('language-note',s.languageNote);setText('accuracy-note',s.accuracy);
 document.documentElement.dir=(language.value==='ar'||language.value==='ur')?'rtl':'ltr';
 setText('search-label',s.search); search.placeholder=language.value==='bn'?'যেমন: Paris, ramen, museum…':'e.g. Paris, ramen, museum…';
 setText('footer-copy',s.footer); setText('coverage-copy',s.coverage);
 fillOptions(country,destinations,s.country,d=>d.country,d=>d.country+' · '+d.region);
 country.value=selectedCountry;
 refreshCities(true);
 if(selectedCity&&[...city.options].some(option=>option.value===selectedCity))city.value=selectedCity;
 if(hadResults)renderDestination();
 else if(language.value!=='en')translateVisibleContent();
}
function refreshCities(preserveCity=false){
 const previousCity=preserveCity?city.value:'';
 const d=destinations.find(item=>item.country===country.value);
 if(!d){fillOptions(city,[],strings().city,item=>item.name,item=>item.name);city.disabled=true;$('show-button').disabled=true;selectedDestination=null;$('results').hidden=true;return}
 city.disabled=false;
 fillOptions(city,d.cities,strings().city,item=>item.name,item=>item.name);
 if(previousCity&&d.cities.some(item=>item.name===previousCity))city.value=previousCity;
 else if(d.cities.length) city.value=d.cities[0].name;
 $('show-button').disabled=!city.value;
 selectedDestination=null; $('results').hidden=true;
}
function translatableTextNodes(){
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 const nodes=[];
 let node;
 while((node=walker.nextNode())){
  const parent=node.parentElement;
  const text=node.nodeValue.trim();
  if(!text||!/[A-Za-z]/.test(text)||parent.closest('script,style,.brand,.recommendation-card h4,#destination-title'))continue;
  const option=parent.closest('option');
  if(option&&option.value!=='')continue;
  if(language.value==='bn'&&/[\u0980-\u09FF]/.test(text))continue;
  nodes.push({node,leading:node.nodeValue.match(/^\s*/)[0],trailing:node.nodeValue.match(/\s*$/)[0],text:translatedSources.get(node)||text});
 }
 return nodes;
}
async function translateVisibleContent(){
 const run=++translationRun,target=language.value;
 const note=$('language-note');
 if(target==='en')return;
 const nodes=translatableTextNodes();
 const placeholder=search.placeholder;
 const jobs=[...nodes,{placeholder:true,text:placeholder}];
 const batches=[];let batch=[],size=0;
 for(const job of jobs){if(batch.length>=70||size+job.text.length>4000){batches.push(batch);batch=[];size=0}batch.push(job);size+=job.text.length}
 if(batch.length)batches.push(batch);
 try{
  for(const group of batches){
   const translated=new Array(group.length);const missing=[];const indexes=[];
   group.forEach((job,index)=>{const key=target+'|'+job.text;if(translationCache.has(key))translated[index]=translationCache.get(key);else{missing.push(job.text);indexes.push(index)}});
   if(missing.length){const form=new URLSearchParams();form.set('target',target);missing.forEach(text=>form.append('text',text));
    const response=await fetch('/api/translate',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},body:form.toString()});
    const result=await response.json();if(!response.ok)throw new Error(result.error||'Translation unavailable.');
    if(!Array.isArray(result.translations)||result.translations.length!==missing.length)throw new Error('Translation response was incomplete.');
    indexes.forEach((originalIndex,i)=>{translated[originalIndex]=result.translations[i];translationCache.set(target+'|'+group[originalIndex].text,result.translations[i])});
    try{localStorage.setItem('borderless-translation-cache-v1',JSON.stringify(Object.fromEntries(translationCache)))}catch{}
   }
   if(run!==translationRun||target!==language.value)return;
   group.forEach((job,index)=>{if(job.placeholder)search.placeholder=translated[index];else{translatedSources.set(job.node,job.text);job.node.nodeValue=job.leading+translated[index]+job.trailing}});
  }
 }catch(error){
  if(run!==translationRun)return;
  note.textContent=error.message.includes('not configured')
   ?'Translation is not set up yet. Add your Google Cloud Translation API key as translation.api.key in local.properties.'
   :'Translation is currently unavailable; the English guide is still shown. Check the translation setup or internet connection.';
 }
}
function setStatus(message){$('status').textContent=message;if(language.value!=='en')translateVisibleContent()}
function translateCachedSelectPrompts(){
 for(const option of document.querySelectorAll('select option[value=""]')){
  const source=option.textContent.trim(),translated=translationCache.get(language.value+'|'+source);
  if(translated)option.textContent=translated;
 }
}
function loadPhoto(title,image,credit,fallback,caption){
 const slug=title.trim().replace(/\s+/g,'_');
 fetch('https://en.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(slug),{headers:{Accept:'application/json'}})
  .then(response=>{if(!response.ok)throw new Error('No photo');return response.json()})
  .then(data=>{const source=data.thumbnail&&data.thumbnail.source;if(!source)return;image.alt=caption+' — '+title;image.onload=()=>{image.hidden=false;fallback.hidden=true};image.src=source;const page=data.content_urls&&data.content_urls.desktop&&data.content_urls.desktop.page;if(page){credit.href=page;credit.hidden=false}})
  .catch(()=>{});
}
function openDirections(place,cityName){
 const s=strings();
 const tab=window.open('about:blank','_blank');
 if(!tab){setStatus(language.value==='bn'?'Directions খুলতে popup অনুমতি দিন।':'Allow pop-ups to open directions.');return}
 tab.opener=null;
 const go=origin=>{tab.location.href=directionsLink(place,cityName,origin)};
 if(currentLocation){go(currentLocation);return}
 if(!navigator.geolocation){tab.close();setStatus(s.locationUnsupported);return}
 setStatus(language.value==='bn'?'Directions-এর জন্য অবস্থানের অনুমতি দিন…':'Allow location access to build directions from where you are…');
 navigator.geolocation.getCurrentPosition(position=>{
  currentLocation={latitude:position.coords.latitude,longitude:position.coords.longitude};
  go(currentLocation);setStatus(language.value==='bn'?'Google Maps-এ আপনার অবস্থান থেকে পথ খুলছে…':'Opening directions from your location in Google Maps…');
 },()=>{tab.close();setStatus(s.locationDenied)},{enableHighAccuracy:false,timeout:12000,maximumAge:300000});
}
function renderList(id,items,type,cityName){
 const target=$(id);target.replaceChildren();
 items.forEach(value=>{
  const card=document.createElement('article');card.className='entry recommendation-card';
  const title=type==='place'?value:value;
  card.append(document.createElement('h4'));
  card.lastChild.textContent=title;
  const fallback=document.createElement('div');fallback.className='photo-fallback';fallback.textContent=language.value==='bn'?'যাচাইকৃত ছবি পাওয়া যায়নি':'No verified photo available';
  const image=document.createElement('img');image.className='recommendation-image';image.loading='lazy';image.hidden=true;image.alt='';
  const credit=document.createElement('a');credit.className='image-credit';credit.target='_blank';credit.rel='noopener';credit.textContent=language.value==='bn'?'ছবির উৎস ↗':'Photo source ↗';credit.hidden=true;
  card.append(fallback,image,credit);loadPhoto(title,image,credit,fallback,type==='place'?'Photo':'Food photo');
  if(type==='place'){
   const link=document.createElement('a');link.className='entry-link';link.href=mapLink(value,cityName);link.target='_blank';link.rel='noopener';link.textContent=language.value==='bn'?'মানচিত্রে দেখুন ↗':'Open map ↗';card.append(link);
   const directions=document.createElement('button');directions.type='button';directions.className='entry-link directions-link';directions.textContent=language.value==='bn'?'আপনার অবস্থান থেকে পথ ↗':'Directions from my location ↗';directions.addEventListener('click',()=>openDirections(value,cityName));card.append(directions);
  }else if(type==='food'){
   const link=document.createElement('a');link.className='entry-link';link.href=mapLink(value+' restaurants',cityName);link.target='_blank';link.rel='noopener';link.textContent=language.value==='bn'?'কোথায় পাবেন ↗':'Find places ↗';card.append(link);
  }
  target.append(card);
 });
 if(type==='food'){
  const shops=document.createElement('a');shops.className='entry-link shop-link';shops.href=mapLink('shops and local markets',cityName);shops.target='_blank';shops.rel='noopener';
  shops.textContent=language.value==='bn'?'দোকান ও বাজার খুঁজুন ↗':'Find shops & markets ↗';
  target.append(shops);
  const note=document.createElement('p');note.className='listing-note';note.textContent=language.value==='bn'?'দোকানের নাম ও ছবি Google Maps-এর তালিকায় দেখুন।':'Shop names and available photos appear in Google Maps listings.';target.append(note);
 }
}
function renderDestination(){
 const d=destinations.find(item=>item.country===country.value);
 if(!d||!city.value)return;
 const c=d.cities.find(item=>item.name===city.value);
 if(!c)return;
 selectedDestination={d,c};
 setText('destination-title',c.name+' · '+d.country);setText('destination-subtitle',d.region);
 renderList('places-list',c.sights,'place',c.name);renderList('food-list',c.foods,'food',c.name);
 const target=$('transit-list');target.replaceChildren();
 c.transit.forEach((text,index)=>{const item=document.createElement('div');item.className='entry';const h=document.createElement('h4');h.textContent=index===0?(language.value==='bn'?'শহরের ভেতরে':'Around the city'):(language.value==='bn'?'পৌঁছানো ও সংযোগ':'Arriving / connecting');item.append(h);const p=document.createElement('p');p.textContent=text;item.append(p);target.append(item)});
 $('results').hidden=false;
 if(language.value!=='en')translateVisibleContent();
}
function runSearch(){
 const term=search.value.trim().toLocaleLowerCase();
 if(!term){setStatus('');$('results').hidden=true;return}
 const hits=[];
 destinations.forEach(d=>d.cities.forEach(c=>{
  const values=[d.country,d.region,c.name,...c.sights,...c.foods];
  if(values.some(v=>v.toLocaleLowerCase().includes(term)))hits.push({d,c});
 }));
 if(hits.length){
  country.value=hits[0].d.country;refreshCities();city.value=hits[0].c.name;renderDestination();
 setStatus(hits.length>1?(language.value==='bn'?hits.length+'টি মিলেছে; প্রথমটি দেখানো হচ্ছে।':hits.length+' matching destinations; showing the first.'):'' );
 }else{$('results').hidden=true;setStatus(strings().empty)}
}
function distanceKm(a,b){
 const rad=value=>value*Math.PI/180,lat1=rad(a[0]),lat2=rad(b[0]),dLat=lat2-lat1,dLon=rad(b[1]-a[1]);
 const value=Math.sin(dLat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;
 return 6371*2*Math.atan2(Math.sqrt(value),Math.sqrt(1-value));
}
function useMyLocation(){
 const s=strings(),control=$('location-button');
 if(!navigator.geolocation){setStatus(s.locationUnsupported);return}
 control.disabled=true;setStatus(s.locating);
 navigator.geolocation.getCurrentPosition(position=>{
  currentLocation={latitude:position.coords.latitude,longitude:position.coords.longitude};
  const here=[position.coords.latitude,position.coords.longitude];let nearest=null;
  destinations.forEach(d=>d.cities.forEach(c=>{
   const point=cityCoordinates[c.name];if(!point)return;
   const distance=distanceKm(here,point);if(!nearest||distance<nearest.distance)nearest={d,c,distance};
  }));
  control.disabled=false;
  if(!nearest){setStatus(s.locationUnsupported);return}
  country.value=nearest.d.country;refreshCities();city.value=nearest.c.name;search.value='';
  if(nearest.distance>100){setStatus(s.locationFar+' '+nearest.c.name+' ('+Math.round(nearest.distance)+' km).');$('results').hidden=true;return}
  renderDestination();setStatus(s.locationFound+' '+nearest.c.name+' · '+Math.round(nearest.distance)+' km from its city centre (approx.).');
  $('results').scrollIntoView({behavior:'smooth',block:'start'});
 },()=>{control.disabled=false;setStatus(s.locationDenied)},{enableHighAccuracy:false,timeout:12000,maximumAge:300000});
}
language.addEventListener('change',applyLanguage);
country.addEventListener('change',()=>{refreshCities();translateCachedSelectPrompts();if(language.value!=='en')translateVisibleContent()});
$('location-button').addEventListener('click',useMyLocation);
$('show-button').disabled=true;
$('show-button').addEventListener('click',()=>{search.value='';setStatus('');renderDestination();$('results').scrollIntoView({behavior:'smooth',block:'start'})});
city.addEventListener('change',()=>{$('show-button').disabled=!city.value;if(!$('results').hidden)renderDestination()});
search.addEventListener('input',runSearch);
applyLanguage();
