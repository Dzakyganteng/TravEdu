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



// DATA KOTA DAN FESTIVAL

const kulinerData = [

      // kuliner bali
        {
          nama: "Ayam Betutu",
          daerah: "Bali",
          tipe: "Makanan",
          asal: "Bali",
          img: "https://img-global.cpcdn.com/recipes/3be903f4f79ca2b2/1502x1064cq70/ayam-betutu-foto-resep-utama.jpg",
          deskripsi:
            "Ayam Betutu adalah masakan kebanggaan masyarakat Bali. Daging ayam diolah dengan bumbu rempah 'Base Genep' yang kaya, kemudian dipanggang atau dikukus dalam waktu lama hingga bumbu meresap sampai ke tulang.",
        },
        {
          nama: "Es Daluman",
          daerah: "Bali",
          tipe: "Minuman",
          asal: "Bali",
          img: "https://tse4.mm.bing.net/th/id/OIP._yQYHd9nEddCMWgOs-n7ugHaEc?pid=Api&h=220&P=0",
          deskripsi:
          "Minuman tradisional khas Bali yang terbuat dari daun daluman (cincau hijau), disajikan dengan kuah santan, sirup gula merah, dan es batu. Sangat menyegarkan!",
        },
        {
          nama: "Sate Lilit",
          daerah: "Bali",
          tipe: "Makanan",
          asal: "Bali",
          img: "https://tse3.mm.bing.net/th/id/OIP.koM5zTEWKurjGRUODAoEXwHaEK?pid=Api&h=220&P=0",
          deskripsi:
            "Sate Lilit adalah sate khas Bali yang terbuat dari daging cincang (biasanya ikan atau ayam) yang dibumbui dengan rempah khas, lalu dililitkan pada batang serai sebelum dipanggang.",
        },

        // Kuliner bali selesai


        // kuliner jogja
        {
          nama: "Gudeg",
          daerah: "Jogja",
          tipe: "Makanan",
          asal: "Yogyakarta",
          img: "https://tse3.mm.bing.net/th/id/OIP.YrhBzWQBBIqySjb9m6UhkQHaE8?pid=Api&h=220&P=0",
          deskripsi:
            "Gudeg adalah sayur nangka muda yang dimasak dengan santan dan gula jawa. Proses memasaknya memakan waktu berjam-jam untuk mendapatkan tekstur yang lembut dan warna cokelat yang ikonik.",
        },
        {
          nama: "Bakpia Pathok",
          daerah: "Jogja",
          tipe: "Makanan",
          asal: "Yogyakarta",
          img: "https://tse2.mm.bing.net/th/id/OIP.SYdIA8tycjQzql7O3wihcQHaDO?pid=Api&h=220&P=0",
          deskripsi:
            "Bakpia Pathok adalah kue tradisional khas Yogyakarta yang terbuat dari tepung beras, gula, dan santan. Dibuat dengan cara dipanggang hingga matang dan memiliki tekstur lembut serta rasa manis yang nikmat.",
        },
        {
          nama: "Wedang Ronde",
          daerah: "Jogja",
          tipe: "Minuman",
          asal: "Yogyakarta",
          img: "https://tse1.mm.bing.net/th/id/OIP.cOHngZNNlXXAXRCamWwX6AHaE8?pid=Api&h=220&P=0",
          deskripsi:    
            "Wedang Ronde adalah minuman hangat khas Yogyakarta yang terbuat dari bola-bola ketan berisi kacang tanah, disajikan",
        },
  
        // kuliner jogja selesai  

        // kuliner jakarta
          {
          nama: "Kerak Telor",
          daerah: "Jakarta",
          tipe: "Makanan",
          asal: "Jakarta",
          img: "https://tse2.mm.bing.net/th/id/OIP.NWNWNsVgSaHWx9XmebAVUgHaEL?pid=Api&h=220&P=0",
          deskripsi:
            "Omelet khas Betawi yang dibuat dari beras ketan putih, telur ayam atau bebek, serundeng, dan bawang goreng. Dimasak tanpa minyak di atas tungku arang.",
        },
        {
          nama: "Es Podeng",
          daerah: "Jakarta",
          tipe: "Minuman",
          asal: "Jakarta",
          img: "https://javaprivatetour.com/wp-content/uploads/2024/01/Es-Podeng-Ice-Cream-Podeng-of-Jakarta.jpg",
          deskripsi:
            "Minuman segar khas Betawi yang terbuat dari campuran santan, sirup, potongan roti, kolang-kaling, dan es serut. Cocok untuk melepas dahaga di siang hari.",
        },
        {
          nama: "Nasi Uduk",
          daerah: "Jakarta",
          tipe: "Makanan",
          asal: "Jakarta",
          img: "https://img-global.cpcdn.com/recipes/e6a04bed9729507b/1200x630cq70/photo.jpg",
          deskripsi:
            "Nasi yang dimasak dengan santan dan rempah-rempah, disajikan dengan lauk pauk seperti ayam goreng, telur balado, tempe orek, dan sambal.",
        },

        // kuliner jakarta selesai

        // kuliner malang
        {
          nama: "Bakso Malang",
          daerah: "Malang",
          tipe: "Makanan",
          asal: "Malang",
          img: "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/08/02034124/ini-resep-bakso-malang-lezat-yang-menggugah-selera-halodoc.jpg.webp",
          deskripsi:
            "Berbeda dengan bakso biasa, Bakso Malang menyajikan variasi yang lengkap mulai dari bakso halus, bakso urat, pangsit goreng, hingga siomay yang disiram kuah kaldu bening yang gurih.",
        },
        {
          nama: "Cwie Mie",
          daerah: "Malang",
          tipe: "Makanan",
          asal: "Malang",
          img: "https://www.unileverfoodsolutions.co.id/dam/global-ufs/mcos/SEA/calcmenu/recipes/ID-recipes/cwie-mie-malang/header_2.jpg",
          deskripsi:
            "Mie khas Malang yang disajikan dengan suwiran ayam bumbu kecap, taburan bawang goreng, dan kuah kaldu yang gurih. Biasanya disajikan dengan pangsit goreng atau rebus.",
        },
        {
          nama: "Sate Kambing",
          daerah: "Malang",
          tipe: "Makanan",
          asal: "Malang",
          img: "https://cdn.tasteatlas.com/images/dishes/bd05a70c4dbf44e69325c7ffefb8055a.jpg?mw=2000",
          deskripsi:
            "Sate kambing Malang yang disajikan dengan bumbu kacang khas Malang, disajikan dengan lontong dan sambal.",
        },

        // kuliner malang selesai

        // kuliner Bandung
        {
          nama: "Batagor",
          daerah: "Bandung",
          tipe: "Makanan",
          asal: "Bandung",
          img: "https://tse2.mm.bing.net/th/id/OIP.WXIcrCP3wvw9eS4yUEK7aQHaE8?pid=Api&h=220&P=0",
          deskripsi:
            "Batagor (Bakso Tahu Goreng) adalah kuliner khas Bandung yang terkenal dengan cita rasa gurih dan tekstur renyah.",
        },
        {
          nama: "Es Cendol",
          daerah: "Bandung",
          tipe: "Minuman",    
          asal: "Bandung",
          img: "https://tse4.mm.bing.net/th/id/OIP.MzZdeE0w2DeNTFuqJqACxwHaE8?pid=Api&h=220&P=0",
          deskripsi:
            "Es Cendol adalah minuman tradisional yang menyegarkan, terbuat dari tepung beras hijau, santan, dan gula merah cair.",   
          },
        
      ];

      const menuContainer = document.getElementById("menu-container");

      function displayItems(items) {
        if (items.length === 0) {
          menuContainer.innerHTML = `<p class="text-center col-span-full text-gray-500">Data tidak ditemukan.</p>`;
          return;
        }
        menuContainer.innerHTML = items
          .map(
            (item) => `
                <div class=" rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                     style="background-color: var(--card-bg);">
                    <img src="${item.img}" alt="${item.nama}" class="w-full h-48 object-cover">
                    <div class="p-5">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-[10px] font-bold uppercase tracking-widest text-red-500 bg-red-50 px-2 py-1 rounded">${item.tipe}</span>
                            <span class="text-xs text-gray-500"><i class="fas fa-map-marker-alt mr-1"></i>${item.asal}</span>
                        </div>
                        <h3 class="text-xl font-bold mb-2">${item.nama}</h3>
                        <p class="text-gray-600 text-sm mb-4 line-clamp-2">Kelezatan khas ${item.asal} yang diolah dengan resep warisan nusantara.</p>
                        <button onclick="showDetail('${item.nama}')" class="w-full hover:bg-red-500 font-semibold py-2 rounded-lg transition-colors"
                                style="background-color: var(--card-bg);
                                border: 1px solid var(--border-color);">
                            Lihat Detail
                        </button>
                    </div>
                </div>
            `,
          )
          .join("");
      }

      function filterSelection(region) {
        // Update Active Class on Buttons
        const buttons = document.querySelectorAll(".category-pill");
        buttons.forEach((btn) => {
          btn.classList.remove("active");
          if (btn.innerText.toLowerCase() === region.toLowerCase()) {
            btn.classList.add("active");
          }
        });

        if (region === "semua") {
          displayItems(kulinerData);
        } else {
          const filtered = kulinerData.filter(
            (item) => item.daerah.toLowerCase() === region.toLowerCase(),
          );
          displayItems(filtered);
        }
      }

      // Modal Functions
      function showDetail(nama) {
        const item = kulinerData.find((d) => d.nama === nama);
        if (!item) return;

        document.getElementById("modal-img").src = item.img;
        document.getElementById("modal-nama").innerText = item.nama;
        document.getElementById("modal-tipe").innerText = item.tipe;
        document.getElementById("modal-asal").innerText = item.asal;
        document.getElementById("modal-desc").innerText = item.deskripsi;

        const modal = document.getElementById("detail-modal");
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      }

      function closeModal() {
        const modal = document.getElementById("detail-modal");
        modal.classList.add("hidden");
        document.body.style.overflow = "auto";
      }

      // Close modal if click outside
      window.onclick = function (event) {
        const modal = document.getElementById("detail-modal");
        if (event.target == modal) {
          closeModal();
        }
      };

      // Initial load
      displayItems(kulinerData);