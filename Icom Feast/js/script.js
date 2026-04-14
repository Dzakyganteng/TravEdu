
function initDarkMode() {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    htmlElement.classList.add('dark-mode');
  }

  themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark-mode');
    const isDark = htmlElement.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

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
    placeholder_search: "Search city or destination...",
    travel_edukasi_indonesia: "Travel Education Indonesia",
    travelu: "TravEdu",
    pilih_kota_tujuan: "Choose your destination city and see the enthusiasm of other travelers in real time.",
    mulai_perjalanan: "Start Journey",
    lihat_galeri: "View Gallery",
    destinasi_pilihan: "Selected Destinations",
    kota: "Best",
    terbaik: "Cities",
    pilih_kota_tujuan_desc: "Choose a destination city to see the details of tourism, culture, and its attractions.",
    metropolitan: "Metropolitan",
    sejarah: "History",
    urban: "Urban",
    jelajahi_kota: "Explore City",
    alam: "Nature",
    kreatif: "Creative",
    kuliner: "Culinary",
    budaya: "Culture",
    pantai: "Beach",
    spiritual: "Spiritual",
    pegunungan: "Mountains",
    edukasi: "Education",
    about_us: "About Us",
    who_we_are: "Who We Are",
    about_intro: "TravEdu Indonesia is your ultimate platform for discovering the rich culture, cuisine, and attractions across Indonesia's most beautiful destinations.",
    about_mission: "We believe that travel is not just about visiting places—it's about learning, experiencing, and connecting with the local communities and traditions.",
    about_vision: "Our mission is to make travel information accessible, inspiring, and educational for everyone, helping you explore Indonesia with confidence and curiosity.",
    featured_cities: "Featured Cities",
    attractions: "Attractions",
    restaurants: "Restaurants",
    explore_indonesia: "Explore Indonesia",
    our_features: "Our Features",
    comprehensive_guides: "Comprehensive Guides",
    feature_guides: "Detailed information about destinations, attractions, and local experiences curated for travelers.",
    culinary_discoveries: "Culinary Discoveries",
    feature_culinary: "Explore authentic Indonesian cuisine and local restaurants in each destination.",
    community: "Community",
    feature_community: "Connect with fellow travelers and see their experiences in real time.",
    start_journey_text: "Ready to start your educational journey through Indonesia?",
    Label_Pulau_Jawa: "Pulau Jawa",
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
    placeholder_search: "Cari kota atau destinasi...",
    travel_edukasi_indonesia: "Travel Edukasi Indonesia",
    travelu: "Trav Edu",
    pilih_kota_tujuan: "Pilih kota tujuanmu dan lihat antusiasme para traveler lainnya secara real-time.",
    mulai_perjalanan: "Mulai Perjalanan",
    lihat_galeri: "Lihat Galeri",
    destinasi_pilihan: "Destinasi Pilihan",
    kota: "Kota",
    terbaik: "Terbaik",
    pilih_kota_tujuan_desc: "Pilih kota tujuan untuk melihat detail wisata, budaya, dan daya tariknya.",
    metropolitan: "Metropolitan",
    sejarah: "Sejarah",
    urban: "Urban",
    jelajahi_kota: "Jelajahi Kota",
    alam: "Alam",
    kreatif: "Kreatif",
    kuliner: "Kuliner",
    budaya: "Budaya",
    pantai: "Pantai",
    spiritual: "Spiritual",
    pegunungan: "Pegunungan",
    edukasi: "Edukasi",
    about_us: "Tentang Kami",
    who_we_are: "Siapa Kami",
    about_intro: "TravEdu Indonesia adalah platform ultimate Anda untuk menemukan budaya kaya, kuliner, dan atraksi di seluruh destinasi terindah Indonesia.",
    about_mission: "Kami percaya bahwa perjalanan bukan hanya tentang mengunjungi tempat—tetapi tentang belajar, mengalami, dan terhubung dengan komunitas lokal dan tradisi.",
    about_vision: "Misi kami adalah membuat informasi perjalanan dapat diakses, menginspirasi, dan edukatif bagi semua orang, membantu Anda menjelajahi Indonesia dengan percaya diri dan rasa ingin tahu.",
    featured_cities: "Kota Unggulan",
    attractions: "Atraksi",
    restaurants: "Restoran",
    explore_indonesia: "Jelajahi Indonesia",
    our_features: "Fitur Kami",
    comprehensive_guides: "Panduan Lengkap",
    feature_guides: "Informasi detail tentang destinasi, atraksi, dan pengalaman lokal yang dikurasi untuk traveler.",
    culinary_discoveries: "Penemuan Kuliner",
    feature_culinary: "Jelajahi kuliner autentik Indonesia dan restoran lokal di setiap destinasi.",
    community: "Komunitas",
    feature_community: "Terhubung dengan traveler lain dan lihat pengalaman mereka secara real-time.",
    start_journey_text: "Siap memulai perjalanan edukatif Anda melalui Indonesia?",
    Label_Pulau_Jawa: "Jawa Island",
  }
};



let currentLanguage = localStorage.getItem('language') || 'en';

function setLanguage(lang) {
  
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang;
  
  // Update language button
  document.getElementById('lang-text').textContent = lang.toUpperCase();
  
  // Update all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });


  
  // Update input placeholder
  const searchInput = document.querySelector('input[data-i18n-placeholder]');
  if (searchInput) {
    const placeholderKey = searchInput.getAttribute('data-i18n-placeholder');
    if (translations[lang][placeholderKey]) {
      searchInput.placeholder = translations[lang][placeholderKey];
    }
  }
}

