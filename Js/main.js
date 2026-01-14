document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Efekti (Tüm sayfalarda çalışır)
    const navbar = document.getElementById('navbar');
    if(navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // Konsola Hoşgeldin Mesajı
    console.log(
        "%c🐺 Gökbörü Tarih Portalı'na Hoş Geldiniz!", 
        "color: #a4e8ff; font-size: 20px; font-weight: bold; background-color: #333; padding: 10px; border-radius: 5px;"
    );

    // 2. Sayfa Yönlendirme Mantığı (Router)
    // Hangi sayfadaysak sadece o sayfanın kodlarını çalıştırır.
    if (document.getElementById('battle-details')) {
        initWarsPage();     // Savaşlar Sayfası
    } 
    else if (document.getElementById('history-carousel')) { 
        initIndexPage();    // Anasayfa
    } 
    else if (document.querySelector('.accordion')) {
        initOsmanliPage();  // Osmanlı Sayfası
    }
    else if (document.querySelector('form')) { 
        initContactPage();  // İletişim Sayfası (YENİ EKLENDİ)
    }
});

/* --- ANASAYFA FONKSİYONLARI --- */
/* --- GÜNCELLENMİŞ ANASAYFA FONKSİYONU --- */
function initIndexPage() {
    // 1. Modal (Resim Büyütme) Mantığı (Aynen koruyoruz)
    const modal = document.getElementById('modal-container');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.getElementById('close-btn');

    if (modal) {
        document.querySelectorAll('.zoomable').forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = 'flex';
                modalImg.src = this.src; 
            });
        });

        closeBtn.onclick = () => modal.style.display = 'none';
        modal.onclick = (e) => {
            if (e.target === modal) modal.style.display = 'none';
        };
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        });
    }

    // 2. YENİ EKLENEN KISIM: Zaman Çizelgesi (Timeline) Mantığı
    const slider = document.getElementById('history-slider');
    const bigMap = document.getElementById('big-map');
    const yearDisplay = document.getElementById('current-year-display');

    if (slider && bigMap) {
        // Harita Verileri (Senin dosya isimlerine göre)
        const mapData = [
            { label: "M.Ö. 300 - Büyük Hun Devleti", src: "/img/Türk_Tarihi_M.Ö.3'ncüYY2.jpg" },
            { label: "400 Yılı - Avrupa Hunları", src: "/img/Türk_Tarihi_yıl400.jpg" },
            { label: "800 Yılı - Göktürk ve Uygurlar", src: "/img/Türk_Tarihi_800yılı.jpg" },
            { label: "1200 Yılı - Selçuklular", src: "/img/Türk_Tarihi_1200.jpg" }, // Varsayılan (Index 3)
            { label: "1400 Yılı - Timur ve Osmanlı", src: "/img/Türk_Tarihi_1400.jpg" },
            { label: "1700 Yılı - Osmanlı Zirve", src: "/img/Türk_Tarihi_1700.jpg" },
            { label: "2000 Yılı - Günümüz Türk Dünyası", src: "/img/Türk_Tarihi_2000.jpg" }
        ];

        // Slider her oynadığında çalışacak fonksiyon
        slider.addEventListener('input', function() {
            const index = this.value; // 0 ile 6 arasında bir sayı gelir
            const selectedMap = mapData[index];

            // Başlığı güncelle
            yearDisplay.innerText = selectedMap.label;

            // Resmi güncelle
            bigMap.src = selectedMap.src;

            // Animasyon efekti ekle (ve sil ki tekrar çalışabilsin)
            bigMap.classList.remove('map-fade');
            void bigMap.offsetWidth; // CSS trick: Animasyonu resetler
            bigMap.classList.add('map-fade');
        });
    }
}

