export interface Recommendation {
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  translationMs: string;
  source: string;
  audioUrl?: string;
  excerpt?: boolean;
}

export interface HolySite {
  id: string;
  name: string;
  nameArabic: string;
  category: 'masjid' | 'mashaer' | 'miqat' | 'other';
  description: string;
  lat: number;
  lng: number;
  recommendations: Recommendation[];
}

export const holySites: HolySite[] = [
  // ===== MIQAT =====
  {
    id: 'miqat',
    name: 'Miqat (Zul Hulaifah / Bir Ali)',
    nameArabic: 'ميقات (ذو الحليفة)',
    category: 'miqat',
    description: 'Titik permulaan ihram — di sinilah jemaah berniat untuk Umrah atau Haji.',
    lat: 24.4635,
    lng: 39.6013,
    recommendations: [
      {
        title: 'Talbiyah',
        arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',
        transliteration: 'Labbaik Allahumma labbaik. Labbaika laa syariika laka labbaik. Innal hamda wan ni\'mata laka wal mulk. Laa syariika lak.',
        translation: 'I am here at Your service, O Allah, I am here. I am here — You have no partner. Indeed all praise, blessing, and dominion belong to You. You have no partner.',
        translationMs: 'Aku menyahut panggilan-Mu, Ya Allah, aku menyahut panggilan-Mu. Aku menyahut panggilan-Mu — tiada sekutu bagi-Mu. Sesungguhnya segala puji, nikmat, dan kerajaan adalah milik-Mu. Tiada sekutu bagi-Mu.',
        source: 'Sunnah — dibaca dari miqat sehingga memulakan tawaf (Umrah) atau melontar Jamrah Aqabah (Haji).',
      },
    ],
  },

  // ===== MASJID AL-HARAM =====
  {
    id: 'first-sight-kaaba',
    name: 'Pandangan Pertama Kaabah',
    nameArabic: 'أول رؤية للكعبة',
    category: 'masjid',
    description: 'Saat pertama kali melihat Kaabah — salah satu waktu paling mustajab untuk berdoa.',
    lat: 21.4225,
    lng: 39.8262,
    recommendations: [
      {
        title: 'Doa Melihat Kaabah',
        arabic: 'اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً، وَزِدْ مَنْ شَرَّفَهُ وَعَظَّمَهُ مِمَّنْ حَجَّهُ أَوِ اعْتَمَرَهُ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَبِرًّا',
        transliteration: 'Allahumma zid haadzal baita tasyriifan wa ta\'zhiiman wa takriiman wa mahaabah. Wa zid man syarrafahu wa \'azhzhamahu mimman hajjahu awi\'tamarahu tasyriifan wa ta\'zhiiman wa takriiman wa birran.',
        translation: 'O Allah, increase this House in honor, magnificence, reverence, and awe. And increase those who honor and glorify it — those who perform Hajj or Umrah — in honor, reverence, and piety.',
        translationMs: 'Ya Allah, tambahkanlah kemuliaan, keagungan, kehormatan, dan kewibawaan kepada rumah-Mu ini. Dan tambahkanlah kemuliaan kepada mereka yang memuliakannya dari kalangan jemaah Haji dan Umrah.',
        source: 'Diriwayatkan oleh Imam Al-Baihaqi. Doa pada pandangan pertama Kaabah adalah mustajab.',
      },
      {
        title: 'Takbir dan Doa Mustajab',
        arabic: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللَّهُ',
        transliteration: 'Allahu Akbar, Allahu Akbar, Allahu Akbar, Laa ilaaha illallah.',
        translation: 'Allah is the Greatest (x3). There is no god but Allah.',
        translationMs: 'Allah Maha Besar (3x). Tiada tuhan selain Allah. Kemudian berdoalah apa sahaja — saat ini antara waktu doa paling mustajab.',
        source: 'Hadith: Doa ketika pertama kali melihat Kaabah adalah mustajab (diterima).',
      },
    ],
  },

  {
    id: 'tawaf',
    name: 'Tawaf (Mengelilingi Kaabah)',
    nameArabic: 'الطواف حول الكعبة',
    category: 'masjid',
    description: 'Tawaf — 7 pusingan mengelilingi Kaabah, dimulai dari Hajar Aswad.',
    lat: 21.4225,
    lng: 39.8262,
    recommendations: [
      {
        title: 'Doa antara Rukun Yamani dan Hajar Aswad',
        arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
        transliteration: 'Rabbanaa aatinaa fid-dunyaa hasanah, wa fil-aakhirati hasanah, wa qinaa \'adzaaban naar.',
        translation: 'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.',
        translationMs: 'Wahai Tuhan kami, kurniakanlah kepada kami kebaikan di dunia dan kebaikan di akhirat, dan peliharalah kami daripada azab api neraka.',
        source: 'Surah Al-Baqarah 2:201 — sunnah dibacakan pada setiap pusingan antara Rukun Yamani dan Hajar Aswad.',
      },
    ],
  },

  {
    id: 'maqam-ibrahim',
    name: 'Maqam Ibrahim',
    nameArabic: 'مقام إبراهيم',
    category: 'masjid',
    description: 'Tempat berdirinya Nabi Ibrahim AS ketika membina Kaabah. Disunatkan solat sunat tawaf 2 rakaat di belakang Maqam Ibrahim.',
    lat: 21.4226,
    lng: 39.8263,
    recommendations: [
      {
        title: 'Surah Al-Kafirun (Rakaat 1)',
        arabic: 'قُلْ يَا أَيُّهَا الْكَافِرُونَ ﴿١﴾ لَا أَعْبُدُ مَا تَعْبُدُونَ ﴿٢﴾ وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ ﴿٣﴾ وَلَا أَنَا عَابِدٌ مَا عَبَدْتُمْ ﴿٤﴾ وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ ﴿٥﴾ لَكُمْ دِينُكُمْ وَلِيَ دِينِ ﴿٦﴾',
        transliteration: 'Qul yaa ayyuhal kaafiruun. Laa a\'budu maa ta\'buduun. Wa laa antum \'aabiduuna maa a\'bud. Wa laa ana \'aabidum maa \'abattum. Wa laa antum \'aabiduuna maa a\'bud. Lakum diinukum wa liya diin.',
        translation: 'Say: O disbelievers. I do not worship what you worship. Nor are you worshippers of what I worship. Nor will I be a worshipper of what you worship. Nor will you be worshippers of what I worship. For you is your religion, and for me is my religion.',
        translationMs: 'Katakanlah: Wahai orang-orang kafir. Aku tidak menyembah apa yang kamu sembah. Dan kamu bukan penyembah apa yang aku sembah. Dan aku tidak akan menjadi penyembah apa yang kamu sembah. Dan kamu tidak akan menjadi penyembah apa yang aku sembah. Bagi kamu agama kamu, dan bagiku agamaku.',
        source: 'Surah Al-Kafirun (109:1-6) — sunnah dibaca pada rakaat pertama solat sunat tawaf.',
      },
      {
        title: 'Surah Al-Ikhlas (Rakaat 2)',
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ ﴿٤﴾',
        transliteration: 'Qul huwallahu ahad. Allahus-samad. Lam yalid wa lam yuulad. Wa lam yakul lahu kufuwan ahad.',
        translation: 'Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born. Nor is there to Him any equivalent.',
        translationMs: 'Katakanlah: Dialah Allah, Yang Maha Esa. Allah tempat bergantung. Dia tidak beranak dan tidak diperanakkan. Dan tidak ada sesiapapun yang setara dengan-Nya.',
        source: 'Surah Al-Ikhlas (112:1-4) — sunnah dibaca pada rakaat kedua solat sunat tawaf.',
      },
    ],
  },

  {
    id: 'multazam',
    name: 'Multazam',
    nameArabic: 'الملتزم',
    category: 'masjid',
    description: 'Kawasan antara Hajar Aswad dan pintu Kaabah. Tempat paling mustajab untuk berdoa di dalam Masjid al-Haram.',
    lat: 21.4225,
    lng: 39.8262,
    recommendations: [
      {
        title: 'Doa di Multazam',
        arabic: 'اللَّهُمَّ يَا رَبَّ الْبَيْتِ الْعَتِيقِ، أَعْتِقْ رِقَابَنَا وَرِقَابَ آبَائِنَا وَأُمَّهَاتِنَا مِنَ النَّارِ، يَا ذَا الْجُودِ وَالْكَرَمِ وَالْفَضْلِ وَالْمَنِّ وَالْعَطَاءِ وَالْإِحْسَانِ',
        transliteration: 'Allahumma yaa Rabbal baitil \'atiiq, a\'tiq riqaabanaa wa riqaaba aabaa\'inaa wa ummahaatinaa minan naar. Yaa Dzal juudi wal karami wal fadhli wal manni wal \'athaa\'i wal ihsaan.',
        translation: 'O Allah, Lord of the Ancient House, free our necks and the necks of our fathers and mothers from the Fire. O Possessor of generosity, nobility, grace, favor, giving, and excellence.',
        translationMs: 'Ya Allah, Tuhan Rumah Tua (Kaabah) ini, bebaskanlah kami dan ibu bapa kami daripada api neraka. Wahai Zat Yang Maha Pemurah, Maha Mulia, Maha Pemberi Kurnia dan Nikmat.',
        source: 'Doa di Multazam adalah mustajab. Berdoalah apa sahaja — minta ampun, minta syurga, minta kebaikan dunia dan akhirat.',
      },
    ],
  },

  // ===== SA'I =====
  {
    id: 'safa',
    name: 'Bukit Safa',
    nameArabic: 'الصفا',
    category: 'masjid',
    description: 'Titik permulaan Sa\'i. Di sinilah Siti Hajar mula berlari mencari air untuk anaknya, Nabi Ismail AS.',
    lat: 21.4235,
    lng: 39.8275,
    recommendations: [
      {
        title: 'Ayat Permulaan Sa\'i',
        arabic: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ',
        transliteration: 'Innas-safaa wal marwata min sya\'aa\'irillah.',
        translation: 'Indeed, Safa and Marwa are among the symbols of Allah.',
        translationMs: 'Sesungguhnya Safa dan Marwa adalah sebahagian daripada syiar-syiar Allah.',
        source: 'Surah Al-Baqarah 2:158 — dibaca ketika memulakan Sa\'i di Bukit Safa sambil menghadap Kaabah.',
      },
      {
        title: 'Takbir & Doa di Safa',
        arabic: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'Allahu Akbar (3x). Laa ilaaha illallahu wahdahu laa syariika lah. Lahul mulku wa lahul hamdu wa huwa \'alaa kulli syai\'in qadiir.',
        translation: 'Allah is the Greatest (3x). There is no god but Allah alone, with no partner. His is the dominion and His is the praise, and He is over all things competent.',
        translationMs: 'Allah Maha Besar (3x). Tiada tuhan selain Allah yang Maha Esa, tiada sekutu bagi-Nya. Milik-Nya kerajaan dan pujian, dan Dia Maha Berkuasa ke atas setiap sesuatu.',
        source: 'Sunnah — dibaca 3x di atas Bukit Safa, diikuti dengan doa peribadi.',
      },
    ],
  },

  {
    id: 'marwa',
    name: 'Bukit Marwa',
    nameArabic: 'المروة',
    category: 'masjid',
    description: 'Penamat Sa\'i. Di sinilah Siti Hajar menemui air Zamzam setelah 7 kali perjalanan antara Safa dan Marwa.',
    lat: 21.4215,
    lng: 39.8285,
    recommendations: [
      {
        title: 'Doa di Marwa',
        arabic: 'اللَّهُمَّ إِنَّكَ قُلْتَ وَقَوْلُكَ الْحَقُّ: ادْعُونِي أَسْتَجِبْ لَكُمْ، وَإِنَّكَ لَا تُخْلِفُ الْمِيعَادَ',
        transliteration: 'Allahumma innaka qulta wa qawlukal haqq: Ud\'uunii astajib lakum. Wa innaka laa tukhliful mii\'aad.',
        translation: 'O Allah, You have said — and Your word is truth — "Call upon Me, I will respond to you." And indeed, You do not break Your promise.',
        translationMs: 'Ya Allah, Engkau telah berfirman — dan firman-Mu adalah benar: "Berdoalah kepada-Ku, nescaya Aku perkenankan." Dan sesungguhnya Engkau tidak memungkiri janji.',
        source: 'Berdasarkan Surah Ghafir 40:60. Sunnah berdoa di Marwa selepas Takbir seperti di Safa.',
      },
    ],
  },

  {
    id: 'green-light',
    name: 'Lampu Hijau (Larian Sa\'i)',
    nameArabic: 'الضوء الأخضر (الهرولة)',
    category: 'masjid',
    description: 'Kawasan antara dua lampu hijau — sunnah berlari-lari anak (hari-hari) bagi lelaki, mengingati perjuangan Siti Hajar.',
    lat: 21.4226,
    lng: 39.828,
    recommendations: [
      {
        title: 'Doa antara Lampu Hijau',
        arabic: 'رَبِّ اغْفِرْ وَارْحَمْ، وَتَجَاوَزْ عَمَّا تَعْلَمُ، إِنَّكَ أَنْتَ الْأَعَزُّ الْأَكْرَمُ',
        transliteration: 'Rabbighfir warham, wa tajaawaz \'ammaa ta\'lam. Innaka Antal A\'azzul Akram.',
        translation: 'My Lord, forgive and have mercy, and overlook what You know. Indeed, You are the Most Mighty, the Most Generous.',
        translationMs: 'Wahai Tuhanku, ampunilah dan kasihanilah, dan maafkanlah apa yang Engkau ketahui. Sesungguhnya Engkau Maha Perkasa lagi Maha Mulia.',
        source: 'Sunnah — dibaca ketika melalui kawasan lampu hijau semasa Sa\'i.',
      },
    ],
  },

  // ===== ARAFAT =====
  {
    id: 'arafat',
    name: 'Padang Arafat (Wukuf)',
    nameArabic: 'عرفة (الوقوف)',
    category: 'mashaer',
    description: 'Kemuncak Haji — wukuf di Arafat pada 9 Zulhijjah. Sebaik-baik doa adalah doa pada hari Arafat.',
    lat: 21.3547,
    lng: 39.9839,
    recommendations: [
      {
        title: 'Zikir Terbaik Hari Arafat',
        arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'Laa ilaaha illallahu wahdahu laa syariika lah. Lahul mulku wa lahul hamdu wa huwa \'alaa kulli syai\'in qadiir.',
        translation: 'There is no god but Allah alone, with no partner. His is the dominion and His is the praise, and He is over all things competent.',
        translationMs: 'Tiada tuhan selain Allah yang Maha Esa, tiada sekutu bagi-Nya. Milik-Nya kerajaan dan pujian, dan Dia Maha Berkuasa ke atas setiap sesuatu.',
        source: 'Hadith: Sebaik-baik doa adalah doa pada hari Arafat, dan sebaik-baik zikir yang diucapkan olehku dan para nabi sebelumku adalah: Laa ilaaha illallah...',
      },
      {
        title: '3 Ayat Terakhir Surah Al-Hasyr',
        excerpt: true,
        arabic: 'هُوَ اللَّهُ الَّذِي لَا إِلَهَ إِلَّا هُوَ... (Al-Hasyr 59:22-24)',
        transliteration: 'Huwallahu alladzii laa ilaaha illaa Huwa... \'Aalimul ghaibi wasy syahaadah... Huwallahu alladzii laa ilaaha illaa Huwal Malikul Quddusus Salaamul Mu\'minul Muhaiminul \'Aziizul Jabbaarul Mutakabbir...',
        translation: 'He is Allah, besides Whom there is no god... He is Allah, the Creator, the Inventor, the Fashioner... To Him belong the best names.',
        translationMs: 'Dialah Allah yang tiada tuhan selain-Nya... Yang Mengetahui perkara ghaib dan nyata... Dialah Allah, Raja, Maha Suci, Sejahtera, Pemberi Keamanan, Pengawas, Maha Perkasa, Maha Kuasa, Maha Agung...',
        source: 'Surah Al-Hasyr 59:22-24 — sunnah dibaca pada petang hari Arafat.',
      },
      {
        title: 'Sayyidul Istighfar',
        excerpt: true,
        arabic: 'اللَّهُمَّ أَنْتَ رَبِّي، لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ...',
        transliteration: 'Allahumma Anta Rabbii, laa ilaaha illaa Ant. Khalaqtanii wa ana \'abduka, wa ana \'alaa \'ahdika wa wa\'dika mastatha\'t...',
        translation: 'O Allah, You are my Lord. There is no god but You. You created me and I am Your servant. I am upon Your covenant and promise as much as I am able...',
        translationMs: 'Ya Allah, Engkaulah Tuhanku. Tiada tuhan selain Engkau. Engkau telah menciptakanku dan aku adalah hamba-Mu. Aku berpegang kepada perjanjian-Mu sedaya upayaku...',
        source: 'Sahih Al-Bukhari — Sayyidul Istighfar, penghulu segala istighfar. Dibaca pada hari Arafat dengan penuh pengharapan.',
      },
    ],
  },

  // ===== MUZDALIFAH =====
  {
    id: 'muzdalifah',
    name: 'Muzdalifah',
    nameArabic: 'المزدلفة',
    category: 'mashaer',
    description: 'Tempat bermalam selepas Arafat — kumpul batu untuk melontar Jamrah.',
    lat: 21.3939,
    lng: 39.9178,
    recommendations: [
      {
        title: 'Zikir Malam Muzdalifah',
        arabic: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللَّهُ',
        transliteration: 'Allahu Akbar, Allahu Akbar, Allahu Akbar, Laa ilaaha illallah.',
        translation: 'Allah is the Greatest (3x). There is no god but Allah.',
        translationMs: 'Allah Maha Besar (3x). Tiada tuhan selain Allah.',
        source: 'Sunnah — memperbanyakkan takbir pada malam Muzdalifah dan hari-hari Tashreeq.',
      },
      {
        title: 'Surah Al-Fatihah',
        excerpt: true,
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾...',
        transliteration: 'Bismillahir rahmaanir rahiim. Alhamdu lillaahi Rabbil \'aalamiin. Arrahmaanir rahiim. Maaliki yaumid diin...',
        translation: 'In the name of Allah, the Most Gracious, the Most Merciful. All praise is due to Allah, Lord of the worlds...',
        translationMs: 'Dengan nama Allah Yang Maha Pemurah lagi Maha Penyayang. Segala puji bagi Allah, Tuhan semesta alam...',
        source: 'Surah Al-Fatihah — amalan sunnah pada malam Muzdalifah dan setiap waktu.',
      },
    ],
  },

  // ===== MINA & JAMARAT =====
  {
    id: 'jamarat',
    name: 'Jamarat (Melontar)',
    nameArabic: 'الجمرات (الرمي)',
    category: 'mashaer',
    description: 'Melontar 3 tiang Jamrah — mengingati peristiwa Nabi Ibrahim AS melontar syaitan.',
    lat: 21.42,
    lng: 39.87,
    recommendations: [
      {
        title: 'Takbir Setiap Lontaran',
        arabic: 'اللَّهُ أَكْبَرُ',
        transliteration: 'Allahu Akbar.',
        translation: 'Allah is the Greatest.',
        translationMs: 'Allah Maha Besar.',
        source: 'Sunnah — membaca takbir pada setiap batu yang dilontar (7 batu setiap Jamrah).',
      },
      {
        title: 'Doa Selepas Jamrah Sughra dan Wusta',
        arabic: 'اللَّهُمَّ اجْعَلْهُ حَجًّا مَبْرُورًا وَذَنْبًا مَغْفُورًا',
        transliteration: 'Allahummaj\'alhu hajjan mabruuran wa dzanban maghfuuraa.',
        translation: 'O Allah, make it an accepted Hajj and forgiven sins.',
        translationMs: 'Ya Allah, jadikanlah Haji ini Haji yang mabrur dan dosa yang diampuni.',
        source: 'Sunnah — berhenti dan berdoa selepas melontar Jamrah Sughra dan Wusta (bukan Jamrah Aqabah).',
      },
    ],
  },

  // ===== MASJID NABAWI =====
  {
    id: 'rawdah',
    name: 'Raudhah (Taman Syurga)',
    nameArabic: 'الروضة الشريفة',
    category: 'other',
    description: 'Raudhah — ruang antara mimbar dan makam Rasulullah SAW di Masjid Nabawi. Salah satu taman daripada taman-taman syurga.',
    lat: 24.4672,
    lng: 39.6112,
    recommendations: [
      {
        title: 'Solat & Doa di Raudhah',
        arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
        transliteration: 'Allahumma shalli \'alaa Muhammad wa \'alaa aali Muhammad.',
        translation: 'O Allah, send blessings upon Muhammad and upon the family of Muhammad.',
        translationMs: 'Ya Allah, selawatkanlah ke atas Muhammad dan ke atas keluarga Muhammad.',
        source: 'Hadith: "Antara rumahku dan mimbarku adalah taman daripada taman-taman syurga" (Sahih Al-Bukhari). Solat sunat dan perbanyakkan doa serta selawat di sini.',
      },
    ],
  },
];

export const siteCategories = [
  { id: 'masjid', name: 'Masjid al-Haram', nameArabic: 'المسجد الحرام' },
  { id: 'mashaer', name: 'Masyair (Arafat/Mina/Muzdalifah)', nameArabic: 'المشاعر' },
  { id: 'miqat', name: 'Miqat', nameArabic: 'الميقات' },
  { id: 'other', name: 'Lain-lain', nameArabic: 'أخرى' },
];
