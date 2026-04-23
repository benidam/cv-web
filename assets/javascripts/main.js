/* Show Menu */
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    nav = document.getElementById(navId);

    // Validate that variables exist
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu');
        });
    }
}
showMenu('nav-toggle', 'nav-menu');

/* Remove menu mobile */
const navLink = document.querySelectorAll('.nav_link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* Scroll sections active link */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/* Show scroll top */
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    if (this.scrollY >= 200) {
        scrollTop.classList.add('show-scroll');
    } else {
        scrollTop.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollTop);

/* Light/Dark mode */
const themeButton = document.getElementById('theme-button');
let darkTheme = 'dark-theme';
let darkMode = localStorage.getItem("dark-mode");

function enableDarkMode() {
    document.body.classList.add(darkTheme);
    themeButton.classList.add('fa-sun');
    themeButton.classList.remove('fa-moon');
    localStorage.setItem("dark-mode", "enabled");
};

function disableDarkMode() {
    document.body.classList.remove(darkTheme);
    themeButton.classList.add('fa-moon');
    themeButton.classList.remove('fa-sun');
    localStorage.setItem("dark-mode", "disabled");
};

if (darkMode === "enabled") {
    enableDarkMode();
}

themeButton.addEventListener("click", () => {
    darkMode = localStorage.getItem("dark-mode");
    if (darkMode === "disabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});


/* ==================== GENERATE PDF ==================== */

/* Reduce the size and print on an A4 sheet */
function addScaleCV() {
    document.body.classList.add("scale-cv");
}

/* Remove the size when the CV is downloaded */
function removeScaleCV() {
    document.body.classList.remove("scale-cv");
}

// PDF generated area
let areaCV = document.getElementById('area-cv');
// Button PC
let resumeButton = document.getElementById("resume-button");
// Button Mobile
let downloadButton = document.getElementById("download-button");

// Generate PDF with html2pdf.js
function generateResume() {
    // Configuración para el PDF
    let opt = {
        margin: 0,
        // Cambia el nombre del archivo dependiendo de si está en modo oscuro o claro
        filename: document.body.classList.contains(darkTheme) ? 'CV_Alvaro_Benitez_Dark.pdf' : 'CV_Alvaro_Benitez_Light.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 4, useCORS: true }, // scale: 4 aumenta la calidad. useCORS permite descargar la foto.
        jsPDF: { format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf(areaCV, opt);
}

// Función maestra que adapta el CV, genera el PDF y restaura el tamaño
function handlePdfGeneration(e) {
    if(e) e.preventDefault(); // Evita que la pantalla salte hacia arriba al pulsar el enlace en el móvil
    
    // 1. Adapt the area of the PDF
    addScaleCV();
    
    // 2. Generate the PDF
    generateResume();
    
    // 3. Remove adaptation after 5 seconds (asegura que dé tiempo a descargar la imagen con buena calidad sin cortar el diseño)
    setTimeout(removeScaleCV, 5000);
}

// Escuchador de eventos para el botón del Ordenador
if(resumeButton) {
    resumeButton.addEventListener("click", handlePdfGeneration);
}

// Escuchador de eventos para el botón del Móvil
if(downloadButton) {
    downloadButton.addEventListener("click", handlePdfGeneration);
}
/* ==================== GENERATE PDF ==================== */

/* Reduce the size and print on an A4 sheet */
function addScaleCV() {
    document.body.classList.add("scale-cv");
}

/* Remove the size when the CV is downloaded */
function removeScaleCV() {
    document.body.classList.remove("scale-cv");
}

// PDF generated area
let areaCV = document.getElementById('area-cv');
// Button PC
let resumeButton = document.getElementById("resume-button");
// Button Mobile
let downloadButton = document.getElementById("download-button");

// Generate PDF with html2pdf.js
function generateResume() {
    // Configuración para el PDF
    let opt = {
        margin: 0,
        // Cambia el nombre del archivo dependiendo de si está en modo oscuro o claro
        filename: document.body.classList.contains(darkTheme) ? 'CV_Alvaro_Benitez_Dark.pdf' : 'CV_Alvaro_Benitez_Light.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 4, useCORS: true }, 
        jsPDF: { format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf(areaCV, opt);
}

// Función maestra que adapta el CV, genera el PDF y restaura el tamaño
function handlePdfGeneration(e) {
    if(e) e.preventDefault(); 
    
    // 1. Adapt the area of the PDF
    addScaleCV();
    
    // 2. Generate the PDF
    generateResume();
    
    // 3. Remove adaptation after 5 seconds
    setTimeout(removeScaleCV, 5000);
}

// Escuchador de eventos para el botón del Ordenador
if(resumeButton) {
    resumeButton.addEventListener("click", handlePdfGeneration);
}

// Escuchador de eventos para el botón del Móvil
if(downloadButton) {
    downloadButton.addEventListener("click", handlePdfGeneration);
}