function initLanguage() {
  const langToggle = document.getElementById('lang-toggle');
  
  // Set initial language
  setLanguage(currentLanguage);
  
  // Toggle language on button click
  langToggle.addEventListener('click', () => {
    const newLang = currentLanguage === 'en' ? 'id' : 'en';
    setLanguage(newLang);
  });
}

// Initialize dark mode when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initLanguage();
  });
} else {
  initDarkMode();
  initLanguage();
}

function goCity(city) {
    const routes = {
      Jakarta: "../Tempat/jakarta.html",
      Bandung: "../Tempat/bandung.html",
      Jogja: "../Tempat/jogja.html",
      Malang: "../Tempat/malang.html",
      Bali: "../Tempat/bali.html",
    };
    window.location.href = routes[city];
  }


// --- SLIDESHOW HERO ---
const images = [
  "https://wallpaperaccess.com/full/6154321.jpg",
  "https://wallpaperaccess.com/full/6154325.jpg",
  "https://2.bp.blogspot.com/-kBJIgYcYtzo/Vqt7vCnT1LI/AAAAAAAABQ0/nYxWtho7zik/s1600/2.jpg",
  "https://travelinkmagz.com/wp-content/uploads/2020/04/JKT_Monas_1920x1080px_1.jpg",
  "https://idetrips.com/wp-content/uploads/2020/07/kawah-ratu-tangkuban-parahu.jpg",
  "https://www.bugbog.com/wp-content/uploads/2022/05/dc76a908affc27f2/mount-bromo.jpeg",
];
let currentIndex = 0;
const bgContainer = document.getElementById("bg-container");
const timerBar = document.getElementById("timer-bar");

images.forEach((img, index) => {
  const div = document.createElement("div");
  div.className = `bg-layer ${index === 0 ? "active" : ""}`;
  div.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${img}')`;
  bgContainer.appendChild(div);
});

function nextSlide() {
  const layers = document.querySelectorAll(".bg-layer");
  layers[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % images.length;
  layers[currentIndex].classList.add("active");
  startTimer();
}
function startTimer() {
  timerBar.style.transition = "none";
  timerBar.style.width = "0%";
  setTimeout(() => {
    timerBar.style.transition = "width 10000ms linear";
    timerBar.style.width = "100%";
  }, 50);
}
setInterval(nextSlide, 10000);
startTimer();

// --- DATA KOTA & LOGIKA PERSENTASE ---
const cityData = {
  Jakarta: { count: 2450, color: "#ef4444" },
  Bandung: { count: 1820, color: "#3b82f6" },
  Jogja: { count: 3100, color: "#10b981" },
  Malang: { count: 1560, color: "#f59e0b" },
  Bali: { count: 5200, color: "#8b5cf6" },
};

function updateUI() {
  const total = Object.values(cityData).reduce(
    (sum, city) => sum + city.count,
    0,
  );
  const container = document.getElementById("stats-container");
  container.innerHTML = "";

  for (const city in cityData) {
    const percentage = ((cityData[city].count / total) * 100).toFixed(1);
    container.innerHTML += `
            <div class="glass-card p-4 rounded-2xl border-l-4" style="border-left-color: ${cityData[city].color}">
              <div class="flex justify-between items-end mb-2">
                <span class="text-sm font-bold uppercase tracking-tighter">${city}</span>
                <span class="text-lg font-black">${percentage}%</span>
              </div>
              <div class="progress-bg"><div class="progress-fill" style="width: ${percentage}%; background: ${cityData[city].color}"></div></div>
            </div>
          `;
  }
}

// Interaksi Titik Kota
const tooltip = document.getElementById("tooltip");
document.querySelectorAll(".city-node").forEach((node) => {
  const id = node.id;
  node.addEventListener("mousemove", (e) => {
    tooltip.style.display = "block";
    tooltip.innerHTML = `<div class="font-bold text-red-500 uppercase">${id}</div><div class="text-[10px] opacity-70">Klik untuk Vote</div>`;
    tooltip.style.left = e.pageX + 15 + "px";
    tooltip.style.top = e.pageY + 15 + "px";
  });
  node.addEventListener("mouseleave", () => (tooltip.style.display = "none"));
  node.addEventListener("click", () => {
    cityData[id].count += 100;
    updateUI();
    node.style.r = "20";
    setTimeout(() => (node.style.r = "8"), 200);
  });
});

// --- SEARCH & DROPDOWN ---
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


// jAM DIGITAL

function updateClock() {
    const now = new Date();
    const lang = localStorage.getItem('userLang') || 'ID';
    
    // Format Jam
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Update Teks Jam
    document.getElementById('digital-clock').innerText = `${hours}:${minutes}:${seconds}`;

    // Format Tanggal (Menyesuaikan Bahasa)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString(lang === 'ID' ? 'id-ID' : 'en-US', options);
    
    document.getElementById('digital-date').innerText = dateString.toUpperCase();
}

// Jalankan jam setiap detik
setInterval(updateClock, 1000);
updateClock(); // Panggil langsung agar tidak menunggu 1 detik pertama


// Jam Digital 
function updateClock() {
    const now = new Date();
    
    // Ambil Jam, Menit, dan Detik
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    
    // Tambahkan angka 0 di depan jika angka < 10 (Format 01, 02, dst)
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    const timeString = h + ":" + m + ":" + s;
    document.getElementById("clock").innerText = timeString;

    // Update Tanggal
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("date").innerText = now.toLocaleDateString('id-ID', options);
}

// Jalankan fungsi setiap 1 detik
setInterval(updateClock, 1000);

// Panggil sekali di awal agar tidak menunggu 1 detik pertama
updateClock();

// --- Jam Digital Selesai ---
