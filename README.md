# Borderless Local Assistant

Java 21 + Maven + MySQL backend-সহ local travel guide। Browser-এ GeoNames directory-র ২৪৬টি country/territory এবং ২,৩৬,৩৫৩টি populated place search করা যায়। ৪৪টি দেশের curated guide city আছে; অন্য city-তে general map-search links দেখায়। Bangladesh-এর পাঁচটি এবং Myanmar-এর চারটি starter city guide আছে। পরিচিত MySQL database-এ কোনো তথ্য লেখে বা পরিবর্তন করে না।

## প্রথমবার চালানো

1. Project-টি IntelliJ IDEA-তে খুলে Maven sync শেষ হতে দিন।
2. Project root-এ `local.properties.example`-এর copy করে নাম দিন `local.properties`।
3. `local.properties`-এ নিজের MySQL username ও password দিন। এই ফাইলটি শুধু নিজের কম্পিউটারে রাখুন; ZIP, screenshot, বা chat-এ পাঠাবেন না।
4. MySQL চালু রাখুন এবং database `borderless_local_assistant`-এ প্রয়োজনীয় tables ও data আছে নিশ্চিত করুন।
5. `src/main/java/com/borderlesslocalassistant/WebServer.java` খুলে `main`-এর পাশে সবুজ ▶ চাপুন।
6. Browser-এ `http://localhost:8080` খুলুন। কাজ শেষে IntelliJ-র Run window-তে Stop চাপুন।

8080 port ব্যস্ত থাকলে IntelliJ Run Configuration-এর **VM options**-এ `-Dserver.port=8081` দিন; এরপর `http://localhost:8081` খুলুন।

## ব্যবহার

