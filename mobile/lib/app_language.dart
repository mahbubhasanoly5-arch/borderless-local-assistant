/// Local interface translations. Guide content keeps its original language.
class AppLanguage {
  static String code = 'bn';
  static const names = {'bn':'বাংলা', 'en':'English', 'ja':'日本語', 'hi':'हिन्दी', 'es':'Español', 'fr':'Français', 'ar':'العربية', 'my':'မြန်မာ'};
  static const _codes = ['ja','hi','es','fr','ar','my'];
  static const _labels = <String, List<String>>{
    'Language':['言語','भाषा','Idioma','Langue','اللغة','ဘာသာစကား'],
    'Home':['ホーム','होम','Inicio','Accueil','الرئيسية','ပင်မ'],
    'Explore':['探す','खोजें','Explorar','Explorer','استكشاف','ရှာဖွေ'],
    'Saved':['保存済み','सहेजे गए','Guardados','Enregistrés','المحفوظات','သိမ်းထားသည်'],
    'Rules':['ルール','नियम','Normas','Règles','القواعد','စည်းမျဉ်းများ'],
    'Students':['留学生','विद्यार्थी','Estudiantes','Étudiants','الطلاب','ကျောင်းသားများ'],
    'Settings':['設定','सेटिंग','Ajustes','Paramètres','الإعدادات','ဆက်တင်များ'],
    'Search city or country':['都市・国を検索','शहर या देश खोजें','Buscar ciudad o país','Chercher une ville ou un pays','ابحث عن مدينة أو بلد','မြို့ သို့မဟုတ် နိုင်ငံရှာရန်'],
    'City or country':['都市・国','शहर या देश','Ciudad o país','Ville ou pays','مدينة أو بلد','မြို့ သို့မဟုတ် နိုင်ငံ'],
    'Use my location':['現在地を使う','मेरा स्थान','Mi ubicación','Ma position','استخدم موقعي','လက်ရှိတည်နေရာ'],
    'World search':['世界の都市検索','विश्व में खोजें','Buscar en el mundo','Recherche mondiale','بحث عالمي','ကမ္ဘာတစ်ဝှမ်းရှာရန်'],
    'Locating…':['現在地を確認中…','स्थान खोज रहे हैं…','Buscando ubicación…','Localisation…','جارٍ تحديد الموقع…','တည်နေရာရှာနေသည်…'],
    'Search cities worldwide':['世界の都市を検索','दुनिया के शहर खोजें','Buscar ciudades del mundo','Chercher des villes du monde','ابحث عن مدن العالم','ကမ္ဘာ့မြို့များရှာရန်'],
    'Your next journey':['次の旅へ','आपकी अगली यात्रा','Tu próximo viaje','Votre prochain voyage','رحلتك القادمة','သင်၏နောက်ခရီးစဉ်'],
    'Explore destinations':['旅先を探す','यात्रा स्थल खोजें','Explorar destinos','Explorer les destinations','استكشف الوجهات','ခရီးပန်းတိုင်များရှာရန်'],
    'Saved guides':['保存したガイド','सहेजे गए गाइड','Guías guardadas','Guides enregistrés','الأدلة المحفوظة','သိမ်းထားသောလမ်းညွှန်များ'],
    'Know before you go':['出発前に知る','जाने से पहले जानें','Antes de viajar','Avant de partir','اعرف قبل السفر','မသွားမီသိထားရန်'],
    'Study abroad':['海外留学','विदेश में पढ़ाई','Estudiar en el extranjero',"Étudier à l’étranger",'الدراسة بالخارج','နိုင်ငံခြားတွင်ပညာသင်ရန်'],
    'Country':['国','देश','País','Pays','البلد','နိုင်ငံ'],
    'Places':['観光スポット','जगहें','Lugares','Lieux','الأماكن','နေရာများ'],
    'Food':['グルメ','भोजन','Comida','Cuisine','الطعام','အစားအစာ'],
    'Transport':['交通','परिवहन','Transporte','Transports','المواصلات','သယ်ယူပို့ဆောင်ရေး'],
    'Open guide':['ガイドを開く','गाइड खोलें','Abrir guía','Ouvrir le guide','افتح الدليل','လမ်းညွှန်ဖွင့်ရန်'],
    'Save guide':['ガイドを保存','गाइड सहेजें','Guardar guía','Enregistrer le guide','احفظ الدليل','လမ်းညွှန်သိမ်းရန်'],
    'Remove saved guide':['保存を解除','सहेजा गाइड हटाएँ','Quitar guía','Retirer le guide','أزل الدليل المحفوظ','သိမ်းထားမှုဖယ်ရှားရန်'],
    'Clear':['クリア','मिटाएँ','Borrar','Effacer','مسح','ရှင်းရန်'],
    'Try again':['再試行','फिर कोशिश करें','Reintentar','Réessayer','حاول مجددًا','ထပ်ကြိုးစားရန်'],
    'Recently opened':['最近見たガイド','हाल ही में देखे गए','Vistos recientemente','Consultés récemment','شوهدت مؤخرًا','မကြာသေးမီကကြည့်ထားသည်'],
    'Ready for take-off?':['旅の準備はできた？','यात्रा के लिए तैयार?','¿Listo para viajar?','Prêt à partir ?','هل أنت مستعد للسفر؟','ခရီးအတွက်အဆင်သင့်ဖြစ်ပြီလား'],
    'Your personal trip checklist':['旅の準備チェックリスト','आपकी यात्रा सूची','Tu lista de viaje','Votre liste de voyage','قائمة استعدادك للسفر','သင်၏ခရီးပြင်ဆင်ရန်စာရင်း'],
    'Find your next favourite place':['次のお気に入りの場所へ','अपनी अगली पसंदीदा जगह खोजें','Encuentra tu próximo lugar favorito','Trouvez votre prochain lieu préféré','اكتشف مكانك المفضل القادم','နောက်ထပ်နှစ်သက်မည့်နေရာရှာရန်'],
    'Explore the world':['世界を旅する','दुनिया घूमें','Explora el mundo','Explorez le monde','استكشف العالم','ကမ္ဘာကိုလေ့လာရန်'],
    'Nearby city':['近くの都市','नज़दीकी शहर','Ciudad cercana','Ville proche','مدينة قريبة','အနီးဆုံးမြို့'],
    'Search instead':['都市名で探す','नाम से खोजें','Buscar por nombre','Chercher par nom','ابحث بالاسم','နာမည်ဖြင့်ရှာရန်'],
    'Official source':['公式情報','आधिकारिक स्रोत','Fuente oficial','Source officielle','المصدر الرسمي','တရားဝင်ရင်းမြစ်'],
    'Full world city directory':['世界の都市一覧','दुनिया के शहरों की सूची','Directorio mundial de ciudades','Répertoire mondial des villes','دليل مدن العالم','ကမ္ဘာ့မြို့စာရင်း'],
    'Interface language only. Guide content may be in English.':['画面の言語のみ変更します。ガイド本文は英語の場合があります。','केवल इंटरफ़ेस की भाषा बदलती है। गाइड अंग्रेज़ी में हो सकता है।','Solo cambia el idioma de la interfaz. Las guías pueden estar en inglés.',"Seule l’interface change de langue. Les guides peuvent être en anglais.",'تتغير لغة الواجهة فقط. قد يكون محتوى الدليل بالإنجليزية.','မျက်နှာပြင်ဘာသာစကားသာပြောင်းပါမည်။ လမ်းညွှန်အကြောင်းအရာသည် အင်္ဂလိပ်လိုဖြစ်နိုင်သည်။'],
  };
  static String text(String english, String bangla, {bool? useBangla}) {
    if (code == 'bn') return useBangla == false ? english : bangla;
    final index = _codes.indexOf(code);
    return index < 0 ? english : (_labels[english]?[index] ?? english);
  }
}
