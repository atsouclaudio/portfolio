/* ============================================================
   script.js — Portfolio interactif
============================================================ */

// ─── NAV scroll effect ────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 40
    ? '0 4px 32px rgba(0,0,0,.5)' : 'none';
});

// ─── Burger menu mobile ───────────────────────────────────
const burger = document.getElementById('navBurger');
burger.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Fermer le menu quand on clique sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// ─── Compteurs animés (section À propos) ─────────────────
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    let current = 0;
    const step = Math.ceil(target / 50);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = current + '+';
    }, 30);
  });
}

// ─── Intersection Observer — animations d'entrée + compteurs
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Déclencher les compteurs une fois quand la section about apparaît
      if (entry.target.classList.contains('about-stats')) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    }
  });
}, { threshold: 0.15 });

// Appliquer fade-in sur les éléments à animer
const animatedEls = document.querySelectorAll(
  '.hero-content, .hero-visual, .service-card, .skill-cat, .project-card, .contact-item, .contact-form'
);
animatedEls.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Observer la section stats séparément
const statsSection = document.querySelector('.about-stats');
if (statsSection) observer.observe(statsSection);

// ─── Formulaire de contact ────────────────────────────────
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

// Fonction pour afficher les alertes
function showAlert(message, type) {
  const alert = document.getElementById('formAlert');
  alert.textContent = message;
  alert.className = 'alert ' + type;
  alert.style.display = 'block';
  
setTimeout(() => {
    alert.style.display = 'none';
  }, 2000);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // ============================================================
  // ✏️ PERSONNALISATION — Intégration formulaire
  //
  // Option 1 : Formspree (gratuit, simple)
  //   - Créez un compte sur https://formspree.io
  //   - Remplacez l'URL ci-dessous par votre endpoint Formspree
  //   - Décommentez le bloc fetch()
  //
  // Option 2 : EmailJS
  //   - Installez EmailJS et configurez votre service
  //
  // Option 3 : Simple mailto (solution basique)
  //   - Changez l'action du formulaire en mailto:votre@email.com
  // ============================================================

  const data = new FormData(form);

// Formspree — formulaire configuré
fetch('https://formspree.io/f/maqvndrd', {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  }).then(res => {
    if (res.ok) {
      form.reset();
      showAlert('Message envoyé avec succès !', 'success');
    } else {
      showAlert('Erreur lors de l\'envoi. Réessayez.', 'error');
    }
  }).catch(err => {
    console.error('Erreur:', err);
    showAlert('Erreur lors de l\'envoi. Vérifiez votre connexion.', 'error');
  });
});

// ─── Navigation active selon la section visible ───────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'var(--accent)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
