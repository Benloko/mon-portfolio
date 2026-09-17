const { useState, useEffect, useMemo } = React;

// 1. Données réelles initiales de LOKO Bénoît
const defaultProfile = {
  name: "LOKO Bénoît",
  title: "Développeur Full-Stack (React, Laravel, PostgreSQL)",
  location: "Cotonou (Akpakpa), Bénin",
  email: "bloko3565@gmail.com",
  phone: "+229 01 62 97 62 48",
  whatsappUrl: "https://wa.me/2290162976248",
  githubUrl: "https://github.com/Benloko",
  bio: "Développeur Full-Stack basé à Cotonou au Bénin. Je conçois des applications web et logicielles robustes avec React, PHP/Laravel et PostgreSQL, centrées sur la résolution de problématiques concrètes du quotidien. Également passionné par la transmission et le partage d'astuces tech avec la communauté.",
  stats: [
    { value: "5+", label: "Projets Développés" },
    { value: "Full-Stack", label: "React & Laravel" },
    { value: "Bénin", label: "Cotonou & Remote" }
  ]
};

// 5 vrais projets authentiques de Bénoît LOKO
const defaultProjects = [
  {
    id: "crediflow",
    title: "CrediFlow — Tontine Entreprises",
    category: "fullstack",
    badge: "Fintech & Épargne",
    icon: "💳",
    shortDescription: "Application de tontine en ligne et d'épargne collective inter-entreprises avec protocoles de sécurité financière renforcés.",
    fullDescription: "CrediFlow modernise le système traditionnel de tontine pour les entreprises et les groupes professionnels. La plateforme garantit la traçabilité intégrale des cotisations, la sécurité des transactions et la redistribution automatisée selon les cycles convenus.",
    stack: ["React", "PHP", "Laravel", "PostgreSQL", "REST API"],
    githubUrl: "https://github.com/Benloko",
    liveUrl: "https://github.com/Benloko",
    challenges: [
      "Sécurisation stricte des flux de transactions et des données financières sensibles.",
      "Automatisation des cycles de rotation et de calcul des parts de tontine pour les groupes.",
      "Tableaux de bord clairs pour le suivi des cotisations par entreprise participante."
    ]
  },
  {
    id: "covoiturage",
    title: "Co-voiturage Bénin",
    category: "fullstack",
    badge: "Mobilité Urbaine P2P",
    icon: "🚗",
    shortDescription: "Solution de mobilité urbaine & interurbaine pair-à-pair au Bénin, connectant conducteurs et passagers pour des trajets partagés économiques.",
    fullDescription: "Inspirée des réalités de transport au Bénin et pensée comme une alternative abordable aux taxis traditionnels ou à Gozem, l'application permet à un particulier qui effectue un trajet de proposer ses places libres. Le passager paie moins cher son déplacement et le conducteur rentabilise ses frais de carburant.",
    stack: ["React", "JavaScript", "PHP", "Laravel", "PostgreSQL", "REST API"],
    githubUrl: "https://github.com/Benloko/covoiturage-frontend",
    liveUrl: "https://github.com/Benloko/covoiturage-frontend",
    challenges: [
      "Système de recherche et de sélection d'itinéraires adapté aux trajets locaux béninois.",
      "Architecture découplée avec une API REST Laravel sécurisée et un Front-End React fluide.",
      "Formule de mise en relation directe conviviale pour désengorger le trafic et réduire les coûts."
    ]
  },
  {
    id: "vaybe",
    title: "Vaybe — Portail Recrutement RH",
    category: "web",
    badge: "RH & Recrutement",
    icon: "💼",
    shortDescription: "Plateforme web de recrutement sur mesure permettant aux candidats de postuler en ligne et transmettre leur CV sans déplacement.",
    fullDescription: "Développée sur mesure pour fluidifier les processus d'embauche d'une entreprise, Vaybe supprime les contraintes de dépôts physiques de dossiers. Les candidats consultent les postes ouverts, transmettent leur CV et pièces jointes en quelques clics, tandis que les recruteurs disposent d'un espace de tri et d'évaluation centralisé.",
    stack: ["React", "JavaScript", "PHP", "Laravel", "PostgreSQL"],
    githubUrl: "https://github.com/Benloko",
    liveUrl: "https://github.com/Benloko",
    challenges: [
      "Gestion et téléversement sécurisé de documents et CV (PDF/Word).",
      "Interface fluide et rapide sur mobile pour faciliter les candidatures des postulants.",
      "Espace recruteur ergonomique avec filtres par poste et statut de candidature."
    ]
  },
  {
    id: "aeebenin",
    title: "AEE Bénin",
    category: "web",
    badge: "Social & Éducation",
    icon: "🤝",
    shortDescription: "Plateforme web associative dédiée à l'accompagnement, l'enseignement et le soutien éducatif et matériel aux enfants des églises évangéliques au Bénin.",
    fullDescription: "AEE Bénin permet de coordonner les actions éducatives, l'organisation des rassemblements et la distribution de fournitures scolaires et cadeaux aux enfants. Conçue avec Laravel, PostgreSQL et JavaScript, l'application offre une gestion centralisée des bénéficiaires et des programmes associatifs.",
    stack: ["JavaScript", "PHP", "Laravel", "PostgreSQL", "CSS3"],
    githubUrl: "https://github.com/Benloko/aeebenin",
    liveUrl: "https://github.com/Benloko/aeebenin",
    challenges: [
      "Modélisation de la base PostgreSQL pour le suivi précis des bénéficiaires et des événements.",
      "Interface d'administration Laravel intuitive et rapide d'accès pour les coordinateurs associatifs.",
      "Organisation des programmes de dons et de distribution avec historique consultable."
    ]
  },
  {
    id: "schimei",
    title: "Schiméi — Réseau Chorale",
    category: "fullstack",
    badge: "Communauté & Musique",
    icon: "🎵",
    shortDescription: "Réseau social et espace collaboratif privé dédié aux membres d'une chorale pour le suivi des répétitions, partitions et plannings.",
    fullDescription: "Schiméi centralise l'ensemble des activités d'un groupe musical à la manière d'un réseau social spécialisé : bibliothèque numérique de partitions classées par pupitre vocal, calendrier des répétitions et prestations, fil d'actualités pour les annonces et messagerie pour les choristes.",
    stack: ["TypeScript", "React", "Node.js", "PostgreSQL", "CSS3"],
    githubUrl: "https://github.com/Benloko/schimei",
    liveUrl: "https://github.com/Benloko/schimei",
    challenges: [
      "Bibliothèque de partitions avec consultation optimisée pour les smartphones lors des répétitions.",
      "Planning partagé des séances de chant avec rappels et suivi des présences.",
      "Espace de communication interne préservant la cohésion et le bon déroulement des répétitions."
    ]
  }
];

