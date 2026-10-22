const destinations = [
 {country:'Bangladesh',region:'South Asia',cities:[
  {name:'Dhaka',sights:['Lalbagh Fort','Ahsan Manzil','Bangladesh National Museum'],foods:['Kacchi biryani','Fuchka','Bakarkhani'],transit:['Traffic and routes vary; check current local or official transport information before travelling.','Compare available airport transfer options for your destination and confirm pickup details.']},
  {name:'Chattogram',sights:['Patenga Sea Beach','Foy’s Lake','Chattogram War Cemetery'],foods:['Mezban beef','Kala bhuna','Chattogram-style seafood'],transit:['Check current local transport routes, fares and operating times; journey times can vary.','Confirm transfer and pickup details before travelling from the airport or station.']},
  {name:'Cox’s Bazar',sights:['Cox’s Bazar Beach','Himchari National Park','Inani Beach'],foods:['Fresh seafood','Shutki dishes','Mezban-style beef'],transit:['Check current local transport and beach access information before setting out.','Follow local authority guidance around the sea and check weather conditions.']},
  {name:'Sylhet',sights:['Ratargul Swamp Forest','Jaflong','Bichanakandi'],foods:['Shatkora beef','Sylheti tea','Local pitha'],transit:['Check current local routes and transport availability, especially for trips outside the city.','Confirm current road and weather conditions before visiting riverside or rural areas.']},
  {name:'Rajshahi',sights:['Varendra Research Museum','Puthia Temple Complex','Padma Riverfront'],foods:['Seasonal Rajshahi mango','Kalai roti','Local sweets'],transit:['Check current local transport routes, fares and operating times before travelling.','Confirm road or rail schedules with the relevant operator.']}
 ]},
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
 {country:'Myanmar',region:'Southeast Asia',cities:[
  {name:'Yangon',sights:['Shwedagon Pagoda','Sule Pagoda','Bogyoke Aung San Market'],foods:['Mohinga','Laphet thoke','Shan noodles'],transit:['Transport services and local restrictions may change; check current official advice and operator updates.','Verify current road, airport and local access conditions before making plans.']},
  {name:'Mandalay',sights:['Mandalay Palace','Mahamuni Buddha Temple','U Bein Bridge'],foods:['Meeshay','Mont di','Myanmar curry'],transit:['Check current official travel advice and local access before planning journeys in the region.','Road, rail and other services may change; confirm with current operators.']},
  {name:'Bagan',sights:['Ananda Temple','Dhammayangyi Temple','Bagan Archaeological Zone'],foods:['Mohinga','Myanmar tea-leaf salad','Shan noodles'],transit:['Check current official travel advice and site access conditions before planning a visit.','Confirm current local transport and road access with reliable local or official sources.']},
  {name:'Nyaungshwe',sights:['Inle Lake','Phaung Daw Oo Pagoda','Indein Pagodas'],foods:['Shan noodles','Tofu thoke','Inle-style fish dishes'],transit:['Check current official travel advice and local access conditions before planning a visit.','Confirm current boat and road services locally before travelling.']}
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
 'Dhaka':[23.8103,90.4125],'Chattogram':[22.3569,91.7832],'Cox’s Bazar':[21.4272,92.0058],'Sylhet':[24.8949,91.8687],'Rajshahi':[24.3745,88.6042],
 'Yangon':[16.8409,96.1735],'Mandalay':[21.9588,96.0891],'Bagan':[21.1717,94.8585],'Nyaungshwe':[20.6609,96.9347],
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
 bn:{language:'ভাষা',eyebrow:'বিশ্বভ্রমণ শুরু হোক এখান থেকে',headline:'পৃথিবীটা ঘুরে দেখুন,<br><em>নিজের মতো করে।</em>',intro:'দেশ ও শহর বেছে নিয়ে জনপ্রিয় দর্শনীয় স্থান, স্থানীয় খাবার এবং শহরের ভেতরে যাতায়াতের প্রাথমিক ধারণা পান।',countryLabel:'কোন দেশে যেতে চান?',country:'দেশ বেছে নিন',city:'শহর বেছে নিন',button:'গাইড দেখুন',location:'আমার অবস্থান ব্যবহার করুন',locationPrivacy:'আপনি অবস্থান বা Directions চাপলেই location permission চাওয়া হবে। কাছের গাইড খুঁজতে অ্যাপটি অবস্থান ব্যবহার করে। Directions চাইলে coordinates Google Maps-এ পাঠানো হয়; এই অ্যাপ সেগুলো সংরক্ষণ করে না।',languageNote:'২৩টি ভাষা বেছে নেওয়া যায়। বিনামূল্যের অনুবাদ ইন্টারনেটের মাধ্যমে চলে; এতে দৈনিক সীমা বা সাময়িক সমস্যা হতে পারে। জায়গা ও খাবারের নাম সাধারণ বানানে থাকে। গুরুত্বপূর্ণ নিয়ম official source থেকে যাচাই করুন।',accuracy:'এটি প্রাথমিক ভ্রমণ-পরিকল্পনার তথ্য। যাতায়াত, প্রবেশ-সময়, টিকিট, ভিসা ও নিরাপত্তার নিয়ম বদলাতে পারে—যাত্রার আগে সংশ্লিষ্ট সরকারি বা পরিবহন সংস্থার তথ্য যাচাই করুন।',locating:'আপনার অবস্থান খোঁজা হচ্ছে…',locationDenied:'অবস্থান পাওয়া যায়নি। Browser-এ location permission দিন, অথবা দেশ ও শহর বেছে নিন।',locationUnsupported:'এই browser-এ location সুবিধা নেই। দেশ ও শহর বেছে নিন।',locationFar:'কাছাকাছি কোনো গাইড নেই। সবচেয়ে কাছের catalogue city',locationFound:'কাছের গাইড পাওয়া গেছে:',guide:'গন্তব্য গাইড',places:'দেখার মতো জায়গা',food:'স্থানীয় খাবার',transit:'কীভাবে চলবেন',search:'দেশ, শহর, জায়গা বা খাবার খুঁজুন',footer:'ভ্রমণের পরিকল্পনা আপনার, তথ্য যাচাই করুন যাত্রার আগে',empty:'এই খোঁজে কোনো গন্তব্য মেলেনি।',coverage:'এখানে নির্বাচিত জনপ্রিয় দেশের প্রাথমিক city guide আছে। এটি সব দেশের পূর্ণাঙ্গ তালিকা বা live route planner নয়.'},
 en:{language:'Language',eyebrow:'START YOUR WORLD JOURNEY HERE',headline:'See more of the world,<br><em>your own way.</em>',intro:'Choose a country and city for a starter guide to popular sights, local foods and ways to get around.',countryLabel:'Where would you like to go?',country:'Choose a country',city:'Choose a city',button:'Explore guide',location:'Use my location',locationPrivacy:'Location is requested only when you tap Use my location or a directions button. This app uses it to find a nearby guide. Directions send coordinates to Google Maps; this app does not save them.',languageNote:'Choose from 23 languages. Free machine translation needs internet and may be rate-limited or unavailable. Place and food names stay in their standard spelling. Verify important rules with official sources.',accuracy:'This is starter trip-planning information. Transit, opening hours, tickets, visa and safety rules can change. Check official local or transport sources before travelling.',locating:'Finding your location…',locationDenied:'Could not get your location. Allow browser location access, or choose a country and city.',locationUnsupported:'Location is not available in this browser. Choose a country and city.',locationFar:'There is no guide nearby. The closest city in this catalogue is',locationFound:'Nearby guide found:',guide:'DESTINATION GUIDE',places:'Places to explore',food:'Local foods',transit:'Getting around',search:'Search countries, cities, sights or foods',footer:'Plan your trip and verify details before you travel',empty:'No destinations match that search.',coverage:'A starter guide to selected popular countries. This is not a complete world directory or a live route planner.'}
};
const $=id=>document.getElementById(id);
const language=$('language'), country=$('country'), city=$('city'), search=$('search');
let selectedDestination=null;
let currentLocation=null;
const countryCodes=Object.fromEntries(Object.entries(window.GEONAMES_COUNTRIES||{}).map(([code,item])=>[item.name,code]));
Object.assign(countryCodes,{Bangladesh:'BD',Australia:'AU',Canada:'CA',China:'CN',Egypt:'EG',France:'FR',Germany:'DE',Greece:'GR',India:'IN',Indonesia:'ID',Italy:'IT',Japan:'JP',Malaysia:'MY',Mexico:'MX',Myanmar:'MM',Morocco:'MA',Portugal:'PT',Singapore:'SG','South Korea':'KR',Spain:'ES',Thailand:'TH','Türkiye':'TR','United Arab Emirates':'AE','United Kingdom':'GB','United States':'US',Vietnam:'VN',Argentina:'AR',Austria:'AT',Brazil:'BR',Cambodia:'KH',Czechia:'CZ',Ireland:'IE',Nepal:'NP',Netherlands:'NL','New Zealand':'NZ',Norway:'NO',Peru:'PE',Philippines:'PH',Qatar:'QA','South Africa':'ZA','Sri Lanka':'LK',Sweden:'SE',Switzerland:'CH',Taiwan:'TW'});
const continentNames={AF:'Africa',AN:'Antarctica',AS:'Asia',EU:'Europe',NA:'North America',OC:'Oceania',SA:'South America'};
for(const [code,item] of Object.entries(window.GEONAMES_COUNTRIES||{})){
 if(!destinations.some(destination=>countryCodes[destination.country]===code)){
  destinations.push({country:item.name,region:continentNames[item.continent]||'World',cities:[]});
 }
}
const cityCatalogCache=new Map();
const wikiDiscoveryCache=new Map();
const cityLoadPromises=new Map();
let translationRun=0;
const translationCache=new Map();
const translatedSources=new WeakMap();
try{for(const [key,value] of Object.entries(JSON.parse(localStorage.getItem('borderless-translation-cache-v2')||'{}')))translationCache.set(key,value)}catch{}
function strings(){return copy[language.value]||copy.en}
function setText(id,value){$(id).textContent=value}
function loadCountryCities(code){
 window.GEONAMES_CITIES??=Object.create(null);
 if(window.GEONAMES_CITIES[code])return Promise.resolve(window.GEONAMES_CITIES[code]);
 if(cityLoadPromises.has(code))return cityLoadPromises.get(code);
 const pending=new Promise((resolve,reject)=>{
  const script=document.createElement('script');script.src='cities/'+encodeURIComponent(code)+'.js?v=world-cities-2';script.async=true;
  script.onload=()=>window.GEONAMES_CITIES[code]?resolve(window.GEONAMES_CITIES[code]):reject(new Error('City directory file was empty.'));
  script.onerror=()=>reject(new Error('City directory could not be loaded.'));
  document.head.append(script);
 });
 cityLoadPromises.set(code,pending);
 pending.catch(()=>cityLoadPromises.delete(code));
 return pending;
}
function mapLink(place, cityName){const q=encodeURIComponent(place+', '+cityName);return 'https://www.google.com/maps/search/?api=1&query='+q}
function directionsLink(place,cityName,origin){const params=new URLSearchParams({api:'1',destination:place+', '+cityName,travelmode:'transit'});if(origin)params.set('origin',origin.latitude+','+origin.longitude);return 'https://www.google.com/maps/dir/?'+params.toString()}
function citiesForCountry(destination){
 if(cityCatalogCache.has(destination.country))return cityCatalogCache.get(destination.country);
 const code=countryCodes[destination.country],rows=(window.GEONAMES_CITIES&&window.GEONAMES_CITIES[code])||[];
 const featured=destination.cities.map(item=>({...item,featured:true}));
 const seen=new Set(featured.map(item=>item.name.toLocaleLowerCase()));
 const directory=rows.filter(row=>!seen.has(row[0].toLocaleLowerCase())).map(row=>({name:row[0],asciiName:row[1],adminCode:row[2],population:row[3],featured:false}));
 const catalog=[...featured,...directory];cityCatalogCache.set(destination.country,catalog);return catalog;
}
function findCity(destination,name){return citiesForCountry(destination).find(item=>item.name.toLocaleLowerCase()===name.trim().toLocaleLowerCase())}
function closeCityPicker(){$('city-picker').hidden=true}
let matchingCountries=[];
function renderCountryOptions(query='',open=true){
 const picker=$('country-picker'),list=$('country-options-list');
 const term=query.trim().toLocaleLowerCase();
 matchingCountries=destinations.filter(item=>!term||item.country.toLocaleLowerCase().includes(term)||item.region.toLocaleLowerCase().includes(term)).sort((a,b)=>a.country.localeCompare(b.country,undefined,{sensitivity:'base'}));
 list.replaceChildren(...matchingCountries.map(item=>{
  const option=document.createElement('button');option.type='button';option.className='country-option';option.setAttribute('role','option');
  option.setAttribute('aria-selected',String(item.country===country.value));option.textContent=item.country+' · '+item.region;
  option.addEventListener('click',()=>selectCountry(item));return option;
 }));
 picker.hidden=!open||matchingCountries.length===0;
 country.setAttribute('aria-expanded',String(!picker.hidden));
}
function selectCountry(destination){
 country.value=destination.country;renderCountryOptions('',false);refreshCities();
 if(language.value!=='en')translateVisibleContent();
}
function applyLanguage(){
 restoreTranslatedTextNodes();
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
 city.placeholder=language.value==='bn'?'শহর খুঁজুন…':'Search cities…';
 setText('footer-copy',s.footer); setText('coverage-copy',s.coverage);
 renderCountryOptions(country.value,country===document.activeElement);
 country.value=selectedCountry;
 refreshCities(true);
 const selectedCountryData=destinations.find(item=>item.country===country.value);
 if(selectedCity&&selectedCountryData&&findCity(selectedCountryData,selectedCity))city.value=selectedCity;
 if(hadResults)renderDestination();
 else if(language.value!=='en')translateVisibleContent();
}
function refreshCities(preserveCity=false){
 const previousCity=preserveCity?city.value:'';
 const d=destinations.find(item=>item.country.toLocaleLowerCase()===country.value.trim().toLocaleLowerCase());
 const picker=$('city-picker');
 if(!d){city.value='';city.disabled=true;$('city-options-list').replaceChildren();picker.hidden=true;$('city-count').textContent='';$('show-button').disabled=true;selectedDestination=null;$('results').hidden=true;return}
 const code=countryCodes[d.country];
 if(code&&!window.GEONAMES_CITIES?.[code]){
  city.value='';city.disabled=true;picker.hidden=false;$('city-options-list').replaceChildren();$('show-button').disabled=true;
  $('city-count').textContent=language.value==='bn'?'শহরের তালিকা লোড হচ্ছে…':'Loading this country’s city list…';
  loadCountryCities(code).then(()=>{if(country.value===d.country)refreshCities(preserveCity)}).catch(()=>{
   if(country.value!==d.country)return;
   window.GEONAMES_CITIES[code]=[];
   refreshCities(preserveCity);
   setStatus(language.value==='bn'?'শহরের তালিকা লোড হয়নি। আবার চেষ্টা করুন।':'Could not load this city list. Please try again.');
  });
  return;
 }
 country.value=d.country;
 city.disabled=false;
 if(previousCity&&findCity(d,previousCity))city.value=findCity(d,previousCity).name;
 else city.value='';
 renderCityOptions('');
 updateCitySelection();
 selectedDestination=null;$('results').hidden=true;
}
function renderCityOptions(filter=''){
 const d=destinations.find(item=>item.country===country.value);
 const picker=$('city-picker');
 const list=$('city-options-list'),count=$('city-count');
 if(!d){picker.hidden=true;list.replaceChildren();count.textContent='';return}
 picker.hidden=false;
 const term=filter.trim().toLocaleLowerCase();
 const matches=citiesForCountry(d).filter(item=>!term||item.name.toLocaleLowerCase().includes(term)||item.asciiName?.toLocaleLowerCase().includes(term));
 let shown=0;list.replaceChildren();
 count.textContent=term?`${matches.length.toLocaleString()} matching places · scroll for more`:`${matches.length.toLocaleString()} cities and towns · featured guide cities first · scroll for more`;
 function appendNextPage(){
  const fragment=document.createDocumentFragment();
  matches.slice(shown,shown+100).forEach(item=>{
   const option=document.createElement('button');option.type='button';option.className='city-option';option.setAttribute('role','option');
   option.setAttribute('aria-selected',String(item.name===city.value));
   option.textContent=item.featured?item.name+' · Guide':item.name;
   option.addEventListener('click',()=>{city.value=item.name;updateCitySelection();closeCityPicker();renderDestination();$('results').scrollIntoView({behavior:'smooth',block:'start'})});
   fragment.append(option);
  });
  shown=Math.min(shown+100,matches.length);list.append(fragment);
  if(matches.length===0){const empty=document.createElement('span');empty.className='city-empty';empty.textContent='No matching cities';list.append(empty)}
 }
 list.onscroll=()=>{if(shown<matches.length&&list.scrollTop+list.clientHeight>=list.scrollHeight-50)appendNextPage()};
 appendNextPage();
}
function updateCitySelection(){
 const d=destinations.find(item=>item.country===country.value);
 const match=d&&findCity(d,city.value);
 if(match)city.value=match.name;
 $('show-button').disabled=!match;
 return Boolean(match);
}
function updateCountrySelection(){
 const match=destinations.find(item=>item.country.toLocaleLowerCase()===country.value.trim().toLocaleLowerCase());
 if(match)country.value=match.country;
 refreshCities();
 return Boolean(match);
}
function translatableTextNodes(){
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 const nodes=[];
 let node;
 while((node=walker.nextNode())){
  const parent=node.parentElement;
  const text=node.nodeValue.trim();
  if(!text||!/[A-Za-z]/.test(text)||parent.closest('script,style,.brand,.recommendation-card h4,#destination-title,.city-option,.no-translate'))continue;
  const option=parent.closest('option');
  if(option&&option.value!=='')continue;
  if(language.value==='bn'&&/[\u0980-\u09FF]/.test(text))continue;
  const source=translatedSources.get(node);
  nodes.push({node,leading:source?.leading??node.nodeValue.match(/^\s*/)[0],trailing:source?.trailing??node.nodeValue.match(/\s*$/)[0],text:source?.text||text});
 }
 return nodes;
}
function restoreTranslatedTextNodes(){
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 let node;
 while((node=walker.nextNode())){
  const source=translatedSources.get(node);
  if(source!==undefined)node.nodeValue=source.leading+source.text+source.trailing;
 }
}
async function translateVisibleContent(){
 const run=++translationRun,target=language.value;
 const note=$('language-note');
 if(target==='en')return;
 const nodes=translatableTextNodes();
 const jobs=[...nodes,{placeholder:'search',text:search.placeholder},{placeholder:'city',text:city.placeholder}];
 const batches=[];let batch=[],size=0;
 for(const job of jobs){if(batch.length>=70||size+job.text.length>4000){batches.push(batch);batch=[];size=0}batch.push(job);size+=job.text.length}
 if(batch.length)batches.push(batch);
 try{
  for(const group of batches){
   const translated=new Array(group.length);const missing=[];const indexes=[];
   group.forEach((job,index)=>{const key=target+'|'+job.text;if(translationCache.has(key))translated[index]=translationCache.get(key);else{missing.push(job.text);indexes.push(index)}});
   if(missing.length){const result=await requestFreeTranslations(target,missing);
    if(!Array.isArray(result.translations)||result.translations.length!==missing.length)throw new Error('Translation response was incomplete.');
    indexes.forEach((originalIndex,i)=>{translated[originalIndex]=decodeTranslation(result.translations[i]);translationCache.set(target+'|'+group[originalIndex].text,translated[originalIndex])});
    try{localStorage.setItem('borderless-translation-cache-v2',JSON.stringify(Object.fromEntries(translationCache)))}catch{}
   }
   if(run!==translationRun||target!==language.value)return;
   group.forEach((job,index)=>{if(job.placeholder==='search')search.placeholder=translated[index];else if(job.placeholder==='city')city.placeholder=translated[index];else{translatedSources.set(job.node,{text:job.text,leading:job.leading,trailing:job.trailing});job.node.nodeValue=job.leading+translated[index]+job.trailing}});
  }
 }catch(error){
  if(run!==translationRun)return;
  restoreTranslatedTextNodes();
  note.textContent='Free translation is temporarily unavailable or rate-limited; English text remains visible. Check your internet connection and try again later.';
 }
}
function decodeTranslation(value){
 const decoder=document.createElement('textarea');
 decoder.innerHTML=String(value??'');
 return decoder.value;
}
async function requestFreeTranslations(target,texts){
 if(location.protocol!=='file:'){
  try{
   const form=new URLSearchParams();form.set('target',target);texts.forEach(text=>form.append('text',text));
   const response=await fetch('/api/translate',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},body:form.toString()});
   if(response.ok){const result=await response.json();if(Array.isArray(result.translations)&&result.translations.length===texts.length)return result}
  }catch{}
 }
 return {translations:await translateDirectTexts(target,texts)};
}
async function translateDirectTexts(target,texts){
 const results=new Array(texts.length),code=target==='zh'?'zh-CN':target;
 async function translateOne(text){
  const chunks=splitFreeTranslationText(text,450),translated=[];
  for(const chunk of chunks){
   const url='https://api.mymemory.translated.net/get?q='+encodeURIComponent(chunk)+'&langpair='+encodeURIComponent('en|'+code)+'&mt=1';
   const response=await fetch(url,{headers:{Accept:'application/json'}});
   if(!response.ok)throw new Error('Free translation unavailable.');
   const data=await response.json(),value=data.responseData&&data.responseData.translatedText;
   if(typeof value!=='string'||!value)throw new Error('Free translation unavailable.');
   translated.push(decodeTranslation(value));
  }
  return translated.join(' ');
 }
 for(let start=0;start<texts.length;start+=4){
  const translated=await Promise.all(texts.slice(start,start+4).map(translateOne));
  translated.forEach((value,index)=>{results[start+index]=value});
 }
 return results;
}
function splitFreeTranslationText(text,maxBytes){
 const words=text.trim().split(/\s+/),chunks=[];let current='';
 for(const word of words){const candidate=current?current+' '+word:word;
  if(current&&new TextEncoder().encode(candidate).length>maxBytes){chunks.push(current);current=word}else current=candidate;
 }
 if(current)chunks.push(current);return chunks;
}
function setStatus(message){$('status').textContent=message;if(language.value!=='en')translateVisibleContent()}
function translateCachedSelectPrompts(){
 for(const option of document.querySelectorAll('select option[value=""]')){
  const source=option.textContent.trim(),translated=translationCache.get(language.value+'|'+source);
  if(translated)option.textContent=translated;
 }
}
function loadPhoto(title,image,credit,fallback,caption){
 fallback.hidden=true;
 image.addEventListener('error',()=>{image.hidden=true;credit.hidden=true;fallback.hidden=true},{once:true});
 const params=new URLSearchParams({action:'query',titles:title,redirects:'1',prop:'pageimages|info',piprop:'thumbnail',pithumbsize:'640',inprop:'url',format:'json',origin:'*'});
 fetch('https://en.wikipedia.org/w/api.php?'+params.toString(),{headers:{Accept:'application/json'}})
  .then(response=>{if(!response.ok)throw new Error('No photo');return response.json()})
  .then(data=>{
   const pages=Object.values(data.query?.pages||{});
   const match=pages.find(page=>page.thumbnail);
   if(!match)return;
   image.alt=caption+' — '+title;
   image.hidden=false;image.style.visibility='hidden';
   image.onload=()=>{image.style.visibility='visible';credit.hidden=false};
   image.src=match.thumbnail.source;
   const page=match.fullurl||('https://en.wikipedia.org/?curid='+match.pageid);
   credit.href=page;
  })
  .catch(()=>{image.hidden=true;fallback.hidden=true});
}
async function searchWikiPages(cityCountry,topic,dish=''){
 const cacheKey=(cityCountry+'|'+topic+'|'+dish).toLocaleLowerCase();
 if(wikiDiscoveryCache.has(cacheKey))return wikiDiscoveryCache.get(cacheKey);
 const request=(async()=>{
  const query=topic==='food'?'famous restaurants local dishes and food markets in '+cityCountry:topic==='dish'?'restaurants serving '+dish+' in '+cityCountry:'tourist attractions in '+cityCountry;
  const params=new URLSearchParams({action:'query',generator:'search',gsrsearch:query,gsrnamespace:'0',gsrlimit:topic==='food'?'12':topic==='dish'?'8':'20',prop:'pageimages|info|extracts|categories',cllimit:'10',piprop:'thumbnail',pithumbsize:'640',inprop:'url',exintro:'1',exsentences:'2',explaintext:'1',format:'json',origin:'*'});
  const response=await fetch('https://en.wikipedia.org/w/api.php?'+params.toString(),{headers:{Accept:'application/json'}});
  if(!response.ok)throw new Error('Attraction information is temporarily unavailable.');
  const data=await response.json();
  const pages=Object.values(data.query?.pages||{}).sort((a,b)=>(a.index??999)-(b.index??999));
  return pages.filter(page=>page.title&&page.title.toLocaleLowerCase()!==cityCountry.toLocaleLowerCase()).map(page=>({title:page.title,description:page.extract||'',image:page.thumbnail?.source||'',source:page.fullurl||('https://en.wikipedia.org/?curid='+page.pageid),categories:(page.categories||[]).map(item=>item.title||'')}));
 })();
 wikiDiscoveryCache.set(cacheKey,request);
 try{return await request}catch(error){wikiDiscoveryCache.delete(cacheKey);throw error}
}
function renderDiscoveryCards(target,pages,cityCountry,append,topic='places'){
 if(!append)target.replaceChildren();
 target.querySelectorAll('.attraction-loading,.attraction-note').forEach(node=>node.remove());
 const existing=new Set([...target.querySelectorAll('.recommendation-card h4')].map(node=>node.textContent.toLocaleLowerCase()));
 const fresh=pages.filter(page=>!existing.has(page.title.toLocaleLowerCase()));
 fresh.forEach(page=>{
  const card=document.createElement('article');card.className='entry recommendation-card';
  const title=document.createElement('h4');title.textContent=page.title;card.append(title);
  if(page.description){const description=document.createElement('p');description.textContent=page.description;card.append(description)}
  if(page.image){const image=document.createElement('img');image.className='recommendation-image';image.loading='lazy';image.alt=page.title+' — photo from Wikipedia';image.src=page.image;image.addEventListener('error',()=>image.remove(),{once:true});card.append(image)}
  const source=document.createElement('a');source.className='image-credit';source.href=page.source;source.target='_blank';source.rel='noopener';source.textContent=language.value==='bn'?'তথ্যের উৎস: Wikipedia ↗':'Article source: Wikipedia ↗';card.append(source);
  const map=document.createElement('a');map.className='entry-link';map.href=mapLink(page.title,cityCountry);map.target='_blank';map.rel='noopener';map.textContent=topic==='food'?(language.value==='bn'?'Maps-এ rating ও menu দেখুন ↗':'Check ratings & menu on Maps ↗'):(language.value==='bn'?'মানচিত্রে দেখুন ↗':'Open in Maps ↗');card.append(map);
  if(topic!=='food'){const directions=document.createElement('button');directions.type='button';directions.className='entry-link directions-link';directions.textContent=language.value==='bn'?'আমার অবস্থান থেকে পথ ↗':'Directions from my location ↗';directions.addEventListener('click',()=>openDirections(page.title,cityCountry));card.append(directions)}
  target.append(card);
 });
 if(language.value!=='en')translateVisibleContent();
}
function addAllPlacesMapLink(target,cityCountry){
 target.querySelector('.all-places-map-link')?.remove();
 const link=document.createElement('a');link.className='entry-link all-places-map-link';
 link.href=mapLink('tourist attractions museums parks historic sites viewpoints',cityCountry);
 link.target='_blank';link.rel='noopener';
 link.textContent=language.value==='bn'?'এই এলাকার আরও ঘোরার জায়গা Maps-এ খুঁজুন ↗':'Search more places to visit in Maps ↗';
 target.prepend(link);
 if(language.value!=='en')translateVisibleContent();
}
function loadCityAttractions(cityCountry,featured){
 const target=$('places-list'),selection=cityCountry.toLocaleLowerCase();
 const isStillSelected=()=>selectedDestination&&(`${selectedDestination.c.name}, ${selectedDestination.d.country}`).toLocaleLowerCase()===selection;
 const loading=document.createElement('p');loading.className='listing-note attraction-loading';loading.textContent=language.value==='bn'?'এই শহরের আরও জায়গা ও ছবি খোঁজা হচ্ছে…':'Finding more places and photos for this city…';target.prepend(loading);
 searchWikiPages(cityCountry,'places').then(pages=>{
  pages=pages.filter(page=>!/^tourism in /i.test(page.title)&&!/^list of /i.test(page.title));
  if(!pages.length)throw new Error('No matching attraction photos were found.');
  if(!isStillSelected())return;
  renderDiscoveryCards(target,pages,cityCountry,featured,'places');
  addAllPlacesMapLink(target,cityCountry);
 }).catch(()=>{
  if(!isStillSelected())return;
  target.querySelectorAll('.attraction-loading').forEach(node=>node.remove());
  const note=document.createElement('p');note.className='listing-note attraction-note';note.textContent=language.value==='bn'?'আরও জায়গার তথ্য পাওয়া যায়নি। পরে আবার চেষ্টা করুন বা Maps-এ খুঁজুন।':'More place information could not be loaded. Try again later or search Maps.';target.append(note);
  addAllPlacesMapLink(target,cityCountry);
 });
}
function loadCityFoodSpots(cityCountry){
 const target=$('food-list'),selection=cityCountry.toLocaleLowerCase();
 const isStillSelected=()=>selectedDestination&&(`${selectedDestination.c.name}, ${selectedDestination.d.country}`).toLocaleLowerCase()===selection;
 const loading=document.createElement('p');loading.className='listing-note attraction-loading';loading.textContent=language.value==='bn'?'স্থানীয় খাবার ও পরিচিত food spot খোঁজা হচ্ছে…':'Finding local dishes and well-known food spots…';target.append(loading);
 searchWikiPages(cityCountry,'food').then(pages=>{
  pages=pages.filter(page=>page.image&&!/^tourism in /i.test(page.title)&&!/^list of /i.test(page.title));
  if(!pages.length)throw new Error('No matching food photos were found.');
  if(!isStillSelected())return;
  const heading=document.createElement('h4');heading.className='food-discovery-heading';heading.textContent=language.value==='bn'?'পরিচিত খাবার ও food spot':'Food articles & well-known spots';
  target.querySelectorAll('.attraction-loading,.attraction-note').forEach(node=>node.remove());target.append(heading);
  renderDiscoveryCards(target,pages,cityCountry,true,'food');
 }).catch(()=>{
  if(!isStillSelected())return;
  target.querySelectorAll('.attraction-loading').forEach(node=>node.remove());
  const note=document.createElement('p');note.className='listing-note attraction-note';note.textContent=language.value==='bn'?'আরও খাবার/দোকানের নাম load hoyni. নিচের Maps link-e current restaurant, rating ও menu খুঁজুন।':'More food and restaurant names could not be loaded. Use the Maps link below for current places, ratings and menus.';target.append(note);
 });
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
function loadFoodShopNames(food,cityName,card){
 const area=document.createElement('div');area.className='food-shop-results';
 const heading=document.createElement('h6');heading.textContent=language.value==='bn'?'এই খাবারের দোকানের নামের ধারণা':'Shop name ideas for this food';area.append(heading);
 const status=document.createElement('p');status.className='listing-note';status.textContent=language.value==='bn'?'দোকানের নাম খোঁজা হচ্ছে…':'Searching for shop names…';area.append(status);card.append(area);
 const cityCountry=cityName.includes(', ')?cityName:cityName+', '+(selectedDestination?.d.country||'');
 searchWikiPages(cityCountry,'dish',food).then(pages=>{
  if(!card.isConnected)return;
  area.replaceChildren(heading);
  const sourceNote=document.createElement('p');sourceNote.className='listing-note';sourceNote.textContent=language.value==='bn'?'এগুলো article search-এর নাম—দোকানটি চালু আছে কি না ও rating Maps-এ যাচাই করুন।':'These names come from article search; verify the business is open and check its current rating on Maps.';area.append(sourceNote);
  const unique=pages.filter(page=>page.categories.some(category=>/restaurant|café|cafe|food market|food establishment|fast food/i.test(category))&&!page.title.toLocaleLowerCase().includes('list of')).slice(0,3);
  if(!unique.length){const note=document.createElement('p');note.className='listing-note';note.textContent=language.value==='bn'?'নির্ভরযোগ্য দোকানের নাম পাওয়া যায়নি। Maps-এ বর্তমান দোকান ও rating দেখুন।':'No shop names found in the article search. Search Maps for current shops and ratings.';area.append(note);return}
  unique.forEach(page=>{
   const row=document.createElement('div');row.className='food-shop-entry';
   const name=document.createElement('strong');name.textContent=page.title;row.append(name);
   if(page.description){const detail=document.createElement('p');detail.textContent=page.description;row.append(detail)}
   const source=document.createElement('a');source.className='image-credit';source.href=page.source;source.target='_blank';source.rel='noopener';source.textContent=language.value==='bn'?'নাম/তথ্যের উৎস ↗':'Name/source ↗';row.append(source);
   const maps=document.createElement('a');maps.className='entry-link';maps.href=mapLink(page.title,cityCountry);maps.target='_blank';maps.rel='noopener';maps.textContent=language.value==='bn'?'Maps-এ বর্তমান rating ও menu দেখুন ↗':'Check current rating & menu on Maps ↗';row.append(maps);area.append(row);
  });
  if(language.value!=='en')translateVisibleContent();
 }).catch(()=>{
  if(!card.isConnected)return;
  area.replaceChildren(heading);
  const note=document.createElement('p');note.className='listing-note';note.textContent=language.value==='bn'?'দোকানের নাম load হয়নি। Maps-এ বর্তমান দোকান ও rating দেখুন।':'Shop names could not be loaded. Search Maps for current shops and ratings.';area.append(note);
 });
}
function renderList(id,items,type,cityName){
 const target=$(id);target.replaceChildren();
 items.forEach(value=>{
  const card=document.createElement('article');card.className='entry recommendation-card';
  const title=type==='place'?value:value;
  card.append(document.createElement('h4'));
  card.lastChild.textContent=title;
  const fallback=document.createElement('div');fallback.className='photo-fallback';fallback.textContent=language.value==='bn'?'যাচাইকৃত ছবি পাওয়া যায়নি':'No verified photo available';
  const image=document.createElement('img');image.className='recommendation-image';image.loading='eager';image.hidden=true;image.alt='';
  const credit=document.createElement('a');credit.className='image-credit';credit.target='_blank';credit.rel='noopener';credit.textContent=language.value==='bn'?'ছবির উৎস ↗':'Photo source ↗';credit.hidden=true;
  card.append(fallback,image,credit);loadPhoto(title,image,credit,fallback,type==='place'?'Photo':'Food photo');
  if(type==='place'){
   const link=document.createElement('a');link.className='entry-link';link.href=mapLink(value,cityName);link.target='_blank';link.rel='noopener';link.textContent=language.value==='bn'?'মানচিত্রে দেখুন ↗':'Open map ↗';card.append(link);
   const directions=document.createElement('button');directions.type='button';directions.className='entry-link directions-link';directions.textContent=language.value==='bn'?'আপনার অবস্থান থেকে পথ ↗':'Directions from my location ↗';directions.addEventListener('click',()=>openDirections(value,cityName));card.append(directions);
  }else if(type==='food'){
   const shopHeading=document.createElement('h5');shopHeading.className='food-shop-heading';shopHeading.textContent=language.value==='bn'?'এই খাবারের দোকান ও রেস্তোরাঁ':'Places serving this food';card.append(shopHeading);
   const link=document.createElement('a');link.className='entry-link';link.href=mapLink('best '+value+' restaurants shops menu',cityName);link.target='_blank';link.rel='noopener';link.textContent=language.value==='bn'?'দোকান, rating ও menu দেখুন ↗':'Find shops, ratings & menus ↗';card.append(link);
   const note=document.createElement('p');note.className='listing-note';note.textContent=language.value==='bn'?'Google Maps-এ এই খাবারটির দোকান খুঁজুন; listing-এ থাকলে নাম, star rating ও menu দেখাবে।':'Google Maps searches for this dish; available listings may show shop names, star ratings and menus.';card.append(note);
  }
  target.append(card);
  if(type==='food')loadFoodShopNames(value,cityName,card);
 });
 if(type==='food'){
  const shops=document.createElement('a');shops.className='entry-link shop-link';shops.href=mapLink('shops and local markets',cityName);shops.target='_blank';shops.rel='noopener';
  shops.textContent=language.value==='bn'?'দোকান ও বাজার খুঁজুন ↗':'Find shops & markets ↗';
  target.append(shops);
  const dining=document.createElement('a');dining.className='entry-link shop-link';dining.href=mapLink('top rated restaurants with menus',cityName);dining.target='_blank';dining.rel='noopener';
  dining.textContent=language.value==='bn'?'Restaurant rating ও menu দেখুন ↗':'Find restaurants, ratings & menus ↗';target.append(dining);
  const note=document.createElement('p');note.className='listing-note';note.textContent=language.value==='bn'?'Maps-এ restaurant-er নাম, rating ও menu listing-এ থাকলে দেখাবে। এই app rating যাচাই বা নিজে থেকে নির্ধারণ করে না।':'Google Maps may show restaurant names, ratings and menus when listed. This app does not verify or invent ratings.';target.append(note);
 }
}
function renderDirectoryLinks(id,queries,cityCountry){
 const target=$(id);target.replaceChildren();
 queries.forEach(item=>{
  const entry=document.createElement('div');entry.className='entry directory-entry';
  const heading=document.createElement('h4');heading.textContent=item.title;entry.append(heading);
  const note=document.createElement('p');note.textContent=language.value==='bn'?'এই শহরের live map result খুলুন। এগুলো curated recommendation নয়—যাওয়ার আগে জায়গা ও তথ্য যাচাই করুন.':'Open current map results for this city. These are live discovery links, not a curated recommendation; verify places and details before going.';entry.append(note);
  const link=document.createElement('a');link.className='entry-link';link.href=mapLink(item.query,cityCountry);link.target='_blank';link.rel='noopener';link.textContent=language.value==='bn'?'Google Maps-এ খুঁজুন ↗':'Explore on Google Maps ↗';entry.append(link);
  target.append(entry);
 });
}
let databaseCitiesRequest;
const databaseGuideCache=new Map();
function renderDatabaseEntries(target,entries,kind){
 target.replaceChildren();
 if(!entries.length){
  const empty=document.createElement('p');empty.className='empty';
  empty.textContent=kind==='rules'?'No rules are available in this language.':'No transit guides are available in this language.';
  target.append(empty);return;
 }
 entries.forEach(entry=>{
  const row=document.createElement('div');row.className='entry';
  const heading=document.createElement('h4');
  heading.textContent=kind==='rules'?entry.title:entry.transportType;
  row.append(heading);
  if(kind==='rules'&&entry.category){const category=document.createElement('span');category.className='entry-tag';category.textContent=entry.category;row.append(category)}
  const description=document.createElement('p');description.textContent=kind==='rules'?entry.description:entry.instructions;
  row.append(description);target.append(row);
 });
}
async function renderDatabaseGuide(cityName){
 const card=$('database-guide-card');
 card.hidden=true;
 if(!['localhost','127.0.0.1','::1'].includes(location.hostname))return;
 const requestedLanguage=language.value;
 try{
  databaseCitiesRequest??=fetch('/api/cities',{headers:{Accept:'application/json'},cache:'no-store'}).then(response=>{
   if(!response.ok)throw new Error('City list request failed');
   return response.json();
  });
  const cities=await databaseCitiesRequest;
  const databaseCity=cities.find(item=>item.cityName?.trim().toLocaleLowerCase()===cityName.trim().toLocaleLowerCase());
  if(!databaseCity||selectedDestination?.c.name!==cityName||language.value!==requestedLanguage)return;
  const cacheKey=databaseCity.cityId+'|'+requestedLanguage;
  let overview=databaseGuideCache.get(cacheKey);
  if(!overview){
   const response=await fetch(`/api/cities/${encodeURIComponent(databaseCity.cityId)}?language=${encodeURIComponent(requestedLanguage)}`,{headers:{Accept:'application/json'},cache:'no-store'});
   if(!response.ok)throw new Error('City guide request failed');
   overview=await response.json();databaseGuideCache.set(cacheKey,overview);
  }
  if(selectedDestination?.c.name!==cityName||language.value!==requestedLanguage)return;
  renderDatabaseEntries($('database-rules'),overview.rules||[],'rules');
  renderDatabaseEntries($('database-transit'),overview.transitGuides||[],'transit');
  card.hidden=false;
 }catch{
  card.hidden=true;
 }
}
function renderPublicLocalGuide(d,c){
 const bn=language.value==='bn';
 const add=(id,title,text,url,label)=>{
  const row=document.createElement('div');row.className='entry';
  const h=document.createElement('h4');h.textContent=title;row.append(h);
  const p=document.createElement('p');p.textContent=text;row.append(p);
  if(url){const a=document.createElement('a');a.className='entry-link';a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=(label||(bn?'তথ্য খুলুন':'Open information'))+' ↗';row.append(a)}
  $(id).append(row);
 };
 ['local-guide-list','local-rules-list','student-guide-list'].forEach(id=>$(id).replaceChildren());
 const maps=q=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q+' in '+c.name+', '+d.country);
 add('local-guide-list',bn?'পৌঁছানো ও চলাফেরা':'Arrival and getting around',bn?'উপরের transport guide দেখুন। যাত্রার আগে operator-এর timetable, ticket ও শেষ service যাচাই করুন।':'Use the transport guide above. Check the operator’s timetable, ticket conditions and last service before travelling.');
 add('local-guide-list',bn?'Tourist information centre':'Visitor information centre',bn?'Maps-এ visitor centre খুঁজুন। যাওয়ার আগে খোলার সময় ও official পরিচয় যাচাই করুন।':'Find visitor information centres on Maps. Confirm opening hours and official status before visiting.',maps('tourist information centre'),bn?'Maps-এ খুঁজুন':'Find on Maps');
 add('local-guide-list',bn?'দৈনন্দিন প্রয়োজন':'Everyday essentials',bn?'কাছাকাছি pharmacy, grocery ও service খুঁজুন। Maps-এর listing এই app যাচাই করেনি।':'Find nearby pharmacies, groceries and services. Map listings are not vetted by this app.',maps('pharmacy supermarket'),bn?'কাছাকাছি খুঁজুন':'Find nearby services');
 add('local-rules-list',bn?'নিয়ম যাচাইয়ের checklist':'Rules verification checklist',bn?'এটি সাধারণ checklist, এই দেশের সম্পূর্ণ আইন নয়। দেশভিত্তিক যাচাই করা নিয়ম নিচে থাকলে আলাদাভাবে source দেওয়া হয়েছে।':'This is a general checklist, not a complete statement of local law. Country-specific information, where available below, includes its official source.');
 add('local-rules-list',bn?'Visa, customs ও ওষুধ':'Entry, customs and medicines',bn?'নিজের passport অনুযায়ী visa ও stay limit, customs declaration এবং সঙ্গে আনা medicine-এর অনুমতি destination embassy/customs-এর কাছে যাচাই করুন।':'Check visa and stay limits for your passport, customs declarations and permission for medicines with the destination embassy and customs authority.');
 add('local-rules-list',bn?'স্থানীয় আচরণ ও restrictions':'Local conduct and restrictions',bn?'Smoking, alcohol, photography, dress, religious site, driving ও public transport-এর স্থানীয় বিধি ও posted signs যাচাই করুন।':'Check local rules and posted signs for smoking, alcohol, photography, dress, religious sites, driving and public transport.');
 add('local-rules-list',bn?'সরকারি travel advice':'Government travel advice',bn?'GOV.UK থেকে destination বেছে local laws ও safety দেখুন। Entry advice UK passport অনুযায়ী হতে পারে; নিজের embassy-র তথ্যও দেখুন।':'Select your destination in GOV.UK advice for local laws and safety. Entry advice may be for UK passports; also consult your own embassy.','https://www.gov.uk/foreign-travel-advice','GOV.UK travel advice');
 add('student-guide-list',bn?'কাজের অনুমতি':'Work permission',bn?'Student visa মানেই কাজের অনুমতি নয়। কাজ শুরুর আগে immigration authority ও university থেকে permission, hours ও job restrictions যাচাই করুন।':'Do not assume a student visa permits work. Verify permission, hours and job restrictions with immigration authorities and your university before starting.');
 add('student-guide-list',bn?'বসবাস ও পড়াশোনা':'Residence and study checklist',bn?'Address registration, residence renewal, attendance, health insurance, housing contract ও university support contact যাচাই করে রাখুন।':'Check address registration, residence renewal, attendance requirements, health insurance, housing contracts and your university’s support contacts.');
 const publicCountryRules={
  Bangladesh:{
   en:'FCDO advises keeping copies of your passport photo page and visa, and dressing modestly. Treat dress guidance as cultural advice. Follow destination authorities for the applicable law.',
   bn:'FCDO passport-এর photo page ও visa-এর copy রাখা এবং শালীন পোশাক পরার পরামর্শ দেয়। পোশাকের বিষয়টি সাংস্কৃতিক পরামর্শ; প্রযোজ্য আইনের জন্য স্থানীয় কর্তৃপক্ষ দেখুন।',
   url:'https://www.gov.uk/foreign-travel-advice/bangladesh/safety-and-security'
  },
  India:{
   en:'Alcohol rules differ by state. FCDO reports that smoking is illegal in most public places. Check the rules for your state and venue, and respect religious-site dress requirements.',
   bn:'Alcohol-এর নিয়ম রাজ্যভেদে আলাদা। FCDO অনুযায়ী অধিকাংশ public place-এ smoking নিষিদ্ধ। আপনার রাজ্য ও venue-এর বিধি এবং ধর্মীয় স্থানের পোশাকের নিয়ম যাচাই করুন।',
   url:'https://www.gov.uk/foreign-travel-advice/india/safety-and-security'
  },
  Thailand:{
   en:'FCDO states that flying an unregistered drone is illegal; registration requirements also apply on entry or purchase. Do not give your passport to rental businesses as a deposit. Read the full official guidance before hiring or flying.',
   bn:'FCDO অনুযায়ী unregistered drone ওড়ানো বেআইনি; দেশে প্রবেশ বা কেনার পর registration-এর শর্তও আছে। Rental business-এ deposit হিসেবে passport জমা দেবেন না। ব্যবহার করার আগে পুরো official guidance পড়ুন।',
   url:'https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security'
  }
 };
 const publicStudentRules={
  Canada:{
   en:'Eligible students may work off campus up to 24 hours per week during regular terms. This is not permission for every student: permit conditions, enrolment and other eligibility requirements apply. Check IRCC before starting work.',
   bn:'যোগ্য শিক্ষার্থীরা regular term-এ off-campus সর্বোচ্চ সপ্তাহে 24 ঘণ্টা কাজ করতে পারেন। সবার জন্য অনুমতি নয়: permit, enrolment ও অন্যান্য শর্ত প্রযোজ্য। কাজ শুরুর আগে IRCC যাচাই করুন।',
   url:'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/work-off-campus.html'
  },
  'United Kingdom':{
   en:'Term-time work permission depends on your course and sponsor: qualifying degree-level students may have a 20-hour limit, qualifying below-degree students 10 hours, and other study may permit no work. Confirm your own immigration conditions and prohibited job types.',
   bn:'Term-time কাজের অনুমতি course ও sponsor-এর ওপর নির্ভর করে: যোগ্য degree-level শিক্ষার্থীর 20 ঘণ্টা, below-degree-এর 10 ঘণ্টা সীমা হতে পারে; অন্য ক্ষেত্রে কাজের অনুমতি নাও থাকতে পারে। নিজের visa conditions ও নিষিদ্ধ কাজ যাচাই করুন।',
   url:'https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-student'
  },
  Australia:{
   en:'Most student visa holders have a 48-hour per fortnight work limit while their course is in session. Course-start restrictions and exceptions, including certain research degrees, apply. Read the conditions attached to your own visa.',
   bn:'অধিকাংশ student visa holder-এর course চলাকালে প্রতি fortnight-এ 48 ঘণ্টা কাজের সীমা আছে। Course শুরুর শর্ত ও কিছু research degree-র exception প্রযোজ্য। নিজের visa conditions পড়ুন।',
   url:'https://immi.homeaffairs.gov.au/visas/already-have-a-visa/check-visa-details-and-conditions/see-your-visa-conditions?vcid=18'
  }
 };
 const rule=publicCountryRules[d.country];
 if(rule)add('local-rules-list',d.country+(bn?' · সরকারি travel advice':' · government travel advice'),(bn?rule.bn:rule.en)+(bn?' তথ্য দেখা হয়েছে: 22 October 2026। UK passport-ভিত্তিক entry advice আপনার ক্ষেত্রে ভিন্ন হতে পারে।':' Source checked: 22 October 2026. UK-passport entry advice may differ for you.'),rule.url,'FCDO · '+d.country);
 const student=publicStudentRules[d.country];
 if(student)add('student-guide-list',d.country+(bn?' · শিক্ষার্থীর কাজ':' · student work'),(bn?student.bn:student.en)+(bn?' সূত্র দেখা হয়েছে: 22 October 2026।':' Source checked: 22 October 2026.'),student.url,bn?'Official immigration source':'Official immigration source');
 if(d.country==='Japan'){
  add('local-rules-list',bn?'Japan: পরিচয়পত্র ও smoking':'Japan: identification and smoking',bn?'JNTO visitor guide passport সঙ্গে রাখা এবং designated smoking area ব্যবহারের কথা বলে। Resident-এর নিয়ম immigration source-এ দেখুন।':'JNTO’s visitor guide advises carrying your passport and using designated smoking areas. Residents should check immigration guidance for their status.','https://www.japan.travel/en/plan/local-laws/','JNTO · Local laws');
  add('student-guide-list',bn?'Japan: student work ও residence':'Japan: student work and residence',bn?'Part-time কাজের আগে অতিরিক্ত activity permission প্রয়োজন। আপনার permit-এর hours ও restrictions, residence expiry ও registration Immigration Services Agency-তে যাচাই করুন।':'Part-time student work requires permission for activities outside the student status. Check your permit’s hours and restrictions, residence expiry and registration with the Immigration Services Agency.','https://www.moj.go.jp/isa/support/guidance/index.html?hl=en','Japan Immigration Services Agency');
 }
}
function renderDestination(){
 const d=destinations.find(item=>item.country===country.value);
 if(!d||!city.value)return;
 const c=findCity(d,city.value);
 if(!c)return;
 selectedDestination={d,c};
 const pageUrl=new URL(window.location.href);pageUrl.search='';pageUrl.searchParams.set('country',d.country);pageUrl.searchParams.set('city',c.name);
 try{history.replaceState(null,'',pageUrl)}catch{}
 const canonical=document.querySelector('link[rel="canonical"]');if(canonical)canonical.href=pageUrl.href;
 document.title=c.name+' travel guide | Borderless Local';
 const description=document.querySelector('meta[name="description"]');
 if(description)description.content='Explore places to visit, local food and ways to get around in '+c.name+', '+d.country+'.';
 setText('destination-title',c.name+' · '+d.country);setText('destination-subtitle',c.featured?d.region:(d.region+' · GeoNames city directory'));
 if(c.featured){
  renderList('places-list',c.sights,'place',c.name);renderList('food-list',c.foods,'food',c.name);
 }else{
  const cityCountry=c.name+', '+d.country;
  renderDirectoryLinks('places-list',[{title:'Popular sights and attractions',query:'top sights and popular attractions'},{title:'Museums and landmarks',query:'museums and landmarks'}],cityCountry);
  renderDirectoryLinks('food-list',[{title:'Local food, restaurants, ratings and menus',query:'local food restaurants top rated menus'},{title:'Shops and local markets',query:'shops and local markets'}],cityCountry);
 }
 loadCityAttractions(c.name+', '+d.country,c.featured);
 loadCityFoodSpots(c.name+', '+d.country);
 const target=$('transit-list');target.replaceChildren();
 if(c.featured)c.transit.forEach((text,index)=>{const item=document.createElement('div');item.className='entry';const h=document.createElement('h4');h.textContent=index===0?(language.value==='bn'?'শহরের ভেতরে':'Around the city'):(language.value==='bn'?'পৌঁছানো ও সংযোগ':'Arriving / connecting');item.append(h);const p=document.createElement('p');p.textContent=text;item.append(p);target.append(item)});
 else renderDirectoryLinks('transit-list',[{title:'Public transport and routes',query:'public transport and transit routes'}],c.name+', '+d.country);
 renderPublicLocalGuide(d,c);
 renderDatabaseGuide(c.name);
 if(d.country==='Myanmar'){
  const warning=document.createElement('div');warning.className='entry directory-entry';
  const heading=document.createElement('h4');heading.textContent=language.value==='bn'?'গুরুত্বপূর্ণ ভ্রমণ-সতর্কতা':'Important travel advisory';warning.append(heading);
  const note=document.createElement('p');note.textContent=language.value==='bn'?'Myanmar-এর নিরাপত্তা পরিস্থিতি ও সরকারি ভ্রমণ-সতর্কতা অঞ্চল ও নাগরিকত্বভেদে আলাদা এবং দ্রুত বদলাতে পারে। পরিকল্পনার আগে নিজের দেশের হালনাগাদ পরামর্শ দেখুন।':'Myanmar travel warnings are serious, differ by region and nationality, and can change. Check your own government’s current advice before making plans.';warning.append(note);
  [['UK FCDO travel advice','https://www.gov.uk/foreign-travel-advice/myanmar'],['U.S. State Department advisory','https://travel.state.gov/en/international-travel/travel-advisories/destination.mmr.html']].forEach(([label,url])=>{const link=document.createElement('a');link.className='entry-link';link.href=url;link.target='_blank';link.rel='noopener';link.textContent=label+' ↗';warning.append(link)});
  target.prepend(warning);
 }
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
  country.value=hits[0].d.country;refreshCities();city.value=hits[0].c.name;updateCitySelection();closeCityPicker();renderDestination();
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
  country.value=nearest.d.country;refreshCities();city.value=nearest.c.name;updateCitySelection();closeCityPicker();search.value='';
  if(nearest.distance>100){setStatus(s.locationFar+' '+nearest.c.name+' ('+Math.round(nearest.distance)+' km).');$('results').hidden=true;return}
  renderDestination();setStatus(s.locationFound+' '+nearest.c.name+' · '+Math.round(nearest.distance)+' km from its city centre (approx.).');
  $('results').scrollIntoView({behavior:'smooth',block:'start'});
 },()=>{control.disabled=false;setStatus(s.locationDenied)},{enableHighAccuracy:false,timeout:12000,maximumAge:300000});
}
language.addEventListener('change',applyLanguage);
country.addEventListener('input',()=>{renderCountryOptions(country.value,true);updateCountrySelection()});
country.addEventListener('change',()=>{updateCountrySelection();if(language.value!=='en')translateVisibleContent()});
country.addEventListener('focus',()=>renderCountryOptions(country.value,true));
country.addEventListener('keydown',event=>{
 if(event.key==='Escape'){renderCountryOptions('',false);return}
 if(event.key==='Enter'&&matchingCountries.length){event.preventDefault();selectCountry(matchingCountries[0]);return}
 if(event.key==='ArrowDown'&&!$('country-picker').hidden){event.preventDefault();$('country-options-list').querySelector('button')?.focus()}
});
document.addEventListener('click',event=>{if(!event.target.closest('.country-field-wrap'))renderCountryOptions('',false)});
$('location-button').addEventListener('click',useMyLocation);
$('show-button').disabled=true;
$('show-button').addEventListener('click',()=>{search.value='';setStatus('');renderDestination();$('results').scrollIntoView({behavior:'smooth',block:'start'})});
city.addEventListener('input',()=>{
 renderCityOptions(city.value);
 if(updateCitySelection()){closeCityPicker();renderDestination()}
 else{$('results').hidden=true;selectedDestination=null}
});
city.addEventListener('change',()=>{if(updateCitySelection()){closeCityPicker();renderDestination();$('results').scrollIntoView({behavior:'smooth',block:'start'})}});
city.addEventListener('keydown',event=>{if(event.key==='Escape')closeCityPicker()});
search.addEventListener('input',runSearch);
applyLanguage();
function restoreDestinationFromUrl(){
 const params=new URLSearchParams(window.location.search),requestedCountry=params.get('country'),requestedCity=params.get('city');
 if(!requestedCountry||!requestedCity)return;
 const d=destinations.find(item=>item.country.toLocaleLowerCase()===requestedCountry.toLocaleLowerCase());
 if(!d)return;
 country.value=d.country;refreshCities();
 loadCountryCities(countryCodes[d.country]).then(()=>{
  if(country.value!==d.country)return;
  refreshCities();
  const match=findCity(d,requestedCity);
  if(!match)return;
  city.value=match.name;updateCitySelection();closeCityPicker();renderDestination();
 }).catch(()=>{});
}
restoreDestinationFromUrl();
