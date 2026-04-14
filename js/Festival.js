// --- DARK MODE TOGGLE ---
function initDarkMode() {
  const themeToggle = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    htmlElement.classList.add("dark-mode");
  }

  // Toggle dark mode on button click
  themeToggle.addEventListener("click", () => {
    htmlElement.classList.toggle("dark-mode");
    const isDark = htmlElement.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

// --- LANGUAGE TRANSLATIONS ---
const translations = {
  en: {
    home: "Home",
    about: "About",
    festival: "Festival",
    cari_festival: "Search Festival",
    kuliner_makanan: "Food Culinary",
    cari_kuliner_makanan: "Search Food Culinary",
    tempat_wisata: "Tourist Places",
    cari_tempat_wisata: "Search Tourist Places",
    explore_now: "Explore Now",
    jelajahi_budaya_indonesia: "Explore Indonesian Culture",
    katalog_festival_budaya_pilihan: "Selected Cultural Festival Catalog",
  },
  id: {
    home: "Beranda",
    about: "Tentang",
    festival: "Festival",
    cari_festival: "Cari Festival",
    kuliner_makanan: "Kuliner Makanan",
    cari_kuliner_makanan: "Cari Kuliner Makanan",
    tempat_wisata: "Tempat Wisata",
    cari_tempat_wisata: "Cari tempat Wisata",
    explore_now: "Jelajahi Sekarang",
    jelajahi_budaya_indonesia: "Jelajahi Budaya Indonesia",
    katalog_festival_budaya_pilihan: "Katalog Festival Budaya Pilihan",
  },
};

let currentLanguage = localStorage.getItem("language") || "en";

function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem("language", lang);
  document.documentElement.lang = lang;

  // Update language button
  document.getElementById("lang-text").textContent = lang.toUpperCase();

  // Update all translatable elements
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
}

function initLanguage() {
  const langToggle = document.getElementById("lang-toggle");

  // Set initial language
  setLanguage(currentLanguage);

  // Toggle language on button click
  langToggle.addEventListener("click", () => {
    const newLang = currentLanguage === "en" ? "id" : "en";
    setLanguage(newLang);
  });
}

// --- SEARCH FUNCTIONALITY ---
function initSearchFunctionality() {
  const searchBtn = document.getElementById("search-btn");
  const closeSearch = document.getElementById("close-search");
  const searchContainer = document.getElementById("search-container");
  const searchInput = searchContainer.querySelector('input[type="text"]');
  const searchSuggestions = document.getElementById("search-suggestions");

  const cities = ["Jakarta", "Bandung", "Jogja", "Malang", "Bali"];

  // Festival and cultural content database
  const searchContent = {
    festivals: [
      // Bali festivals
      {
        city: "Bali",
        name: "Nyepi: Keheningan Suci",
        type: "Festival",
        description:
          "Sacred day of silence and purification - Hari Penyucian Jiwa & Alam",
      },
      {
        city: "Bali",
        name: "Pawai Ogoh-Ogoh",
        type: "Festival",
        description:
          "Spectacular parade with giant demon effigies - Malam Pengerupukan",
      },
      // Jogja festivals
      {
        city: "Jogja",
        name: "Sekaten & Grebeg",
        type: "Festival",
        description:
          "Tradisi Agung Keraton Yogyakarta dengan gamelan suci dan gunungan",
      },
      {
        city: "Jogja",
        name: "Jogja Java Carnival",
        type: "Festival",
        description:
          "Puncak Perayaan HUT Kota Yogyakarta - Night Carnival di Malioboro",
      },
      // Jakarta festivals
      {
        city: "Jakarta",
        name: "Jakarta Fair (PRJ)",
        type: "Festival",
        description:
          "Pameran & Hiburan Terbesar di Asia Tenggara - Pekan Raya Jakarta",
      },
      {
        city: "Jakarta",
        name: "Jakarta Fashion Week",
        type: "Festival",
        description: "Barometer Mode Terbesar di Asia Tenggara",
      },
      // Bandung festivals
      {
        city: "Bandung",
        name: "Asia Africa Festival",
        type: "Festival",
        description: "Merayakan Semangat Solidaritas Bangsa-Bangsa",
      },
      {
        city: "Bandung",
        name: "Pasar Seni ITB",
        type: "Festival",
        description: "Laboratorium Kreativitas Terbesar di Indonesia",
      },
      // Malang festivals
      {
        city: "Malang",
        name: "Jazz Gunung Bromo",
        type: "Festival",
        description:
          "Harmoni di Atas Awan - Musik jazz dengan latar Gunung Bromo",
      },
    ],
    cuisines: [
      {
        city: "Bali",
        name: "Babi Guling",
        type: "Cuisine",
        description: "Roasted suckling pig with traditional spices",
      },
      {
        city: "Jogja",
        name: "Gudeg",
        type: "Cuisine",
        description: "Young jackfruit cooked in coconut milk",
      },
      {
        city: "Jakarta",
        name: "Soto Betawi",
        type: "Cuisine",
        description: "Rich beef soup with unique Jakarta flavor",
      },
      {
        city: "Bandung",
        name: "Tahu Goreng",
        type: "Cuisine",
        description: "Fried tofu with traditional Sundanese seasoning",
      },
      {
        city: "Malang",
        name: "Ayam Goreng",
        type: "Cuisine",
        description: "Crispy fried chicken East Java style",
      },
    ],
  };

  function performSearch(query) {
    const lowerQuery = query.toLowerCase();
    const results = [];

    // Search festivals
    searchContent.festivals.forEach((festival) => {
      if (
        festival.name.toLowerCase().includes(lowerQuery) ||
        festival.city.toLowerCase().includes(lowerQuery) ||
        festival.description.toLowerCase().includes(lowerQuery)
      ) {
        results.push(festival);
      }
    });

    // Search cuisines
    searchContent.cuisines.forEach((cuisine) => {
      if (
        cuisine.name.toLowerCase().includes(lowerQuery) ||
        cuisine.city.toLowerCase().includes(lowerQuery) ||
        cuisine.description.toLowerCase().includes(lowerQuery)
      ) {
        results.push(cuisine);
      }
    });

    // Search cities
    const matchedCities = cities.filter((city) =>
      city.toLowerCase().includes(lowerQuery),
    );

    return { results, matchedCities };
  }

  searchBtn.addEventListener("click", () => {
    searchContainer.style.maxHeight = "600px";
    searchInput.focus();
  });

  closeSearch.addEventListener("click", () => {
    searchContainer.style.maxHeight = "0";
    searchInput.value = "";
    searchSuggestions.innerHTML = "";
  });

  // Real-time search functionality with enhanced content
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim();

    if (query.length === 0) {
      searchSuggestions.innerHTML = "";
      return;
    }

    const { results, matchedCities } = performSearch(query);
    searchSuggestions.innerHTML = "";

    // Display cities first
    if (matchedCities.length > 0) {
      matchedCities.forEach((city) => {
        const suggestionDiv = document.createElement("div");
        suggestionDiv.className =
          "px-4 py-3 rounded-lg bg-white/5 hover:bg-red-600/20 cursor-pointer transition-colors duration-200 border border-white/10 hover:border-red-500/50 mb-2";
        suggestionDiv.innerHTML = `<div class="flex items-center gap-2"><i class="fas fa-map-marker-alt text-red-600 text-lg"></i><div><span class="font-bold text-sm uppercase tracking-wider">${city}</span><span class="text-xs text-gray-500 ml-2">City</span></div></div>`;
        suggestionDiv.style.cursor = "pointer";
        suggestionDiv.onclick = () => {
          const btn = Array.from(document.querySelectorAll(".month-btn")).find(
            (b) => b.innerText.trim() === city,
          );
          if (btn) btn.click();
          searchInput.value = "";
          searchSuggestions.innerHTML = "";
          searchContainer.style.maxHeight = "0";
        };
        searchSuggestions.appendChild(suggestionDiv);
      });

      // Add separator if there are other results
      if (results.length > 0) {
        const separator = document.createElement("div");
        separator.className = "my-2 border-t border-white/10";
        searchSuggestions.appendChild(separator);
      }
    }

    // Display festival and cuisine results
    if (results.length > 0) {
      results.forEach((result) => {
        const resultDiv = document.createElement("div");
        resultDiv.className =
          "px-4 py-3 rounded-lg bg-gradient-to-r from-white/5 to-red-600/5 hover:from-white/10 hover:to-red-600/10 cursor-pointer transition-all duration-200 border border-white/10 hover:border-red-500/50 mb-2";

        const iconClass =
          result.type === "Festival" ? "fa-calendar" : "fa-utensils";
        const typeColor =
          result.type === "Festival" ? "text-red-500" : "text-orange-500";

        resultDiv.innerHTML = `
          <div class="flex items-start gap-3">
            <i class="fas ${iconClass} ${typeColor} text-lg mt-1 flex-shrink-0"></i>
            <div class="flex-grow">
              <div class="flex items-center gap-2">
                <span class="font-bold text-sm">${result.name}</span>
                <span class="text-xs px-2 py-1 bg-red-600/20 text-red-400 rounded-full">${result.type}</span>
              </div>
              <span class="text-xs text-gray-500">${result.city}</span>
              <p class="text-xs text-gray-400 mt-1">${result.description}</p>
            </div>
          </div>
        `;

        resultDiv.onclick = () => {
          if (result.type === "Festival") {
            // Navigate to same festival article on this page
            window.location.href = `Festival.html?city=${result.city}&festival=${encodeURIComponent(result.name)}`;
          }
          searchInput.value = "";
          searchSuggestions.innerHTML = "";
          searchContainer.style.maxHeight = "0";
        };

        searchSuggestions.appendChild(resultDiv);
      });
    } else if (matchedCities.length === 0) {
      const noResultDiv = document.createElement("div");
      noResultDiv.className = "px-4 py-3 text-gray-600 text-sm";
      noResultDiv.innerHTML = `
        <div class="flex items-center gap-2">
          <i class="fas fa-search text-gray-500"></i>
          <span>Try searching for: Nyepi, Sekaten, Jakarta Fair, Gudeg...</span>
        </div>
      `;
      searchSuggestions.appendChild(noResultDiv);
    }
  });

  // Search on Enter key
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim().toLowerCase();
      const matchedCity = cities.find((city) => city.toLowerCase() === query);

      if (matchedCity) {
        const btn = Array.from(document.querySelectorAll(".month-btn")).find(
          (b) => b.innerText.trim() === matchedCity,
        );
        if (btn) btn.click();
      }
    }
  });
}

// Initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initDarkMode();
    initLanguage();
    initSearchFunctionality();
  });
} else {
  initDarkMode();
  initLanguage();
  initSearchFunctionality();
}

// Festival
const cityData = {
  Bali: {
    bg: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=2000",
    desc: "Negeri seribu pura yang menyimpan keajaiban spiritual di setiap sudut jalannya.",
    festivals: [
      {
        name: "Nyepi: Keheningan Suci",
        img: "https://www.rukita.co/stories/wp-content/uploads/2022/03/ide-ucapan-hari-raya-nyepi-2022.jpeg",
        article: `
                 <div class="p-12">
                    <h1 class="text-5xl font-black text-red-600 mb-8 tracking-tighter uppercase italic">Nyepi: Hari Penyucian Jiwa & Alam</h1>
                    <img src="https://www.rukita.co/stories/wp-content/uploads/2022/03/ide-ucapan-hari-raya-nyepi-2022.jpeg" class="w-full h-[400px] object-cover rounded-3xl mb-10">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h2 class="text-2xl font-bold mb-4">Seni yang Membara</h2>
                            <p class="text-gray-400 mb-6">Ogoh-ogoh adalah karya seni patung dalam kebudayaan Bali yang menggambarkan kepribadian Bhuta Kala (unsur negatif). Dibuat dengan bambu, kertas, dan styrofoam, patung ini bisa mencapai tinggi 5 meter lebih.</p>
                            <p class="text-gray-400">Ritual ini dilakukan tepat satu hari sebelum Nyepi. Ribuan pemuda akan memikul struktur ini sambil berputar-putar di persimpangan jalan dengan iringan musik Gamelan Balaganjur yang sangat dinamis.</p>
                        </div>
                        <div class="space-y-4">
                            <div class="border-l-4 border-red-600 pl-6">
                                <h3 class="font-bold italic">Simbol Pembakaran</h3>
                                <p class="text-sm text-gray-400 italic">"Di akhir pawai, Ogoh-ogoh akan dibakar sebagai simbol pemusnahan sifat-sifat buruk manusia sebelum memasuki hari keheningan."</p>
                            </div>
                        </div>
                    </div>
                </div>
              `,
      },
      {
        name: "Pawai Ogoh-Ogoh",
        img: "https://tse3.mm.bing.net/th/id/OIP.SdT0ZelXYUQF0QwEl4QB7wHaE7?pid=Api&h=220&P=0",
        article: `
                <div class="p-12">
                    <h1 class="text-5xl font-black text-red-600 mb-8 tracking-tighter uppercase italic">Malam Pengerupukan: Ogoh-Ogoh</h1>
                    <img src="https://tse3.mm.bing.net/th/id/OIP.SdT0ZelXYUQF0QwEl4QB7wHaE7?pid=Api&h=220&P=0" class="w-full h-[400px] object-cover rounded-3xl mb-10">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h2 class="text-2xl font-bold mb-4">Seni yang Membara</h2>
                            <p class="text-gray-400 mb-6">Ogoh-ogoh adalah karya seni patung dalam kebudayaan Bali yang menggambarkan kepribadian Bhuta Kala (unsur negatif). Dibuat dengan bambu, kertas, dan styrofoam, patung ini bisa mencapai tinggi 5 meter lebih.</p>
                            <p class="text-gray-400">Ritual ini dilakukan tepat satu hari sebelum Nyepi. Ribuan pemuda akan memikul struktur ini sambil berputar-putar di persimpangan jalan dengan iringan musik Gamelan Balaganjur yang sangat dinamis.</p>
                        </div>
                        <div class="space-y-4">
                            <div class="border-l-4 border-red-600 pl-6">
                                <h3 class="font-bold italic">Simbol Pembakaran</h3>
                                <p class="text-sm text-gray-400 italic">"Di akhir pawai, Ogoh-ogoh akan dibakar sebagai simbol pemusnahan sifat-sifat buruk manusia sebelum memasuki hari keheningan."</p>
                            </div>
                        </div>
                    </div>
                </div>
              `,
      },
    ],
  },
  Jogja: {
    bg: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&q=80&w=2000",
    desc: "Pusat peradaban Jawa yang menjaga tradisi luhur di tengah gempuran modernitas.",
    festivals: [
      {
        name: "Sekaten & Grebeg",
        img: "https://helloindonesia.id/wp-content/uploads/2025/09/Sekaten-Yogyakarta-1536x838.jpg",
        article: `
                <div class="p-12">
                    <h1 class="text-5xl font-black text-white mb-4 italic tracking-tighter">Grebeg Muludan & Sekaten</h1>
                    <p class="text-red-600 font-bold mb-8 tracking-widest uppercase">Tradisi Agung Keraton Yogyakarta</p>
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
                        <img src="https://helloindonesia.id/wp-content/uploads/2025/09/Sekaten-Yogyakarta-1536x838.jpg" class="rounded-3xl shadow-2xl h-full object-cover">
                        <div class="space-y-6">
                            <h3 class="text-2xl font-bold border-b border-red-600 pb-2 w-fit">Sejarah Sekaten</h3>
                            <p class="text-gray-400">Istilah Sekaten berasal dari kata 'Syahadatain' (dua kalimat syahadat). Tradisi ini bermula sebagai cara dakwah Sunan Kalijaga untuk menyebarkan agama Islam melalui musik Gamelan Kyai Guntur Madu dan Kyai Guntur Sari.</p>
                            <p class="text-gray-400">Selama 7 hari, gamelan suci dimainkan nonstop di Masjid Gede Kauman, mengundang ribuan masyarakat untuk mendengarkan sambil menikmati sajian kuliner Nasi Gurih.</p>
                        </div>
                    </div>
                    <div class="bg-zinc-900 p-10 rounded-3xl border border-white/5">
                        <h3 class="text-2xl font-bold mb-6 italic text-center text-red-500">Filosofi Gunungan</h3>
                        <p class="text-center max-w-3xl mx-auto text-gray-300 mb-8">Gunungan adalah struktur raksasa berisi hasil bumi seperti kacang panjang, cabai, dan aneka kue. Ini melambangkan kemakmuran dan sedekah Sultan kepada rakyatnya.</p>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-xs text-gray-400">
                            <div class="p-4 bg-black/30 rounded-xl"><strong>Gunungan Kakung:</strong> Berbentuk kerucut, simbol laki-laki dan ketegasan.</div>
                            <div class="p-4 bg-black/30 rounded-xl"><strong>Gunungan Estri:</strong> Berbentuk payung melebar, simbol wanita dan perlindungan.</div>
                            <div class="p-4 bg-black/30 rounded-xl"><strong>Rayahan:</strong> Tradisi warga memperebutkan isi gunungan yang dipercaya membawa berkah melimpah.</div>
                        </div>
                    </div>
                </div>
              `,
      },
      {
        name: "Jogja Java Carnival",
        img: "https://tse2.mm.bing.net/th/id/OIP.kr83mrwvhCLNHkIK8gwB4gHaE6?pid=Api&h=220&P=0",
        article: `
    <div class="relative ">
        <img src="https://tse2.mm.bing.net/th/id/OIP.kr83mrwvhCLNHkIK8gwB4gHaE6?pid=Api&h=220&P=0" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent flex flex-col justify-end p-12">
            <span class="bg-red-600 text-white px-4 py-1 text-xs font-bold w-fit mb-4 uppercase tracking-widest">Modern Heritage</span>
            <h1 class="text-5xl font-black mb-2 uppercase italic tracking-tighter">Jogja Java Carnival</h1>
            <p class="text-red-500 font-bold tracking-widest uppercase">Puncak Perayaan HUT Kota Yogyakarta</p>
        </div>
    </div>

    <div class="p-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div class="lg:col-span-2">
                <h2 class="text-2xl font-bold text-white mb-6 border-b border-red-600 pb-2 w-fit">Karnaval Cahaya & Budaya</h2>
                <p class="text-lg text-gray-400 leading-relaxed mb-8">
                    Jogja Java Carnival (JJC) adalah event tahunan berskala internasional yang diselenggarakan untuk memperingati hari jadi Kota Yogyakarta. Berbeda dengan upacara adat tradisional, JJC hadir sebagai **Street Magician Carnival** yang menggabungkan unsur seni kontemporer, teknologi cahaya, dan akar budaya Jawa.
                </p>
                
                <h2 class="text-2xl font-bold text-white mb-6">Keunikan Festival</h2>
                <div class="space-y-4 mb-10">
                    <div class="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h4 class="text-red-500 font-black mb-1 italic">1. NIGHT CARNIVAL</h4>
                        <p class="text-sm text-gray-400">Dilakukan pada malam hari sepanjang jalan Malioboro, menonjolkan permainan lampu LED dan efek visual pada setiap kendaraan hias.</p>
                    </div>
                    <div class="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h4 class="text-red-500 font-black mb-1 italic">2. MULTIKULTURALISME</h4>
                        <p class="text-sm text-gray-400">Menampilkan peserta tidak hanya dari Jawa, tapi juga mancanegara yang berkolaborasi dengan seniman lokal Jogja.</p>
                    </div>
                    <div class="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h4 class="text-red-500 font-black mb-1 italic">3. THEME-BASED COSTUMES</h4>
                        <p class="text-sm text-gray-400">Setiap tahun memiliki tema berbeda, mulai dari filosofi air, api, hingga sejarah kejayaan kerajaan Nusantara.</p>
                    </div>
                </div>
            </div>

            <div class="space-y-6">
                <div class="bg-zinc-900 p-8 rounded-3xl border border-white/10 shadow-xl">
                    <h3 class="font-bold text-xl mb-4 italic border-l-4 border-red-600 pl-4">Info Pengunjung</h3>
                    <ul class="space-y-4 text-sm text-gray-400">
                        <li class="flex items-start gap-3">
                            <i class="fas fa-map-marker-alt text-red-600 mt-1"></i>
                            <span><strong>Rute:</strong> Start dari Taman Parkir Abu Bakar Ali menuju Alun-Alun Utara.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <i class="fas fa-clock text-red-600 mt-1"></i>
                            <span><strong>Waktu:</strong> Biasanya dimulai pukul 19.00 WIB hingga tengah malam.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <i class="fas fa-ticket-alt text-red-600 mt-1"></i>
                            <span><strong>Tiket:</strong> Gratis untuk umum di sepanjang trotoar Malioboro.</span>
                        </li>
                    </ul>
                </div>
                
                <div class="bg-red-600/10 p-6 rounded-3xl border border-red-600/20">
                    <p class="text-xs italic text-gray-400">"Pastikan datang 3 jam lebih awal untuk mendapatkan posisi berdiri paling depan di pagar pembatas jalan."</p>
                </div>
            </div>
        </div>
    </div>
  `,
      },
    ],
  },
  Jakarta: {
    bg: "https://travelinkmagz.com/wp-content/uploads/2020/04/JKT_Monas_1920x1080px_1.jpg",
    desc: "Kota metropolitan yang tidak pernah tidur, meleburkan tradisi Betawi dengan gaya hidup modern.",
    festivals: [
      {
        name: "Jakarta Fair (PRJ)",
        img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600",
        article: `
    <div class="relative">
        <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent flex flex-col justify-end p-12">
            <span class="bg-red-600 text-white px-4 py-1 text-xs font-bold w-fit mb-4 uppercase tracking-widest">Mega Exhibition</span>
            <h1 class="text-5xl font-black mb-2 uppercase italic tracking-tighter">Jakarta Fair Kemayoran</h1>
            <p class="text-red-500 font-bold tracking-widest uppercase">Pameran & Hiburan Terbesar di Asia Tenggara</p>
        </div>
    </div>

    <div class="p-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div class="lg:col-span-2">
                <h2 class="text-2xl font-bold text-white mb-6 border-b border-red-600 pb-2 w-fit">Sejarah & Tradisi Kota</h2>
                <p class="text-lg text-gray-400 leading-relaxed mb-8">
                    Jakarta Fair atau Pekan Raya Jakarta (PRJ) pertama kali digelar pada tahun 1968 di kawasan Monas. Kini, PRJ telah bertransformasi menjadi pameran multiproduk terbesar yang diselenggarakan selama 30-40 hari untuk merayakan hari ulang tahun kota Jakarta. Event ini adalah perpaduan antara pusat belanja, festival kuliner, dan panggung hiburan rakyat.
                </p>
                
                <h2 class="text-2xl font-bold text-white mb-6">Pilar Utama Jakarta Fair</h2>
                <div class="space-y-4 mb-10">
                    <div class="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h4 class="text-red-500 font-black mb-1 italic">1. KONSER MUSIK NON-STOP</h4>
                        <p class="text-sm text-gray-400">Menghadirkan musisi papan atas Indonesia setiap malamnya di panggung utama selama lebih dari satu bulan penuh.</p>
                    </div>
                    <div class="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h4 class="text-red-500 font-black mb-1 italic">2. SURGA KULINER BETAWI</h4>
                        <p class="text-sm text-gray-400">Tempat terbaik untuk menemukan kuliner otentik seperti Kerak Telor, Dodol Betawi, dan Bir Pletok di area Kampung Betawi.</p>
                    </div>
                    <div class="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h4 class="text-red-500 font-black mb-1 italic">3. PASAR MALAM MODERN</h4>
                        <p class="text-sm text-gray-400">Dari wahana permainan kora-kora hingga diskon besar-besaran produk elektronik, otomotif, dan fashion terbaru.</p>
                    </div>
                </div>
            </div>

            <div class="space-y-6">
                <div class="bg-zinc-900 p-8 rounded-3xl border border-white/10 shadow-xl">
                    <h3 class="font-bold text-xl mb-4 italic border-l-4 border-red-600 pl-4">Panduan Pengunjung</h3>
                    <ul class="space-y-4 text-sm text-gray-400">
                        <li class="flex items-start gap-3">
                            <i class="fas fa-map-marker-alt text-red-600 mt-1"></i>
                            <span><strong>Lokasi:</strong> Arena JIExpo Kemayoran, Jakarta Pusat.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <i class="fas fa-clock text-red-600 mt-1"></i>
                            <span><strong>Jadwal:</strong> Biasanya bulan Juni hingga Juli (HUT Jakarta).</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <i class="fas fa-bus text-red-600 mt-1"></i>
                            <span><strong>Akses:</strong> Gunakan TransJakarta rute khusus PRJ untuk menghindari macet.</span>
                        </li>
                    </ul>
                </div>
                
                <div class="bg-red-600/10 p-6 rounded-3xl border border-red-600/20">
                    <p class="text-xs italic text-gray-400">"Beli tiket secara online jauh-jauh hari untuk menghindari antrean panjang di loket fisik yang bisa memakan waktu berjam-jam."</p>
                </div>
            </div>
        </div>
    </div>
  `,
      },
      {
        name: "Jakarta Fashion Week",
        img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200",
        article: `
    <div class="relative  ">
        <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent flex flex-col justify-end p-12">
            <span class="bg-red-600 text-white px-4 py-1 text-xs font-bold w-fit mb-4 uppercase tracking-widest">Global Fashion Hub</span>
            <h1 class="text-5xl font-black mb-2 uppercase italic tracking-tighter">Jakarta Fashion Week</h1>
            <p class="text-red-500 font-bold tracking-widest uppercase">Barometer Mode Terbesar di Asia Tenggara</p>
        </div>
    </div>

    <div class="p-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div class="lg:col-span-2">
                <h2 class="text-2xl font-bold text-white mb-6 border-b border-red-600 pb-2 w-fit">Eksplorasi Kreativitas Tanpa Batas</h2>
                <p class="text-lg text-gray-400 leading-relaxed mb-8">
                    Jakarta Fashion Week (JFW) bukan sekadar peragaan busana; ini adalah platform penggerak industri kreatif Indonesia menuju panggung dunia. Sejak pertama kali digelar, JFW telah menjadi rumah bagi ratusan desainer lokal dan internasional untuk memamerkan tren terbaru, mulai dari busana siap pakai (ready-to-wear) hingga mahakarya adibusana (haute couture) yang memadukan kain tradisional dengan potongan modern.
                </p>
                
                <h2 class="text-2xl font-bold text-white mb-6">Pilar Utama JFW</h2>
                <div class="space-y-4 mb-10">
                    <div class="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h4 class="text-red-600 font-black mb-1 italic">1. THE RUNWAY SHOWS</h4>
                        <p class="text-sm text-gray-400">Panggung prestisius di mana desainer ternama hingga talenta muda berbakat meluncurkan koleksi musim depan di hadapan media dan pembeli global.</p>
                    </div>
                    <div class="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h4 class="text-red-600 font-black mb-1 italic">2. FASHION FORWARD</h4>
                        <p class="text-sm text-gray-400">Program inkubasi desainer yang berkolaborasi dengan sekolah mode internasional untuk memastikan standar kualitas dunia pada karya anak bangsa.</p>
                    </div>
                    <div class="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h4 class="text-red-600 font-black mb-1 italic">3. SUSTAINABLE FASHION</h4>
                        <p class="text-sm text-gray-400">Komitmen kuat dalam mempromosikan mode berkelanjutan yang ramah lingkungan dan mendukung pemberdayaan pengrajin kain tradisional.</p>
                    </div>
                </div>
            </div>

            <div class="space-y-6">
                <div class="bg-zinc-900 p-8 rounded-3xl border border-white/10 shadow-xl">
                    <h3 class="font-bold text-xl mb-4 italic border-l-4 border-red-600 pl-4">Panduan Pengunjung</h3>
                    <ul class="space-y-4 text-sm text-gray-400">
                        <li class="flex items-start gap-3">
                            <i class="fas fa-calendar-alt text-red-600 mt-1"></i>
                            <span><strong>Waktu:</strong> Biasanya diadakan setiap bulan Oktober setiap tahunnya.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <i class="fas fa-map-pin text-red-600 mt-1"></i>
                            <span><strong>Lokasi:</strong> Berpindah lokasi antar mal premium Jakarta (seperti City Hall Pondok Indah Mall 3).</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <i class="fas fa-camera text-red-600 mt-1"></i>
                            <span><strong>Dress Code:</strong> "Street Style" atau "Smart Casual" sangat disarankan jika ingin masuk ke area festival.</span>
                        </li>
                    </ul>
                </div>
                
                <div class="bg-red-600/10 p-6 rounded-3xl border border-red-600/20">
                    <p class="text-xs italic text-gray-400">"Meskipun beberapa show bersifat eksklusif (undangan), area festival biasanya terbuka untuk umum dengan registrasi online terlebih dahulu."</p>
                </div>
            </div>
        </div>
    </div>
  `,
      },
    ],
  },
  Bandung: {
    bg: "https://idetrips.com/wp-content/uploads/2020/07/kawah-ratu-tangkuban-parahu.jpg",
    desc: "Kota kreatif di dataran tinggi yang merayakan sejarah dengan gaya artistik.",
    festivals: [
      {
        name: "Asia Africa Festival",
        img: "https://i.ytimg.com/vi/jHFqvGg3qao/maxresdefault.jpg",
        article: `
            <div class="relative ">
                <img src="https://i.ytimg.com/vi/jHFqvGg3qao/maxresdefault.jpg" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent flex flex-col justify-end p-12">
                    <span class="bg-red-600 text-white px-4 py-1 text-xs font-bold w-fit mb-4 uppercase tracking-widest">Historical World Event</span>
                    <h1 class="text-5xl font-black mb-2 uppercase italic tracking-tighter">Asia Africa Festival</h1>
                    <p class="text-red-500 font-bold tracking-widest uppercase">Merayakan Semangat Solidaritas Bangsa-Bangsa</p>
                </div>
            </div>

            <div class="p-12">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div class="lg:col-span-2">
                        <h2 class="text-2xl font-bold text-white mb-6 border-b border-red-600 pb-2 w-fit">Sejarah & Semangat Dasasila Bandung</h2>
                        <p class="text-lg text-gray-400 leading-relaxed mb-8">
                            Asia Africa Festival (AAF) adalah peringatan tahunan atas peristiwa bersejarah Konferensi Tingkat Tinggi Asia-Afrika tahun 1955. Festival ini mengubah Jalan Asia Afrika di Bandung menjadi panggung budaya kolosal yang menyatukan delegasi dari berbagai negara. Lebih dari sekadar parade, acara ini adalah pengingat akan "Spirit of Bandung" yang menyuarakan perdamaian dunia dan kemerdekaan bangsa-bangsa.
                        </p>
                        
                        <h2 class="text-2xl font-bold text-white mb-6">Atraksi Utama Festival</h2>
                        <div class="space-y-4 mb-10">
                            <div class="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <h4 class="text-red-500 font-black mb-1 italic">1. HISTORICAL WALK</h4>
                                <p class="text-sm text-gray-400">Prosesi jalan kaki para delegasi negara sahabat dari Hotel Homann menuju Gedung Merdeka, merekonstruksi langkah para pemimpin besar dunia di tahun 1955.</p>
                            </div>
                            <div class="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <h4 class="text-red-500 font-black mb-1 italic">2. CULTURAL PARADE</h4>
                                <p class="text-sm text-gray-400">Pertunjukan kostum tradisional, musik, dan tarian dari berbagai negara di Asia dan Afrika yang berparade di sepanjang jalanan kota Bandung.</p>
                            </div>
                            <div class="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <h4 class="text-red-500 font-black mb-1 italic">3. ANKLUNG MASSAL</h4>
                                <p class="text-sm text-gray-400">Ribuan partisipan memainkan angklung secara bersamaan, menciptakan harmoni suara yang memecahkan rekor sebagai simbol kebersamaan.</p>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <div class="bg-zinc-900 p-8 rounded-3xl border border-white/10 shadow-xl">
                            <h3 class="font-bold text-xl mb-4 italic border-l-4 border-red-600 pl-4">Panduan Pengunjung</h3>
                            <ul class="space-y-4 text-sm text-gray-400">
                                <li class="flex items-start gap-3">
                                    <i class="fas fa-landmark text-red-600 mt-1"></i>
                                    <span><strong>Lokasi:</strong> Sepanjang Jalan Asia Afrika dan Jalan Braga, Kota Bandung.</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <i class="fas fa-calendar-check text-red-600 mt-1"></i>
                                    <span><strong>Waktu:</strong> Biasanya diadakan sekitar bulan April hingga Mei (berdekatan dengan tanggal KAA).</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <i class="fas fa-walking text-red-600 mt-1"></i>
                                    <span><strong>Akses:</strong> Kawasan akan menjadi area bebas kendaraan (Car Free Day), disarankan jalan kaki.</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div class="bg-red-600/10 p-6 rounded-3xl border border-red-600/20">
                            <p class="text-xs italic text-gray-400">"Pastikan mengunjungi Museum Konferensi Asia Afrika di sela-sela festival untuk memahami konteks sejarah yang lebih mendalam."</p>
                        </div>
                    </div>
                </div>
            </div>
          `,
      },
      {
        name: "Pasar Seni ITB",
        img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200",
        article: `
    <div class="relative">
        <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent flex flex-col justify-end p-12">
            <span class="bg-red-600 text-white px-4 py-1 text-xs font-bold w-fit mb-4 uppercase tracking-widest">Contemporary Art Festival</span>
            <h1 class="text-5xl font-black mb-2 uppercase italic tracking-tighter">Pasar Seni ITB</h1>
            <p class="text-red-500 font-bold tracking-widest uppercase">Laboratorium Kreativitas Terbesar di Indonesia</p>
        </div>
    </div>

    <div class="p-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div class="lg:col-span-2">
                <h2 class="text-2xl font-bold text-white mb-6 border-b border-red-600 pb-2 w-fit">Dekat dengan Seni, Jauh dari Sekadar Pasar</h2>
                <p class="text-lg text-gray-400 leading-relaxed mb-8">
                    Pasar Seni ITB adalah ajang seni rupa satu hari paling prestisius di Indonesia yang diadakan oleh mahasiswa Fakultas Seni Rupa dan Desain (FSRD) ITB. Sejak pertama kali digagas pada tahun 1972 oleh seniman legendaris A.D. Pirous, event ini bertujuan untuk mendekatkan karya seni kepada masyarakat luas. Bukan sekadar tempat jual beli, Pasar Seni adalah sebuah instalasi raksasa yang mengubah seluruh kampus ITB menjadi galeri terbuka penuh eksperimen visual yang berani.
                </p>
                
                <h2 class="text-2xl font-bold text-white mb-6">Elemen Unik Pasar Seni</h2>
                <div class="space-y-4 mb-10">
                    <div class="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h4 class="text-red-500 font-black mb-1 italic">1. EXPERIMENTAL INSTALLATION</h4>
                        <p class="text-sm text-gray-400">Instalasi seni interaktif yang tersebar di sepanjang kampus, menantang persepsi pengunjung melalui perpaduan teknologi, material unik, dan kritik sosial.</p>
                    </div>
                    <div class="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h4 class="text-red-500 font-black mb-1 italic">2. ART MARKET & CRAFT</h4>
                        <p class="text-sm text-gray-400">Ratusan stan yang menjual karya seni orisinal, mulai dari lukisan, patung, hingga produk desain kriya buatan mahasiswa dan seniman profesional.</p>
                    </div>
                    <div class="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h4 class="text-red-500 font-black mb-1 italic">3. PERFORMANCE ART</h4>
                        <p class="text-sm text-gray-400">Aksi teatrikal dan seni pertunjukan yang tidak terduga, seringkali melibatkan interaksi langsung dengan pengunjung di area publik.</p>
                    </div>
                </div>
            </div>

            <div class="space-y-6">
                <div class="bg-zinc-900 p-8 rounded-3xl border border-white/10 shadow-xl">
                    <h3 class="font-bold text-xl mb-4 italic border-l-4 border-red-600 pl-4">Panduan Pengunjung</h3>
                    <ul class="space-y-4 text-sm text-gray-400">
                        <li class="flex items-start gap-3">
                            <i class="fas fa-university text-red-600 mt-1"></i>
                            <span><strong>Lokasi:</strong> Kampus Ganesha ITB, Jl. Ganesha No. 10, Bandung.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <i class="fas fa-hourglass-half text-red-600 mt-1"></i>
                            <span><strong>Waktu:</strong> Event ini langka, biasanya diadakan setiap 4 atau 5 tahun sekali (selebrasi lustrum).</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <i class="fas fa-palette text-red-600 mt-1"></i>
                            <span><strong>Target:</strong> Pecinta seni, kolektor, mahasiswa, hingga keluarga yang ingin berwisata edukasi.</span>
                        </li>
                    </ul>
                </div>
                
                <div class="bg-red-600/10 p-6 rounded-3xl border border-red-600/20">
                    <p class="text-xs italic text-gray-400">"Karena keramaian yang luar biasa, disarankan menggunakan pakaian santai namun tetap bergaya (art-sy) dan siap-siap berjalan kaki mengeksplorasi seluruh sudut kampus."</p>
                </div>
            </div>
        </div>
    </div>
  `,
      },
    ],
  },
  Malang: {
    bg: "https://www.bugbog.com/wp-content/uploads/2022/05/dc76a908affc27f2/mount-bromo.jpeg",
    desc: "Kota apel dengan sejuta karnaval warisan leluhur dan kreativitas anak muda.",
    festivals: [
      {
        name: "Jazz Gunung Bromo",
        img: "https://bromomalangtour.com/wp-content/uploads/2016/04/Jazz-Gunung.jpg",
        article: `
                        <div class="p-12">
                            <h1 class="text-5xl font-black text-red-500 mb-8 italic uppercase tracking-tighter">Jazz Gunung Bromo</h1>
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div class="space-y-6">
                                    <h2 class="text-2xl font-bold text-white">Harmoni di Atas Awan</h2>
                                    <p class="text-gray-400 text-lg">Merasakan dentuman musik jazz dalam dekapan suhu 10 derajat Celcius. Inilah pengalaman musik paling unik di Indonesia. Jazz Gunung menawarkan panggung amfiteater terbuka dengan latar pegunungan Tengger yang mistis.</p>
                                    <div class="p-6 bg-zinc-900 rounded-3xl border border-red-600/30">
                                        <h4 class="font-bold mb-2 text-white italic">Fakta Menarik:</h4>
                                        <p class="text-sm text-gray-400 italic">Musisi dunia seringkali harus berhenti sejenak karena embun yang terlalu tebal, namun itulah keindahan yang dicari para penikmatnya.</p>
                                    </div>
                                </div>
                                <div class="space-y-4">
                                    <img src="https://bromomalangtour.com/wp-content/uploads/2016/04/Jazz-Gunung.jpg" class="rounded-3xl shadow-xl w-full h-80 object-cover">
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="bg-white/5 p-4 rounded-2xl text-center"><h5 class="text-red-500 font-bold">2.000m</h5><p class="text-[10px] uppercase">Ketinggian (MDPL)</p></div>
                                        <div class="bg-white/5 p-4 rounded-2xl text-center"><h5 class="text-red-500 font-bold">Kraton</h5><p class="text-[10px] uppercase">Lokasi Amfiteater</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `,
      },
    ],
  },
};

