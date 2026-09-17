/**
 * Portfolio LOKO Bénoît — Interactions & Logique Applicative
 * Développeur Full-Stack & Créateur de Contenu Tech
 */

// 1. Base de données des projets détaillés
const projectsData = {
  nexus: {
    id: "nexus",
    title: "Nexus Analytics SaaS",
    category: ["fullstack", "backend"],
    badge: "Full-Stack SaaS",
    image: "assets/projects/nexus-saas.jpg",
    shortDescription: "Plateforme cloud de métriques et d'observabilité en temps réel avec tableaux de bord réactifs et alertes instantanées.",
    fullDescription: "Nexus Analytics est une solution SaaS complète conçue pour agréger des millions d'événements par seconde. L'application offre une visualisation ultra-fluide des flux d'utilisateurs, des performances API et des revenus récurrents, avec un moteur d'analyse prédictive intégré.",
    stack: ["Next.js", "TypeScript", "Node.js", "TimescaleDB", "Redis", "Tailwind CSS", "Docker"],
    challenges: [
      "Gestion de gros volumes de données temporelles (> 2M d'événements/jour) avec temps de réponse sous les 120ms.",
      "Mise en place de WebSockets sécurisés pour le rafraîchissement des graphiques en temps réel sans saccade.",
      "Système d'authentification multi-tenant avec gestion fine des rôles (RBAC)."
    ],
    liveUrl: "https://nexus-demo.lokobenoit.dev",
    githubUrl: "https://github.com/lokobenoit/nexus-analytics"
  },
  cybernetic: {
    id: "cybernetic",
    title: "Cybernetic AI Studio",
    category: ["fullstack", "backend"],
    badge: "IA & Developer Tools",
    image: "assets/projects/cybernetic-ai.jpg",
    shortDescription: "IDE intelligent assisté par IA qui audite le code en continu, détecte les failles de sécurité et suggère des optimisations.",
    fullDescription: "Cybernetic AI Studio est une suite logicielle pour équipes d'ingénierie combinant un éditeur web moderne et un agent d'analyse syntaxique sémantique propulsé par des LLMs spécialisés. Il effectue de la revue de code automatique et optimise la mémoire avant déploiement.",
    stack: ["React", "FastAPI", "Python", "LangChain", "WebSockets", "Monaco Editor", "PostgreSQL"],
    challenges: [
      "Intégration d'un pipeline d'inférence asynchrone avec streaming token par token à très faible latence.",
      "Analyseur statique de code hybride (AST parsing + LLM) pour minimiser les faux positifs de sécurité.",
      "Architecture de conteneurisation isolée pour tester les suggestions de code en bac à sable."
    ],
    liveUrl: "https://cybernetic-studio.lokobenoit.dev",
    githubUrl: "https://github.com/lokobenoit/cybernetic-ai"
  },
  synapse: {
    id: "synapse",
    title: "Synapse Creative Store",
    category: ["fullstack", "frontend"],
    badge: "E-Commerce Tech",
    image: "assets/projects/synapse-store.jpg",
    shortDescription: "Boutique en ligne futuriste pour équipements tech et bundles logiciels destinés aux développeurs et créateurs.",
    fullDescription: "Synapse Store repense le shopping pour les passionnés de technologies. Développé avec un focus extrême sur le design, les micro-animations et la conversion, le site intègre un tunnel d'achat Stripe ultra-rapide et un configurateur de workstation 3D.",
    stack: ["React", "Node.js", "Express", "Stripe API", "PostgreSQL", "Framer Motion", "Redis"],
    challenges: [
      "Optimisation maximale du score Core Web Vitals (98+ sur Lighthouse) malgré des visuels haute fidélité.",
      "Gestion synchronisée des stocks en temps réel avec verrouillage optimiste des paniers d'achat.",
      "Système de checkout en un clic sécurisé avec Stripe Elements et webhooks tolérants aux pannes."
    ],
    liveUrl: "https://synapse-store.lokobenoit.dev",
    githubUrl: "https://github.com/lokobenoit/synapse-store"
  }
};

// 2. Initialisation au chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
  initNavbarScroll();
  initMobileMenu();
  initProjectFilters();
  initProjectModal();
  initClipboardCopy();
  initContactForm();
  initCardTilt();
});

// 3. Navbar scrollspy & effet de flou au scroll
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    // Effet d'élévation sur la navbar
    if (window.scrollY > 40) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }

    // ScrollSpy : détection de la section active
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id") || "";
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// 4. Menu mobile
function initMobileMenu() {
  const toggleBtn = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-menu .nav-link, .nav-menu .btn");

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    const isOpen = navMenu.classList.contains("open");
    toggleBtn.setAttribute("aria-expanded", isOpen.toString());
  });

  // Fermer le menu au clic sur un lien
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
  });
}

// 5. Filtrage interactif des projets
function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter") || "all";

      projectCards.forEach((card) => {
        const categories = (card.getAttribute("data-category") || "").split(" ");
        if (filterValue === "all" || categories.includes(filterValue)) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(15px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// 6. Gestion de la modale de détails projet
function initProjectModal() {
  const modalOverlay = document.getElementById("projectModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const detailButtons = document.querySelectorAll(".btn-project-details");

  if (!modalOverlay) return;

  const modalImg = document.getElementById("modalImg");
  const modalBadge = document.getElementById("modalBadge");
  const modalTitle = document.getElementById("modalTitle");
  const modalOverview = document.getElementById("modalOverview");
  const modalStack = document.getElementById("modalStack");
  const modalChallenges = document.getElementById("modalChallenges");
  const modalLiveBtn = document.getElementById("modalLiveBtn");
  const modalGithubBtn = document.getElementById("modalGithubBtn");

  function openModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    if (modalImg) modalImg.src = project.image;
    if (modalBadge) modalBadge.textContent = project.badge;
    if (modalTitle) modalTitle.textContent = project.title;
    if (modalOverview) modalOverview.textContent = project.fullDescription;

    if (modalStack) {
      modalStack.innerHTML = project.stack
        .map((tech) => `<span class="tech-tag">${tech}</span>`)
        .join("");
    }

    if (modalChallenges) {
      modalChallenges.innerHTML = project.challenges
        .map((c) => `<li>${c}</li>`)
        .join("");
    }

    if (modalLiveBtn) modalLiveBtn.href = project.liveUrl;
    if (modalGithubBtn) modalGithubBtn.href = project.githubUrl;

    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  detailButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute("data-project-id");
      if (projectId) openModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });
}

// 7. Copie rapide de l'email avec notification toast
function initClipboardCopy() {
  const copyBtn = document.getElementById("copyEmailBtn");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", () => {
    const email = copyBtn.getAttribute("data-email") || "benoit.loko@example.com";
    navigator.clipboard.writeText(email).then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = "✓ Copié !";
      copyBtn.style.color = "#10b981";
      showToast("Adresse email copiée dans le presse-papier !");

      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.color = "";
      }, 2500);
    });
  });
}

// 8. Notification Toast personnalisée
function showToast(message) {
  let toast = document.getElementById("toastNotification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastNotification";
    toast.className = "toast-notification";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// 9. Gestion du formulaire de contact
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("userName");
    const name = nameInput ? nameInput.value : "Ami";

    showToast(`Merci ${name} ! Ton message a bien été envoyé. Bénoît te répondra très rapidement.`);
    contactForm.reset();
  });
}

// 10. Effet 3D Tilt subtil sur les cartes
function initCardTilt() {
  const tiltElements = document.querySelectorAll(".hero-card, .project-card");

  tiltElements.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });
}