const availableIcons = [
  { icon: "💳", label: "Fintech & Épargne / Tontine" },
  { icon: "🚗", label: "Mobilité & Transport P2P" },
  { icon: "💼", label: "RH & Recrutement Pro" },
  { icon: "🤝", label: "Social & Associatif" },
  { icon: "🎵", label: "Communauté & Chorale" },
  { icon: "💻", label: "Web Full-Stack & SaaS" },
  { icon: "📱", label: "Application Mobile" },
  { icon: "🛒", label: "E-Commerce & Boutique" },
  { icon: "⚙️", label: "API REST & Backend" },
  { icon: "🎓", label: "Éducation & Formation" },
  { icon: "🚀", label: "Startup & Innovation" },
  { icon: "📊", label: "Tableaux de bord & Data" },
  { icon: "🔒", label: "Cybersécurité & Authentification" },
  { icon: "🛠️", label: "Outils & Scripts d'Automatisation" },
  { icon: "🌐", label: "Portail & Plateforme Publique" }
];

// 2. Application Principale
function App() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("benoit_portfolio_profile");
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("benoit_portfolio_projects");
    if (!saved) return defaultProjects;
    try {
      const parsed = JSON.parse(saved);
      const existingIds = new Set(parsed.map(p => p.id));
      const merged = [...parsed];
      defaultProjects.forEach(dp => {
        if (!existingIds.has(dp.id)) {
          merged.unshift(dp);
        }
      });
      return merged;
    } catch {
      return defaultProjects;
    }
  });

  // Mode Administrateur
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem("benoit_admin_logged") === "true";
  });

  // Gestion des vues : 'portfolio' (public), 'admin' (tableau de bord complet) ou 'admin_login' (écran de connexion dédié)
  const [currentView, setCurrentView] = useState(() => {
    if (window.location.hash === "#admin") {
      return sessionStorage.getItem("benoit_admin_logged") === "true" ? "admin" : "admin_login";
    }
    return "portfolio";
  });

  const [showPassword, setShowPassword] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [adminPasswordError, setAdminPasswordError] = useState("");

  const [projectModal, setProjectModal] = useState(null);
  const [editorModalOpen, setEditorModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [profileEditorOpen, setProfileEditorOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [toast, setToast] = useState(null);

  // Détection du lien #admin dans l'URL pour un basculement direct et sans conflit
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#admin") {
        if (isAdmin) {
          setCurrentView("admin");
        } else {
          setCurrentView("admin_login");
        }
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [isAdmin]);

  // Sauvegarde dans localStorage
  useEffect(() => {
    localStorage.setItem("benoit_portfolio_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("benoit_portfolio_profile", JSON.stringify(profile));
  }, [profile]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3500);
  };

  // Connexion Admin
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPasswordInput === "Ben2000") {
      setIsAdmin(true);
      sessionStorage.setItem("benoit_admin_logged", "true");
      setAdminLoginModalOpen(false);
      setAdminPasswordInput("");
      setAdminPasswordError("");
      setCurrentView("admin");
      window.location.hash = "";
      showToast("Bienvenue dans votre espace d'administration !");
    } else {
      setAdminPasswordError("Mot de passe incorrect. Réessayez.");
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("benoit_admin_logged");
    setCurrentView("portfolio");
    window.location.hash = "";
    showToast("Déconnexion de l'espace Admin.");
  };

  // CRUD Projets
  const handleOpenNewProject = () => {
    setEditingProject({
      id: "projet-" + Date.now(),
      title: "",
      category: "fullstack",
      badge: "Nouveau Projet",
      icon: "💻",
      shortDescription: "",
      fullDescription: "",
      stack: "React, Laravel, PostgreSQL",
      githubUrl: "https://github.com/Benloko",
      liveUrl: "https://github.com/Benloko",
      challenges: "Gestion des flux, Sécurité API"
    });
    setEditorModalOpen(true);
  };

  const handleEditProject = (proj) => {
    setEditingProject({
      ...proj,
      icon: proj.icon || "💻",
      stack: Array.isArray(proj.stack) ? proj.stack.join(", ") : proj.stack,
      challenges: Array.isArray(proj.challenges) ? proj.challenges.join("\n") : proj.challenges
    });
    setEditorModalOpen(true);
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    const formatted = {
      ...editingProject,
      icon: editingProject.icon || "💻",
      stack: typeof editingProject.stack === "string" 
        ? editingProject.stack.split(",").map(s => s.trim()).filter(Boolean)
        : editingProject.stack,
      challenges: typeof editingProject.challenges === "string"
        ? editingProject.challenges.split("\n").map(s => s.trim()).filter(Boolean)
        : editingProject.challenges
    };

    const exists = projects.find(p => p.id === formatted.id);
    if (exists) {
      setProjects(projects.map(p => p.id === formatted.id ? formatted : p));
      showToast(`Projet "${formatted.title}" mis à jour !`);
    } else {
      setProjects([formatted, ...projects]);
      showToast(`Projet "${formatted.title}" ajouté !`);
    }
    setEditorModalOpen(false);
  };

  const handleDeleteProject = (id) => {
    const proj = projects.find(p => p.id === id);
    if (confirm(`Supprimer le projet "${proj?.title}" ?`)) {
      setProjects(projects.filter(p => p.id !== id));
      showToast("Projet supprimé.");
    }
  };

  const handleResetDefaults = () => {
    if (confirm("Rétablir les 5 projets authentiques de LOKO Bénoît ?")) {
      setProjects(defaultProjects);
      setProfile(defaultProfile);
      localStorage.removeItem("benoit_portfolio_projects");
      localStorage.removeItem("benoit_portfolio_profile");
      showToast("5 projets d'origine rétablis !");
    }
  };

  const handleExportJSON = () => {
    const data = { profile, projects };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-benoit-loko-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast("Fichier JSON téléchargé !");
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    showToast("Adresse email copiée !");
  };

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter(p => p.category === activeFilter);
  }, [projects, activeFilter]);

  // =========================================================================
  // VUE 1 : ÉCRAN DE CONNEXION ADMINISTRATEUR DÉDIÉ (ÉLÉGANT, CENTRÉ, CLAIR)
  // =========================================================================
  if (currentView === "admin_login") {
    return (
      <div className="admin-login-screen">
        <div className="ambient-container" aria-hidden="true">
          <div className="ambient-grid"></div>
          <div className="ambient-orb orb-1"></div>
        </div>

        <div className="admin-login-card">
          <div className="login-lock-badge">🔐</div>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.45rem", fontWeight: 700, color: "#fff" }}>
              Espace Administrateur
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.35rem" }}>
              Gestion de vitrine réservée à {profile.name}.
            </p>
          </div>

          <form onSubmit={handleAdminLogin}>
            <div className="form-row">
              <label className="form-label">Mot de passe secret</label>
              <div className="password-input-group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="form-input" 
                  placeholder="Entrez votre mot de passe..." 
                  value={adminPasswordInput}
                  onChange={(e) => {
                    setAdminPasswordInput(e.target.value);
                    if (adminPasswordError) setAdminPasswordError("");
                  }}
                  autoFocus
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="password-toggle-btn"
                  title={showPassword ? "Masquer" : "Afficher"}
                >
                  {showPassword ? "👁️‍🗨️" : "👁️"}
                </button>
              </div>

              {adminPasswordError && (
                <div style={{ background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.35)", borderRadius: "8px", padding: "0.5rem 0.75rem", color: "#f87171", fontSize: "0.8rem", marginTop: "0.6rem" }}>
                  ⚠️ {adminPasswordError}
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "0.75rem", marginTop: "0.75rem" }}>
              Déverrouiller l'Administration →
            </button>
          </form>

          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <button 
              onClick={() => {
                setCurrentView("portfolio");
                window.location.hash = "";
              }}
              style={{ color: "var(--text-muted)", fontSize: "0.82rem", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}
            >
              ← Retourner au Portfolio Public
            </button>
          </div>
        </div>

        {toast && <div className="toast-box">✓ {toast}</div>}
      </div>
    );
  }

  // =========================================================================
  // VUE 2 : TABLEAU DE BORD ADMINISTRATEUR (DÉDIÉ, RESPONSIVE, SANS CHEVAUCHEMENT)
  // =========================================================================
  if (currentView === "admin" && isAdmin) {
    return (
      <div className="admin-page-view">
        {/* Barre du haut Administration */}
        <header className="admin-top-bar">
          <div className="admin-brand">
            <span className="brand-badge">BL</span>
            <span style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>{profile.name}</span>
            <span className="admin-badge-pill">Dashboard Admin</span>
          </div>

          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
            <button 
              onClick={() => {
                setCurrentView("portfolio");
                window.location.hash = "";
              }} 
              className="btn btn-sm btn-secondary"
            >
              ← Voir Portfolio Public
            </button>
            <button 
              onClick={handleOpenNewProject} 
              className="btn btn-sm btn-primary"
            >
              + Ajouter un Projet
            </button>
            <button 
              onClick={handleAdminLogout} 
              className="btn btn-sm btn-danger"
            >
              Déconnexion
            </button>
          </div>
        </header>

        <div className="admin-container">
          <div className="admin-header-box">
            <div>
              <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.65rem", fontWeight: 800, color: "#fff" }}>
                Gestionnaire de Projets & Profil
              </h1>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginTop: "0.2rem" }}>
                Gérez vos réalisations et coordonnées. Les mises à jour s'appliquent immédiatement sur votre portfolio.
              </p>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="admin-stats-summary">
            <div className="admin-stat-card">
              <div className="admin-stat-icon">💼</div>
              <div>
                <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff" }}>{projects.length}+</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Projets Réalisés</div>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon">⚡</div>
              <div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>Full-Stack</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>React, Laravel & PostgreSQL</div>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon">📍</div>
              <div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>Bénin</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Cotonou (Akpakpa)</div>
              </div>
            </div>
          </div>

          {/* Section Liste des Projets */}
          <div className="admin-section-box">
            <div className="admin-box-title">
              <div>
                <span>Mes Projets en Vitrine ({projects.length}+)</span>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 400, marginTop: "0.15rem" }}>
                  Cliquez sur "Modifier" pour changer l'icône, le texte ou la stack.
                </div>
              </div>

              <button onClick={handleOpenNewProject} className="btn btn-sm btn-primary">
                + Nouveau Projet
              </button>
            </div>

            <div className="admin-projects-list">
              {projects.map((proj) => (
                <div key={proj.id} className="admin-project-item">
                  <div className="admin-item-info">
                    <div className="project-icon-box" style={{ width: 44, height: 44, fontSize: "1.3rem", flexShrink: 0 }}>
                      {proj.icon || "💻"}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                        <span>{proj.title}</span>
                        <span className="project-card-badge">{proj.badge}</span>
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                        {proj.stack && proj.stack.join(" · ")}
                      </div>
                    </div>
                  </div>

                  <div className="admin-item-actions">
                    <button 
                      onClick={() => handleEditProject(proj)} 
                      className="btn btn-sm btn-secondary"
                    >
                      ✏️ Modifier
                    </button>
                    <button 
                      onClick={() => handleDeleteProject(proj.id)} 
                      className="btn btn-sm btn-danger"
                      title="Supprimer le projet"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section Profil & Coordonnées */}
          <div className="admin-section-box">
            <div className="admin-box-title">
              <div>
                <span>Coordonnées & Biographie</span>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 400, marginTop: "0.15rem" }}>
                  Mettez à jour vos coordonnées WhatsApp, Email ou bio.
                </div>
              </div>
              <button onClick={() => setProfileEditorOpen(true)} className="btn btn-sm btn-secondary">
                ✏️ Modifier mes Coordonnées
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
              <div style={{ background: "#111a2d", padding: "0.85rem", borderRadius: "8px" }}>
                <span className="form-label">Nom :</span>
                <span style={{ color: "#fff", fontWeight: 600 }}>{profile.name}</span>
              </div>
              <div style={{ background: "#111a2d", padding: "0.85rem", borderRadius: "8px" }}>
                <span className="form-label">Email :</span>
                <span style={{ color: "#fff", fontWeight: 600 }}>{profile.email}</span>
              </div>
              <div style={{ background: "#111a2d", padding: "0.85rem", borderRadius: "8px" }}>
                <span className="form-label">WhatsApp :</span>
                <span style={{ color: "#fff", fontWeight: 600 }}>{profile.phone}</span>
              </div>
              <div style={{ background: "#111a2d", padding: "0.85rem", borderRadius: "8px" }}>
                <span className="form-label">Localisation :</span>
                <span style={{ color: "#fff", fontWeight: 600 }}>{profile.location}</span>
              </div>
            </div>
          </div>

          {/* Section Sauvegarde */}
          <div className="admin-section-box" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ fontWeight: 700, color: "#fff", marginBottom: "0.2rem" }}>Sauvegarde & Restauration</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Exportez vos données en JSON ou rétablissez les 5 projets authentiques d'origine.
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              <button onClick={handleExportJSON} className="btn btn-sm btn-secondary">
                📥 Exporter JSON
              </button>
              <button onClick={handleResetDefaults} className="btn btn-sm btn-secondary">
                ↺ Rétablir les 5 Projets
              </button>
            </div>
          </div>
        </div>

        {/* MODALE FORMULAIRE PROJET DÉDIÉE (ADMIN, 100% RESPONSIVE) */}
        {editorModalOpen && editingProject && (
          <div className="modal-overlay" onClick={() => setEditorModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <h3 className="modal-title">
                    {projects.some(p => p.id === editingProject.id) ? "Modifier le Projet" : "Ajouter un Nouveau Projet"}
                  </h3>
                  <p className="modal-subtitle">Remplissez les informations ci-dessous pour actualiser la vitrine</p>
                </div>
                <button className="modal-close" onClick={() => setEditorModalOpen(false)}>✕</button>
              </div>

              <form onSubmit={handleSaveProject} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
                <div className="modal-body">
                  <div className="form-row">
                    <label className="form-label">Titre du Projet *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={editingProject.title}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      placeholder="ex. CrediFlow — Tontine Entreprises"
                      required 
                    />
                  </div>

                  <div className="form-grid-2">
                    <div className="form-row">
                      <label className="form-label">Catégorie *</label>
                      <select 
                        className="form-input"
                        value={editingProject.category}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                      >
                        <option value="fullstack">Full-Stack</option>
                        <option value="web">Web & Logiciel</option>
                        <option value="mobile">Application Mobile</option>
                      </select>
                    </div>

                    <div className="form-row">
                      <label className="form-label">Badge / Sous-titre *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={editingProject.badge}
                        onChange={(e) => setEditingProject({ ...editingProject, badge: e.target.value })}
                        placeholder="ex. Fintech & Épargne"
                        required 
                      />
                    </div>
                  </div>

                  {/* Sélecteur d'icône interactif visuel */}
                  <div className="form-row">
                    <label className="form-label">Icône Représentative (cliquez sur une icône pour la choisir)</label>
                    <div className="icon-picker-container">
                      <div className="icon-picker-grid">
                        {availableIcons.map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className={`icon-picker-btn ${editingProject.icon === item.icon ? "active" : ""}`}
                            onClick={() => setEditingProject({ ...editingProject, icon: item.icon })}
                            title={item.label}
                          >
                            {item.icon}
                          </button>
                        ))}
                      </div>
                      <div className="icon-selected-badge">
                        <span>Icône sélectionnée : <strong>{editingProject.icon || "💻"}</strong></span>
                        <span>({availableIcons.find(i => i.icon === (editingProject.icon || "💻"))?.label || "Général"})</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <label className="form-label">Description Courte (1-2 phrases pour la carte du portfolio) *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={editingProject.shortDescription}
                      onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                      placeholder="Une phrase concise et percutante..."
                      required 
                    />
                    <span className="form-helper">Cette description apparaît directement sur la carte dans la liste des projets.</span>
                  </div>

                  <div className="form-row">
                    <label className="form-label">Description Complète (affichée en détail) *</label>
                    <textarea 
                      className="form-input" 
                      rows="3"
                      value={editingProject.fullDescription}
                      onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                      placeholder="Expliquez la problématique résolue, le contexte et la valeur ajoutée..."
                      required 
                    />
                  </div>

                  <div className="form-grid-2">
                    <div className="form-row">
                      <label className="form-label">Technologies (séparées par une virgule) *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={editingProject.stack}
                        onChange={(e) => setEditingProject({ ...editingProject, stack: e.target.value })}
                        placeholder="React, PHP, Laravel, PostgreSQL"
                        required 
                      />
                    </div>

                    <div className="form-row">
                      <label className="form-label">Lien GitHub ou Démo *</label>
                      <input 
                        type="url" 
                        className="form-input" 
                        value={editingProject.githubUrl}
                        onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value, liveUrl: e.target.value })}
                        placeholder="https://github.com/Benloko/..."
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <label className="form-label">Points Clés & Défis Résolus (un par ligne)</label>
                    <textarea 
                      className="form-input" 
                      rows="3"
                      value={editingProject.challenges}
                      onChange={(e) => setEditingProject({ ...editingProject, challenges: e.target.value })}
                      placeholder="Défi 1 : Modélisation des bases de données...&#10;Défi 2 : Sécurisation des flux financiers..."
                    />
                    <span className="form-helper">Chaque ligne deviendra une puce dans la fiche détaillée du projet.</span>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" onClick={() => setEditorModalOpen(false)} className="btn btn-secondary">
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-primary">
                    💾 Enregistrer le Projet
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODALE ÉDITEUR DE PROFIL */}
        {profileEditorOpen && (
          <div className="modal-overlay" onClick={() => setProfileEditorOpen(false)}>
            <div className="modal-content" style={{ maxWidth: 540 }} onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <h3 className="modal-title">Modifier mes Coordonnées</h3>
                  <p className="modal-subtitle">Ces informations sont visibles sur le portfolio public</p>
                </div>
                <button className="modal-close" onClick={() => setProfileEditorOpen(false)}>✕</button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                setProfileEditorOpen(false);
                showToast("Coordonnées enregistrées !");
              }} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
                <div className="modal-body">
                  <div className="form-grid-2">
                    <div className="form-row">
                      <label className="form-label">Nom Complet *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        required 
                      />
                    </div>

                    <div className="form-row">
                      <label className="form-label">Localisation *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <label className="form-label">Titre Professionnel *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={profile.title}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                      required 
                    />
                  </div>

                  <div className="form-grid-2">
                    <div className="form-row">
                      <label className="form-label">Email Professionnel *</label>
                      <input 
                        type="email" 
                        className="form-input" 
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        required 
                      />
                    </div>

                    <div className="form-row">
                      <label className="form-label">WhatsApp / Téléphone *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value, whatsappUrl: `https://wa.me/${e.target.value.replace(/\D/g, '')}` })}
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <label className="form-label">Biographie Professionnelle *</label>
                    <textarea 
                      className="form-input" 
                      rows="4"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      required 
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" onClick={() => setProfileEditorOpen(false)} className="btn btn-secondary">
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-primary">
                    💾 Sauvegarder les Coordonnées
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {toast && <div className="toast-box">✓ {toast}</div>}
      </div>
    );
  }

  // =========================================================================
  // VUE 2 : PORTFOLIO PUBLIC (100% PROPRE, AUCUN CHEVAUCHEMENT DE HEADERS)
  // =========================================================================
  return (
    <div className="portfolio-app">
      {/* Arrière-plan subtil */}
      <div className="ambient-container" aria-hidden="true">
        <div className="ambient-grid"></div>
        <div className="ambient-orb orb-1"></div>
        <div className="ambient-orb orb-2"></div>
      </div>

      {/* Barre de navigation épurée */}
      <header className="navbar-wrapper">
        <nav className="navbar" aria-label="Navigation principale">
          <a href="#hero" className="nav-brand">
            <span className="brand-badge">BL</span>
            <span>{profile.name}</span>
          </a>

          <ul className="nav-menu">
            <li><a href="#hero" className="nav-link">Accueil</a></li>
            <li><a href="#about" className="nav-link">À Propos</a></li>
            <li><a href="#skills" className="nav-link">Compétences</a></li>
            <li><a href="#projects" className="nav-link">Projets (5+)</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>

          <div className="nav-actions">
            <a href={profile.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              WhatsApp
            </a>
            <button 
              className={`nav-toggle ${mobileMenuOpen ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu de navigation"
              aria-expanded={mobileMenuOpen}
            >
              <span className="nav-toggle-bar"></span>
              <span className="nav-toggle-bar"></span>
              <span className="nav-toggle-bar"></span>
            </button>
          </div>
        </nav>

        {/* Menu Déroulant Mobile */}
        {mobileMenuOpen && (
          <div className="mobile-nav-menu">
            <a href="#hero" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              <span>🏠</span>
              <span>Accueil</span>
            </a>
            <a href="#about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              <span>👨‍💻</span>
              <span>À Propos</span>
            </a>
            <a href="#skills" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              <span>⚡</span>
              <span>Compétences</span>
            </a>
            <a href="#projects" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              <span>💼</span>
              <span>Projets (5+)</span>
            </a>
            <a href="#contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              <span>📬</span>
              <span>Contact</span>
            </a>

            <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", marginTop: "0.5rem", paddingTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <a 
                href={profile.whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-whatsapp"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Discuter sur WhatsApp
              </a>
              <a 
                href="#admin" 
                className="mobile-nav-link"
                style={{ fontSize: "0.8rem", color: "var(--text-muted)", justifyContent: "center" }}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  if (isAdmin) {
                    setCurrentView("admin");
                  } else {
                    setCurrentView("admin_login");
                  }
                }}
              >
                🔒 Espace Administration
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* SECTION HÉRO */}
        <section id="hero" className="hero-section">
          <div className="container">
            <div className="hero-pill">
              <span className="status-dot"></span>
              <span>{profile.location} · Disponible pour projets & opportunités</span>
            </div>

            <h1 className="hero-title">
              Salut, je suis <span className="text-gradient">{profile.name}</span>
            </h1>

            <p className="hero-subtitle">
              {profile.title}
            </p>

            <p className="hero-bio">
              {profile.bio}
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                Explorer mes Projets (5+)
              </a>
              <a href={profile.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                Discuter sur WhatsApp
              </a>
              <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                GitHub Profile
              </a>
            </div>

            <div className="hero-stats-row">
              <div className="stat-box">
                <span className="stat-num">5+</span>
                <span className="stat-desc">Projets Réalisés</span>
              </div>
              <div className="stat-box">
                <span className="stat-num">Full-Stack</span>
                <span className="stat-desc">React & Laravel</span>
              </div>
              <div className="stat-box">
                <span className="stat-num">Bénin</span>
                <span className="stat-desc">Cotonou & Remote</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION PROJETS (STYLE COMPACT, LÉGER, PRO) */}
        <section id="projects" className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Réalisations</span>
              <h2 className="section-title">Mes Projets Réels</h2>
              <p className="section-description">
                Solutions d'ingénierie concrètes développées pour la fintech, la mobilité, les RH et l'associatif.
              </p>
            </div>

            {/* Filtres épurés */}
            <div className="project-filter-tabs">
              <button 
                onClick={() => setActiveFilter("all")} 
                className={`filter-tab ${activeFilter === "all" ? "active" : ""}`}
              >
                Tous les Projets (5+)
              </button>
              <button 
                onClick={() => setActiveFilter("fullstack")} 
                className={`filter-tab ${activeFilter === "fullstack" ? "active" : ""}`}
              >
                Full-Stack & Fintech
              </button>
              <button 
                onClick={() => setActiveFilter("web")} 
                className={`filter-tab ${activeFilter === "web" ? "active" : ""}`}
              >
                Web & RH / Associatif
              </button>
            </div>

            {/* Grille de cartes légères */}
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <article key={project.id} className="project-card">
                  <div className="project-card-header">
                    <div className="project-icon-box">
                      {project.icon || "💻"}
                    </div>
                    <span className="project-card-badge">{project.badge}</span>
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.shortDescription}</p>

                  <div className="project-tech-tags">
                    {project.stack && project.stack.map((t, idx) => (
                      <span key={idx} className="tech-tag">{t}</span>
                    ))}
                  </div>

                  <div className="project-footer-actions">
                    <button 
                      onClick={() => setProjectModal(project)} 
                      className="btn btn-primary btn-sm"
                    >
                      Détails
                    </button>
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-secondary btn-sm"
                    >
                      GitHub
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION À PROPOS */}
        <section id="about" className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Parcours</span>
              <h2 className="section-title">Développeur & Partage d'Expérience</h2>
              <p className="section-description">
                Concevoir des applications utiles et partager la passion du développement web.
              </p>
            </div>

            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: 14, padding: "1.75rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
              <p style={{ marginBottom: "1rem" }}>
                Je m'appelle <strong>{profile.name}</strong>, développeur full-stack résidant à Cotonou (Akpakpa) au Bénin.
              </p>
              <p style={{ marginBottom: "1rem" }}>
                Je me concentre sur la création d'applications web pragmatiques : concevoir des interfaces réactives et intuitives avec <strong>React</strong> et développer des back-ends solides, performants et sécurisés avec <strong>PHP / Laravel</strong> et <strong>PostgreSQL</strong>.
              </p>
              <p>
                En parallèle, j'aime vulgariser le code et partager des retours d'expérience concrets avec d'autres passionnés de technologie sur les réseaux sociaux.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION COMPÉTENCES */}
        <section id="skills" className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Stack</span>
              <h2 className="section-title">Compétences Techniques</h2>
            </div>

            <div className="skills-grid">
              <div className="skill-card">
                <div className="skill-card-title">🖥️ Front-End</div>
                <div className="skill-pills">
                  <span className="skill-pill">React</span>
                  <span className="skill-pill">JavaScript (ES6+)</span>
                  <span className="skill-pill">TypeScript</span>
                  <span className="skill-pill">HTML5 / CSS3</span>
                  <span className="skill-pill">Tailwind CSS</span>
                </div>
              </div>

              <div className="skill-card">
                <div className="skill-card-title">⚙️ Back-End & APIs</div>
                <div className="skill-pills">
                  <span className="skill-pill">PHP</span>
                  <span className="skill-pill">Laravel</span>
                  <span className="skill-pill">APIs REST</span>
                  <span className="skill-pill">Node.js (Bases)</span>
                  <span className="skill-pill">Architecture MVC</span>
                </div>
              </div>

              <div className="skill-card">
                <div className="skill-card-title">🗄️ Données & Outils</div>
                <div className="skill-pills">
                  <span className="skill-pill">PostgreSQL</span>
                  <span className="skill-pill">MySQL</span>
                  <span className="skill-pill">Git & GitHub</span>
                  <span className="skill-pill">Docker (Bases)</span>
                  <span className="skill-pill">VS Code</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION CONTACT */}
        <section id="contact" className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Contact</span>
              <h2 className="section-title">Me Contacter</h2>
              <p className="section-description">
                Disponible pour échanger sur vos projets ou opportunités professionnelles.
              </p>
            </div>

            <div className="contact-grid">
              <div className="contact-info-list">
                <a href={profile.whatsappUrl} target="_blank" rel="noopener noreferrer" className="contact-item">
                  <div>
                    <div className="contact-label">WhatsApp Direct</div>
                    <div className="contact-value" style={{ color: "#4ade80" }}>{profile.phone}</div>
                  </div>
                  <span className="btn btn-sm btn-whatsapp">Écrire</span>
                </a>

                <div className="contact-item">
                  <div>
                    <div className="contact-label">Email</div>
                    <div className="contact-value">{profile.email}</div>
                  </div>
                  <button onClick={handleCopyEmail} className="btn btn-sm btn-secondary">
                    Copier
                  </button>
                </div>

                <div className="contact-item">
                  <div>
                    <div className="contact-label">Localisation</div>
                    <div className="contact-value">{profile.location}</div>
                  </div>
                </div>

                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="contact-item">
                  <div>
                    <div className="contact-label">GitHub</div>
                    <div className="contact-value">github.com/Benloko</div>
                  </div>
                  <span className="btn btn-sm btn-secondary">Visiter</span>
                </a>
              </div>

              {/* Formulaire léger */}
              <div className="contact-form">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  showToast("Message envoyé ! Bénoît vous répondra rapidement.");
                  e.target.reset();
                }}>
                  <div className="form-row">
                    <label>Nom ou Entreprise</label>
                    <input type="text" className="form-input" placeholder="ex. Patrice Agossou" required />
                  </div>

                  <div className="form-row">
                    <label>Votre Email</label>
                    <input type="email" className="form-input" placeholder="patrice@domaine.com" required />
                  </div>

                  <div className="form-row">
                    <label>Message</label>
                    <textarea className="form-input" placeholder="Votre message ou proposition..." required></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-sm" style={{ width: "100%", padding: "0.65rem" }}>
                    Envoyer le Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* PIED DE PAGE DISCRET (AVEC ACCÈS ADMIN CACHÉ) */}
      <footer className="footer">
        <div className="container footer-content">
          <div>
            © {new Date().getFullYear()} {profile.name} — Développeur Full-Stack (Cotonou, Bénin).
          </div>
          <div>
            <a 
              href="#admin" 
              onClick={(e) => {
                e.preventDefault();
                if (isAdmin) {
                  setCurrentView("admin");
                } else {
                  setCurrentView("admin_login");
                }
              }}
              style={{ opacity: 0.5, fontSize: "0.8rem", textDecoration: "none", color: "var(--text-muted)", cursor: "pointer" }}
              title="Accès Administrateur"
            >
              🔒 Administration
            </a>
          </div>
        </div>
      </footer>

      {/* BOUTON FLOTTANT DISCRET POUR REPASSER SUR L'ADMIN SI CONNECTÉ */}
      {isAdmin && (
        <button 
          onClick={() => setCurrentView("admin")} 
          className="admin-floating-pill"
          title="Ouvrir le panneau d'administration"
        >
          ⚙️ Espace Admin
        </button>
      )}

      {/* MODALE DÉTAILS PROJET */}
      {projectModal && (
        <div className="modal-overlay" onClick={() => setProjectModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontSize: "1.8rem" }}>{projectModal.icon || "💻"}</span>
                <div>
                  <span className="project-card-badge">{projectModal.badge}</span>
                  <h3 className="modal-title" style={{ marginTop: "0.2rem" }}>
                    {projectModal.title}
                  </h3>
                </div>
              </div>
              <button className="modal-close" onClick={() => setProjectModal(null)}>✕</button>
            </div>

            <div className="modal-body">
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                {projectModal.fullDescription}
              </p>

              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--cyan-400)", marginBottom: "0.4rem" }}>Technologies :</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {projectModal.stack && projectModal.stack.map((t, idx) => (
                    <span key={idx} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>

              {projectModal.challenges && (
                <div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--cyan-400)", marginBottom: "0.4rem" }}>Points Clés & Défis Résolus :</div>
                  <ul style={{ paddingLeft: "1.2rem", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {projectModal.challenges.map((c, idx) => (
                      <li key={idx} style={{ marginBottom: "0.35rem" }}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button onClick={() => setProjectModal(null)} className="btn btn-secondary btn-sm">
                Fermer
              </button>
              <a href={projectModal.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                Consulter sur GitHub →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <div className="toast-box">✓ {toast}</div>}
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