/* --- SAVAŞLAR SAYFASI FONKSİYONLARI --- */
function initWarsPage() {
    // Veriler (Ağ isteği yerine sabit veri kullanıyoruz)
    const battles = {
        malazgirt: {
            title: "Malazgirt Meydan Muharebesi",
            sideA: "Büyük Selçuklu", sideB: "Bizans İmparatorluğu",
            flagA: "/img/selcuklu_flag.png", 
            flagB: "/img/bizans_flag.png",
            commanderA: "Sultan Alparslan", commanderB: "Romen Diyojen",
            strengthA: "~50.000 Atlı Okçu", strengthB: "~200.000 Karışık Ordu",
            casualtyA: "Hafif Kayıplar", casualtyB: "İmparator Esir Düştü",
            result: "Anadolu'nun kapıları Türklere açıldı.",
            date: "26 Ağustos 1071", loc: "Muş, Malazgirt"
        },
        istanbul: {
            title: "İstanbul'un Fethi",
            sideA: "Osmanlı İmparatorluğu", sideB: "Bizans İmparatorluğu",
            flagA: "/img/ottoman_flag.png", 
            flagB: "/img/bizans_flag.png", 
            commanderA: "II. Mehmed (Fatih)", commanderB: "XI. Konstantinos",
            strengthA: "~80.000 - 100.000", strengthB: "~7.000 - 10.000",
            casualtyA: "Bilinmiyor", casualtyB: "İmparatorluk Yıkıldı",
            result: "Orta Çağ kapandı, Yeni Çağ başladı.",
            date: "29 Mayıs 1453", loc: "İstanbul (Konstantiniyye)"
        },
        sakarya: {
            title: "Sakarya Meydan Muharebesi",
            sideA: "TBMM Ordusu", sideB: "Yunan Krallığı",
            flagA: "/img/turkey.png", 
            flagB: "/img/Flag_of_Greece.svg",
            commanderA: "M. Kemal Atatürk", commanderB: "Anastasios Papulas",
            strengthA: "96.326 Asker", strengthB: "120.000 Asker",
            casualtyA: "5.713 Şehit", casualtyB: "3.758 Ölü",
            result: "Türk ordusunun geri çekilişi durdu.",
            date: "23 Ağustos 1921", loc: "Polatlı, Ankara"
        }
    };

    // Global Fonksiyon: Haritadaki noktalara tıklanınca çalışır
    window.loadBattle = function(battleKey) {
        const data = battles[battleKey];
        if(!data) return;

        const card = document.getElementById('battle-details');
    
        // Animasyon restart trick
        card.classList.remove('fade-in');
        void card.offsetWidth; 
        card.classList.add('fade-in');

        // DOM Güncelleme
        document.getElementById('battle-title').innerText = data.title;
        document.getElementById('side-a-name').innerText = data.sideA;
        document.getElementById('side-b-name').innerText = data.sideB;
        
        document.getElementById('flag-a').src = data.flagA;
        document.getElementById('flag-b').src = data.flagB;
        
        document.getElementById('commander-a').innerText = data.commanderA;
        document.getElementById('commander-b').innerText = data.commanderB;
        document.getElementById('strength-a').innerText = data.strengthA;
        document.getElementById('strength-b').innerText = data.strengthB;
        document.getElementById('casualty-a').innerText = data.casualtyA;
        document.getElementById('casualty-b').innerText = data.casualtyB;
        
        document.getElementById('result-text').innerText = data.result;
        document.getElementById('battle-date').innerHTML = `<i class="bi bi-calendar3"></i> ${data.date}`;
        document.getElementById('battle-loc').innerHTML = `<i class="bi bi-geo-alt-fill"></i> ${data.loc}`;
    };
}

/* --- OSMANLI SAYFASI FONKSİYONLARI --- */
function initOsmanliPage() {
    // Scroll Animasyonu (Intersection Observer API)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show'); 
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.stat-card, .accordion-item');
    hiddenElements.forEach((el) => observer.observe(el));
}

/* --- İLETİŞİM SAYFASI FONKSİYONLARI (YENİ) --- */
function initContactPage() {
    const form = document.querySelector('form');
    const modal = document.getElementById('success-modal');
    const closeBtn = document.getElementById('modal-close-btn');

    console.log("İletişim sayfası kontrolü: Form bulundu mu?", !!form);

    if (form && modal) {
        // Form gönderilince sayfa yenilenmesini engelle ve modal aç
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Default davranışı durdur

            // Formu temizle
            console.log("Form gönderildi, modal açılıyor...");

            form.reset();

            // Modalı göster
            modal.style.display = 'flex';
        });

        // Kapatma butonuna tıklama
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Modalın dışına tıklama
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}