- দেশ ও শহর বেছে **গাইড দেখুন** চাপুন; অথবা **আমার অবস্থান ব্যবহার করুন** চাপলে browser একবারের location permission চাইবে।
- Country ঘরে লিখে suggestion বাছুন। এরপর city ঘরে লিখলে মিল থাকা শহরগুলো search box-এর ঠিক নিচে আসবে; না লিখলে নির্বাচিত দেশের city ও town-গুলো তালিকায় scroll করে দেখা যাবে। Curated guide city-গুলো আগে দেখানো হয়। অন্য directory city বাছলে Google Maps-এ attractions, local food ও transit খোঁজার link আসে; এগুলো app-এর যাচাইকৃত curated recommendations নয়।
- City directory-টি GeoNames `cities500` extract থেকে তৈরি: ২৪৬টি country/territory-তে ২,৩৬,৩৫৩টি populated place search করা যায়। Country বাছার পর শুধু সেই দেশের city file load হয়। Source-টি ৫০০-এর বেশি population অথবা নির্দিষ্ট administrative seat-সহ populated place অন্তর্ভুক্ত করে; প্রত্যেক neighborhood/settlement-এর পূর্ণ তালিকা নয় এবং data “as is”। [GeoNames source and licence](https://www.geonames.org/export/). Country metadata `src/main/resources/web/cities500.js`, city files `src/main/resources/web/cities/`; footer-এ attribution আছে।
- Curated sightseeing list exhaustive নয়। প্রতিটি guide-এ Wikimedia article discovery ছাড়াও Google Maps-এ শহরের আরও attractions, parks, museums ও landmarks খোঁজার link আছে; live listings Google Maps-এর coverage ও availability-এর ওপর নির্ভর করে।
- Location চালু করলে app কেবল browser-এর ভেতরে city-centre coordinates-এর সঙ্গে কাছের guide মিলিয়ে দেখে; গাইড খোঁজার জন্য coordinates server-এ পাঠায় বা সংরক্ষণ করে না। Directions চাইলে coordinates Google Maps-এ পাঠানো হয়। Catalogue city থেকে ১০০ কিমির বেশি দূরে থাকলে ভুল শহরের guide দেখায় না।
- দর্শনীয় স্থানের map ও transit-direction link খুলে বিস্তারিত route দেখতে পারবেন। খাবারের নাম দিয়ে কাছাকাছি restaurant খোঁজা যায়।
- Homepage English-এ খোলে; বাংলা interface-ও built in আছে। বাকি ভাষার interface ও guide-এর লেখা বিনামূল্যের MyMemory translation service দিয়ে অনুবাদ হয়; কোনো API key লাগে না। ইন্টারনেট লাগবে, এবং free service-এর সীমা/প্রাপ্যতার কারণে অনুবাদ ব্যর্থ হতে পারে। নির্বাচিত ভাষা service-এ না থাকলে বা service সাময়িক বন্ধ থাকলে English লেখা থাকবে। অনুবাদের জন্য শুধু public interface text পাঠানো হয়; GPS location বা MySQL data পাঠানো হয় না। জায়গা ও খাবারের proper name সাধারণ বানানে থাকে। গুরুত্বপূর্ণ travel/safety তথ্য official source থেকে যাচাই করুন।
- গন্তব্যের তালিকাটি starter catalogue, live route, fare, opening hours, visa বা safety advice নয়। যাত্রার আগে official source যাচাই করুন।

## API

- `GET /api/cities` — local database-এর city ID ও নাম।
- `GET /api/cities/{id}?language=bn` — database-এর city rules ও transit guides। API পুরোনো database data পড়ে; worldwide starter catalogue database পরিবর্তন করে না।
- `POST /api/translate` — UI ও public guide text-কে free MyMemory service দিয়ে অনুবাদ করে।

Server কেবল এই কম্পিউটারের loopback address-এ শোনে; local network-এর অন্য device থেকে সংযোগ নেয় না। Database API শুধু GET গ্রহণ করে; translation proxy-তে শুধু local page-এর POST অনুমোদিত।

## Online publish ও Google Search

এই project-এর browser app GitHub Pages-এ static site হিসেবে প্রকাশের workflow আছে: `.github/workflows/deploy-pages.yml`। এটি শুধু `src/main/resources/web` publish করে; `local.properties`, MySQL credentials বা database data publish করে না। Java/MySQL backend আগের মতো local-এই থাকে। Published site-এ অনুবাদ backend না থাকলে browser free MyMemory endpoint fallback হিসেবে ব্যবহার করে; এজন্য internet connection ও provider availability দরকার।

প্রকাশের জন্য project-টি নিজের GitHub repository-তে push করুন, repository **Settings → Pages → Build and deployment → Source → GitHub Actions** বেছে নিন, তারপর `main` বা `master` branch-এ workflow চালান। Workflow public GitHub Pages URL থেকে `robots.txt` ও `sitemap.xml` তৈরি করে; sitemap-এ homepage ও ৮৮টি curated city guide-এর URL থাকে। অন্য directory city-গুলো searchable হলেও তাদের আলাদা curated guide page নেই।

Site public হলে Google Search Console-এ site-এর URL-prefix property যোগ করে ownership verify করুন, তারপর `https://<আপনার-public-site>/sitemap.xml` submit করুন। Sitemap submit করা crawl/indexing-এর অনুরোধ; Google কখন বা কোন page index করবে তা নিশ্চিত করে না। Domain, GitHub repository এবং Search Console ownership user-এর account-এ করতে হবে।

## Project-এর অংশ

- `model`: database row-এর Java record।
- `repository`: MySQL থেকে prepared statement দিয়ে তথ্য পড়ে।
- `service`: city guide-এর তথ্য একত্র করে।
- `WebServer`: local HTTP server ও JSON API।
- `src/main/resources/web`: browser-এর HTML, CSS, ও JavaScript interface।
- `DatabaseTest`: MySQL connection/table-গুলো manually যাচাই করার entry point।

## Build

Java 21 ও Maven install থাকলে project root-এ `mvn compile` চালিয়ে compile করা যায়। Browser app চালাতে `WebServer` run করতে হবে।