// FUNGSI LOGIKA UTAMA
function changeCity(city, btn) {
  const data = cityData[city];
  if (!data) return;

  // Update Hero
  document.getElementById("hero-section").style.backgroundImage =
    `url('${data.bg}')`;
  document.getElementById("place-name").innerText = city;
  document.getElementById("place-desc").innerText = data.desc;

  // Update Button Active
  document
    .querySelectorAll(".month-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  // Open Festival List Overlay
  openOverlay(city, data.festivals);
}

function openOverlay(city, festivals) {
  const overlay = document.getElementById("festival-overlay");
  const list = document.getElementById("festival-list");
  document.getElementById("overlay-city-title").innerText = city;

  list.innerHTML = "";
  festivals.forEach((f, index) => {
    list.innerHTML += `
            <div onclick="showArticle('${city}', ${index})" class="festival-card animate-card" style="animation-delay: ${index * 0.15}s">
                <img src="${f.img}" alt="${f.name}" />
                <div class="festival-card-content">
                    <h3>${f.name}</h3>
                    <p>Discover the fascinating story and traditions behind this festival</p>
                    <button class="read-more-btn">
                        <span>Read Article</span>
                        <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </div>`;
  });

  overlay.classList.remove("hidden");
  overlay.classList.add("flex");
  document.body.classList.add("overflow-hidden");
}

function showArticle(city, index) {
  const festival = cityData[city].festivals[index];
  const modal = document.getElementById("article-modal");
  const content = document.getElementById("article-content");
  content.innerHTML = festival.article;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeArticle() {
  document.getElementById("article-modal").classList.add("hidden");
}
function closeOverlay() {
  document.getElementById("festival-overlay").classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

// Dropdown Logic
document.querySelectorAll(".dropdown-btn").forEach((btn) => {
  btn.onclick = (e) => {
    e.stopPropagation();
    btn.nextElementSibling.classList.toggle("show");
  };
});
window.onclick = () =>
  document
    .querySelectorAll(".dropdown-menu")
    .forEach((m) => m.classList.remove("show"));

// Handle URL parameters for search results
window.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const searchCity = urlParams.get("city");
  const searchFestival = urlParams.get("festival");

  if (searchCity && cityData[searchCity]) {
    // Directly open the city overlay
    openOverlay(searchCity, cityData[searchCity].festivals);

    // Update the hero section
    const data = cityData[searchCity];
    document.getElementById("hero-section").style.backgroundImage =
      `url('${data.bg}')`;
    document.getElementById("place-name").innerText = searchCity;
    document.getElementById("place-desc").innerText = data.desc;

    // Update active button
    document.querySelectorAll(".month-btn").forEach((btn) => {
      btn.classList.remove("active");
      if (btn.innerText.trim() === searchCity) {
        btn.classList.add("active");
      }
    });

    // Auto-open specific festival article if provided
    if (searchFestival) {
      const festivalIndex = cityData[searchCity].festivals.findIndex(
        (f) => f.name === decodeURIComponent(searchFestival),
      );

      if (festivalIndex !== -1) {
        setTimeout(() => {
          showArticle(searchCity, festivalIndex);
        }, 300); // Delay to ensure overlay is rendered
      }
    }
  }
});

const searchBtn = document.getElementById("search-btn");
const closeSearch = document.getElementById("close-search");
const searchContainer = document.getElementById("search-container");
const searchInput = searchContainer.querySelector('input[type="text"]');
const searchSuggestions = document.getElementById("search-suggestions");

const cities = ["Jakarta", "Bandung", "Jogja", "Malang", "Bali"];

// Festival and cultural content database
const searchContent = {
  festivals: [
    // Bali festivals
    { city: "Bali", name: "Nyepi: Keheningan Suci", type: "Festival", description: "Sacred day of silence and purification - Hari Penyucian Jiwa & Alam" },
    { city: "Bali", name: "Pawai Ogoh-Ogoh", type: "Festival", description: "Spectacular parade with giant demon effigies - Malam Pengerupukan" },
    // Jogja festivals
    { city: "Jogja", name: "Sekaten & Grebeg", type: "Festival", description: "Tradisi Agung Keraton Yogyakarta dengan gamelan suci dan gunungan" },
    { city: "Jogja", name: "Jogja Java Carnival", type: "Festival", description: "Puncak Perayaan HUT Kota Yogyakarta - Night Carnival di Malioboro" },
    // Jakarta festivals
    { city: "Jakarta", name: "Jakarta Fair (PRJ)", type: "Festival", description: "Pameran & Hiburan Terbesar di Asia Tenggara - Pekan Raya Jakarta" }
  ]
};

function performSearch(query) {
  const lowerQuery = query.toLowerCase();
  const results = [];

  // Search festivals
  searchContent.festivals.forEach(festival => {
    if (festival.name.toLowerCase().includes(lowerQuery) || 
        festival.city.toLowerCase().includes(lowerQuery) ||
        festival.description.toLowerCase().includes(lowerQuery)) {
      results.push(festival);
    }
  });

  // Search cities
  const matchedCities = cities.filter(city => 
    city.toLowerCase().includes(lowerQuery)
  );

  return { results, matchedCities };
}

searchBtn.addEventListener('click', () => {
  searchContainer.style.maxHeight = "600px";
  searchInput.focus();
});

closeSearch.addEventListener('click', () => {
  searchContainer.style.maxHeight = "0";
  searchInput.value = "";
  searchSuggestions.innerHTML = "";
});

// Real-time search functionality with enhanced content
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.trim();
  
  if (query.length === 0) {
    searchSuggestions.innerHTML = "";
    return;
  }
  
  const { results, matchedCities } = performSearch(query);
  searchSuggestions.innerHTML = "";

  // Display cities first
  if (matchedCities.length > 0) {
    matchedCities.forEach(city => {
      const suggestionDiv = document.createElement("div");
      suggestionDiv.className = "px-4 py-3 rounded-lg bg-white/5 hover:bg-red-600/20 cursor-pointer transition-colors duration-200 border border-white/10 hover:border-red-500/50 mb-2";
      suggestionDiv.innerHTML = `<div class="flex items-center gap-2"><i class="fas fa-map-marker-alt text-red-600 text-lg"></i><div><span class="font-bold text-sm uppercase tracking-wider">${city}</span><span class="text-xs text-gray-500 ml-2">City</span></div></div>`;
      suggestionDiv.style.cursor = "pointer";
      suggestionDiv.onclick = () => goCity(city);
      searchSuggestions.appendChild(suggestionDiv);
    });

    // Add separator if there are other results
    if (results.length > 0) {
      const separator = document.createElement("div");
      separator.className = "my-2 border-t border-white/10";
      searchSuggestions.appendChild(separator);
    }
  }

  // Display festival and cuisine results
  if (results.length > 0) {
    results.forEach(result => {
      const resultDiv = document.createElement("div");
      resultDiv.className = "px-4 py-3 rounded-lg bg-gradient-to-r from-white/5 to-red-600/5 hover:from-white/10 hover:to-red-600/10 cursor-pointer transition-all duration-200 border border-white/10 hover:border-red-500/50 mb-2";
      
      const iconClass = result.type === "Festival" ? "fa-calendar" : "fa-utensils";
      const typeColor = result.type === "Festival" ? "text-red-500" : "text-orange-500";
      
      resultDiv.innerHTML = `
        <div class="flex items-start gap-3">
          <i class="fas ${iconClass} ${typeColor} text-lg mt-1 flex-shrink-0"></i>
          <div class="flex-grow">
            <div class="flex items-center gap-2">
              <span class="font-bold text-sm">${result.name}</span>
              <span class="text-xs px-2 py-1 bg-red-600/20 text-red-400 rounded-full">${result.type}</span>
            </div>
            <span class="text-xs text-gray-500">${result.city}</span>
            <p class="text-xs text-gray-400 mt-1">${result.description}</p>
          </div>
        </div>
      `;
      
      resultDiv.onclick = () => {
        if (result.type === "Festival") {
          // Navigate to Festival.html with festival name as parameter
          window.location.href = `festival/Festival.html?city=${result.city}&festival=${encodeURIComponent(result.name)}`;
        }
        searchInput.value = "";
        searchSuggestions.innerHTML = "";
      };
      
      searchSuggestions.appendChild(resultDiv);
    });
  } else if (matchedCities.length === 0) {
    const noResultDiv = document.createElement("div");
    noResultDiv.className = "px-4 py-3 text-gray-600 text-sm";
    noResultDiv.innerHTML = `
      <div class="flex items-center gap-2">
        <i class="fas fa-search text-gray-500"></i>
        <span>Try searching for: Nyepi, Sekaten, Jakarta Fair, Gudeg...</span>
      </div>
    `;
    searchSuggestions.appendChild(noResultDiv);
  }
});

// Search on Enter key
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim().toLowerCase();
    const matchedCity = cities.find(city => city.toLowerCase() === query);
    
    if (matchedCity) {
      goCity(matchedCity);
      searchInput.value = "";
      searchSuggestions.innerHTML = "";
    }
  }
});

document.querySelectorAll(".dropdown-btn").forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    btn.nextElementSibling.classList.toggle("show");
  });
});

window.addEventListener('click', () =>
  document
    .querySelectorAll(".dropdown-menu")
    .forEach((m) => m.classList.remove("show"))
);

updateUI();
