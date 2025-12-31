document.addEventListener('DOMContentLoaded', () => {
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

    console.log(
        "%c🐺 Gökbörü Tarih Portalı'na Hoş Geldiniz!", 
        "color: #a4e8ff; font-size: 20px; font-weight: bold; background-color: #333; padding: 10px; border-radius: 5px;"
    );

    if (document.getElementById('battle-details')) {
        initWarsPage();
    } 
    else if (document.getElementById('history-carousel')) { 
        initIndexPage();
    } 
    else if (document.querySelector('.accordion')) {
        initOsmanliPage();
    }
});

function initIndexPage() {
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
}

function initWarsPage() {
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

    window.loadBattle = function(battleKey) {
        const data = battles[battleKey];
        if(!data) return;

        const card = document.getElementById('battle-details');
    
        card.classList.remove('fade-in');
        void card.offsetWidth; 
        card.classList.add('fade-in');

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

function initOsmanliPage() {
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