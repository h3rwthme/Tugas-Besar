// ================= LOAD SECTION =================
const sectionList = [
    "cover",
    "about",
    "family",
    "friends",
    "hobbies",
    "projects",
    "contact"
];

const main = document.getElementById("main-content");

async function loadSections() {
    for (let sec of sectionList) {
        const res = await fetch(`sections/${sec}.html`);
        const html = await res.text();
        main.innerHTML += html;
    }

    initAfterLoad();
}

loadSections();

// ================= INIT SETELAH LOAD =================
function initAfterLoad() {

    // ── Mobile menu ──
    const mobileBtn = document.getElementById('mobileBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.side-nav a');

    mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('menu-open');
        if (navMenu.classList.contains('menu-open')) {
            mobileBtn.innerHTML = '✕';
            mobileBtn.style.background = 'var(--red-scrapbook)';
        } else {
            mobileBtn.innerHTML = '☰';
            mobileBtn.style.background = 'var(--text-dark)';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('menu-open');
            mobileBtn.innerHTML = '☰';
            mobileBtn.style.background = 'var(--text-dark)';
        });
    });

    // ── Observer ──
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => link.classList.remove('active-link'));
                const activeLink = document.querySelector(`.side-nav a[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active-link');
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    document.body.classList.add('loaded');
}