import type { Translation } from "./en";

/** Français. */
export const fr: Translation = {
  meta: {
    title: "JobHooker – Trouvez vite l’emploi qu’il vous faut",
    description:
      "JobHooker collecte les offres d’Upwork, Y Combinator, LinkedIn et d’autres, évalue chaque poste selon votre profil et rédige la lettre de motivation. Consultation libre des offres, sans compte.",
  },

  language: {
    label: "Langue",
    en: "Anglais",
    zh: "Chinois",
    fr: "Français",
  },

  common: {
    search: "Rechercher",
    cancel: "Annuler",
    back: "Retour",
    next: "Suivant",
    add: "Ajouter",
    remove: "Supprimer",
    loading: "Chargement…",
    tryAgain: "Réessayer",
    close: "Fermer",
    notAvailable: "N/D",
  },

  nav: {
    homeAria: "Accueil JobHooker",
    browseJobs: "Voir les offres",
    signIn: "Se connecter",
    getStarted: "Commencer",
    privacy: "Confidentialité",
    backToSite: "Retour au site",
  },

  hero: {
    titleLine1: "Arrêtez de chercher.",
    titleLine2: "Commencez à sélectionner.",
    subtitle:
      "JobHooker rassemble les offres d’Upwork, Y Combinator, LinkedIn et bien d’autres dans un seul flux, évalue chacune d’elles selon votre profil et rédige la lettre de motivation avant même que vous n’ouvriez l’annonce.",
    bulletFeed: "Toutes les grandes plateformes réunies dans un seul flux",
    bulletScores:
      "Des scores de correspondance, pour ne postuler que là où vous collez",
    bulletDocuments:
      "Lettres de motivation, CV et propositions Upwork rédigés pour vous",
    bulletAlerts: "Alertes instantanées sur Telegram et par e-mail",
    bulletInterview: "Préparation à l’entretien générée pour chaque poste",
    ctaPrimary: "Commencer gratuitement",
    ctaSecondary: "Voir les offres gratuitement",
    noCard:
      "Aucune carte bancaire requise — consulter les offres ne demande aucun compte.",
    boardsLabel: "Les plateformes que nous suivons, en direct",
    metaUpwork: "Missions freelance",
    metaFiverr: "Briefs de projet",
    metaYC: "Postes en start-up",
    metaLinkedIn: "Emplois à temps plein",
    metaIndeed: "Offres du monde entier",
    metaGlassdoor: "Salaires vérifiés",
    moreBoards:
      "+ CareerBuilder, Wellfound et d’autres plateformes ajoutées chaque semaine.",
  },

  jobs: {
    eyebrow: "Consultation libre",
    title: "Des offres ouvertes, sans créer de compte",
    subtitle:
      "Nous rassemblons des offres récentes et vérifiées venues d’Upwork, Y Combinator, LinkedIn et d’ailleurs. Parcourez-les autant que vous voulez — créez un compte gratuit lorsque vous voudrez les liens de candidature et les dossiers rédigés par l’IA.",
    searchPlaceholder: "Rechercher un poste ou une compétence",
    searchAria: "Rechercher parmi les offres",
    filterAll: "Tous les postes",
    filterRemote: "Télétravail",
    filterOnSite: "Sur site",
    positionsOne: "{{count}} poste ouvert",
    positionsOther: "{{count}} postes ouverts",
    loadError: "Impossible de charger les offres pour le moment.",
    emptyTitle: "Aucun poste ne correspond encore à cette recherche.",
    emptyBody:
      "Essayez un autre mot-clé, ou effacez les filtres pour tout afficher.",
    typeRemote: "Télétravail",
    typeOnSite: "Sur site",
    salaryUndisclosed: "Salaire non communiqué",
    unlockApply: "Débloquer le lien de candidature",
    postedToday: "Aujourd’hui",
    postedYesterday: "Hier",
    postedDaysAgo: "il y a {{count}} j",
    postedMonthsAgo: "il y a {{count}} mois",
    behindLogin: "{{count}} postes accessibles après connexion",
    readyToApply: "Prêt à postuler ?",
    ctaBody:
      "Les comptes gratuits donnent accès aux liens de candidature, aux scores de correspondance et à une lettre de motivation rédigée par l’IA pour chaque poste.",
    ctaButton: "Créer un compte gratuit",
  },

  video: {
    badge: "TUTORIEL",
    title: "Voyez comment ça marche",
    body: "Regardez notre tutoriel de 3 minutes pour comprendre comment l’IA trouve les opportunités qui vous correspondent, sans le moindre spam.",
    englishOnly: "Le tutoriel est commenté en anglais.",
    iframeTitle: "Vidéo tutoriel",
    thumbnailAlt: "Miniature de la vidéo",
  },

  how: {
    eyebrow: "Comment ça marche",
    titleBefore: "Comment ",
    titleAfter: " va vous aider ?",
    intro:
      "Créez des flux avec vos propres filtres et vos instructions pour l’IA. JobHooker rédige des lettres de motivation, des CV et des fiches d’entretien sur mesure pour chaque offre correspondant à vos flux.",
    tryItNow: "Essayer",

    feedsBadge: "Flux",
    feedsTitle: "Créez des flux avec vos propres filtres",
    feedsBody:
      "Chaque flux filtre les offres selon l’intitulé du poste, vos attentes salariales, le lieu de travail et vos compétences clés.",
    feedsPointTypes: "Taux horaire ou forfait",
    feedsPointSkills: "Compétences clés",
    feedsPointUnlimited: "Flux illimités",
    feedsPointLocation: "Lieu de travail",

    mockFeedsLabel: "FLUX",
    mockNewFeed: "Nouveau flux…",
    mockCreateFeed: "Créer un flux",
    mockFeedName: "Intégrations IA / LLM",
    mockJobType: "TYPE DE POSTE",
    mockKeySkills: "COMPÉTENCES CLÉS",
    mockHourly: "Horaire",
    mockFixed: "Forfait",
    mockFullTime: "Temps plein",
    mockAdd: "+ Ajouter",
    mockMinRate: "MIN $/H",
    mockMaxRate: "MAX $/H",
    mockCancel: "Annuler",
    mockCreateButton: "Créer le flux",

    docsBadge: "Documents IA",
    docsTitle:
      "Des lettres de motivation, CV et préparations d’entretien sur mesure — pour chaque offre.",
    docsBody:
      "Pour chaque offre correspondant à vos critères, JobHooker génère une lettre de motivation personnalisée, un CV adapté et une proposition Upwork — pour que vous arriviez toujours préparé.",
    docsPointCover: "Une lettre de motivation par offre",
    docsPointCv: "Un CV adapté à chaque poste",
    docsPointInterview: "PDF de préparation d’entretien, génériques et ciblés",
    docsPointDownload: "Téléchargement en un clic, prêt à envoyer",

    alertsBadge: "Notifications",
    alertsTitle: "Alertes instantanées sur Telegram et par e-mail.",
    alertsBody:
      "Dès qu’une offre obtient un score élevé, JobHooker l’envoie directement sur votre canal Telegram et dans votre boîte mail — avec le score, l’intitulé et un lien direct. Plus besoin de rafraîchir, plus d’occasion manquée.",
    alertsPointTelegram: "Flux sur canal Telegram",
    alertsPointEmail: "Résumé par e-mail et alertes instantanées",
    alertsPointScore: "Le score affiché dans chaque alerte",
    alertsPointLink: "Lien direct pour postuler vite",

    mockChannelName: "Alertes JobHooker",
    mockSubscribers: "{{count}} abonnés",
    mockViewApply: "Voir et postuler →",
    mockAlertJob1: "Développeur React senior",
    mockAlertJob2: "Ingénieur front-end",
    mockAlertJob3: "Développeur full stack",
    mockAlertTime1: "à l’instant",
    mockAlertTime2: "il y a 2 min",
    mockAlertTime3: "il y a 5 min",

    ctaButton: "Commencer gratuitement",
    ctaNote: "Un mois d’essai gratuit - sans carte bancaire",
  },

  footer: {
    rights: "© {{year}} Job Hooker. Tous droits réservés.",
  },

  register: {
    brandTitleBefore: "Une seule boîte pour ",
    brandTitleHighlight: "toutes les offres",
    brandTitleAfter: " qui méritent votre temps.",
    pullingFrom: "Nos sources",
    propScores: "Chaque poste évalué selon votre profil avant même de le lire",
    propDocuments: "Lettres, CV et propositions rédigés pour chaque offre",
    propAlerts:
      "Alertes Telegram et e-mail instantanées pour les nouvelles correspondances",
    quote:
      "JobHooker m’a permis d’obtenir des entretiens dans trois grandes entreprises en une semaine.",
    quoteAuthor: "— Utilisateur de la bêta",

    emailHeading: "Connectez-vous ou créez un compte",
    emailSubtitle:
      "Une adresse e-mail suffit — aucun mot de passe à retenir.",
    otpHeading: "Consultez votre boîte mail",
    otpSubtitleBefore: "Nous avons envoyé un code à {{length}} chiffres à ",
    otpSubtitleAfter: ". Il expire dans quelques minutes.",

    emailLabel: "Adresse e-mail",
    emailPlaceholder: "vous@entreprise.com",
    sendingCode: "Envoi du code…",
    continueWithEmail: "Continuer avec cet e-mail",
    sameCodeNote:
      "Nouveau ou déjà inscrit — le même code fonctionne dans les deux cas.",

    codeLabel: "Code de vérification",
    digitAria: "Chiffre {{index}} sur {{total}}",
    verifying: "Vérification…",
    verifyAndContinue: "Vérifier et continuer",
    changeEmail: "Changer d’e-mail",
    resendIn: "Renvoyer dans {{seconds}} s",
    resendCode: "Renvoyer le code",

    sendFailed:
      "Nous n’avons pas pu envoyer cet e-mail. Vérifiez l’adresse et réessayez.",
    codeInvalid: "Ce code est invalide ou a expiré. Demandez-en un nouveau.",

    termsBefore: "En continuant, vous acceptez notre ",
    termsLink: "politique de confidentialité",
    termsAfter: ".",
  },

  privacy: {
    title: "Politique de confidentialité",
    lastUpdated: "Dernière mise à jour : 10 janvier 2026",
    intro:
      "La présente politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous utilisez notre application et les services associés (le « Service »). En utilisant le Service, vous acceptez la collecte et l’utilisation d’informations conformément à cette politique.",

    collectHeading: "1. Informations que nous collectons",
    personalHeading: "1.1 Informations personnelles",
    personalEmail: "Adresse e-mail",
    personalName: "Nom ou nom d’utilisateur",
    personalAuth:
      "Données d’authentification (code à usage unique ou jetons de connexion)",

    usageHeading: "1.2 Données d’utilisation",
    usageDevice: "Type d’appareil et système d’exploitation",
    usageBrowser: "Type et version du navigateur",
    usageIp: "Adresse IP",
    usagePages: "Pages consultées et actions effectuées",
    usageTime: "Date et heure d’accès",

    cookiesHeading: "1.3 Cookies et traceurs",
    cookiesBody:
      "Nous pouvons utiliser des cookies ou des technologies similaires pour maintenir les sessions, améliorer les performances et analyser l’usage.",

    useHeading: "2. Comment nous utilisons vos informations",
    useProvide: "Fournir et maintenir le Service",
    useAuth: "Authentification et sécurité (code à usage unique)",
    useImprove: "Améliorer et optimiser le Service",
    useCommunicate: "Communiquer les mises à jour importantes",
    useFraud: "Prévenir la fraude et les abus",

    sharingHeading: "3. Partage des informations",
    sharingBody:
      "Nous ne vendons pas vos informations personnelles. Nous ne partageons de données qu’avec des prestataires de confiance, pour répondre à des obligations légales ou lors d’un transfert d’activité.",

    securityHeading: "4. Sécurité des données",
    securityBody:
      "Nous appliquons des mesures de sécurité raisonnables pour protéger vos données. Aucun système n’est toutefois totalement sûr.",

    retentionHeading: "5. Conservation des données",
    retentionBody:
      "Nous conservons les données personnelles uniquement le temps nécessaire aux finalités décrites dans cette politique.",

    rightsHeading: "6. Vos droits",
    rightsBody:
      "Vous pouvez demander l’accès à vos données, leur correction ou leur suppression, ou limiter leur traitement lorsque cela s’applique.",

    childrenHeading: "7. Protection des mineurs",
    childrenBody:
      "Le Service ne s’adresse pas aux enfants de moins de 13 ans et nous ne collectons pas sciemment leurs données.",

    changesHeading: "8. Modifications de cette politique",
    changesBody:
      "Nous pouvons mettre à jour cette politique de temps à autre. Continuer à utiliser le Service vaut acceptation des modifications.",

    contactHeading: "9. Nous contacter",
    contactBody:
      "Si vous avez des questions sur cette politique de confidentialité, contactez-nous à :",
  },

  dashboard: {
    title: "Tableau de bord",
    subtitle: "Vue d’ensemble de votre recherche d’emploi",
    statHighScore: "Correspondances élevées",
    statToday: "Nouvelles aujourd’hui",
    statWeek: "Nouvelles cette semaine",

    panelTitle: "Offres — {{feed}}",
    panelFallbackFeed: "Flux",
    panelSubtitle: "Résultats collectés",
    collapsePanel: "Replier le panneau des offres",
    expandPanel: "Déplier le panneau des offres",

    detailPlatform: "Plateforme :",
    detailCompany: "Entreprise :",
    detailLocation: "Lieu :",
    detailExperience: "Expérience :",
    detailJobType: "Type de poste :",
    detailDescription: "Description",
    unknownCompany: "Entreprise inconnue",
    remoteFallback: "Télétravail",
    experienceUnspecified: "Non précisée",
    noDescription: "Aucune description disponible.",

    feedSelectedTitle: "Flux {{feed}} sélectionné",
    feedSelectedBody:
      "Le flux de collecte est entièrement synchronisé. Toutes les correspondances sont traitées et classées dans votre base locale.",
    openJobsPanel: "Ouvrir la liste des offres",
    configureNotifications: "Configurer les notifications",

    noFeedTitle: "Aucun flux sélectionné",
    noFeedBody:
      "Sélectionnez un flux dans le panneau de gauche pour voir les offres, ou créez un nouveau flux pour commencer.",

    proposalTitle: "Proposition Upwork",
    proposalGeneratedFor: "Générée pour : ",
    proposalLabel: "Texte de la proposition (modifiable)",
    proposalPlaceholder: "Modifiez ici la proposition générée par l’IA...",
    proposalWaiting: "En attente de la génération de la proposition...",
    proposalCopy: "Copier dans le presse-papiers",
  },

  jobList: {
    searchPlaceholder: "Rechercher par intitulé de poste...",
    clearSearch: "Effacer la recherche",
    foundOne: "{{count}} offre trouvée",
    foundOther: "{{count}} offres trouvées",
    emptyTitle: "Aucune offre ne correspond à vos critères.",
    emptyBody: "Essayez d’ajuster vos filtres ou vos mots-clés.",
  },

  jobCard: {
    typeRemote: "Télétravail",
    typeOnSite: "Sur site",
    typeHybrid: "Hybride",
    typeContract: "Contrat",
    optionDescription: "Description",
    optionCv: "CV",
    optionProposal: "Proposition",
    optionPitchVideo: "Vidéo de présentation",
    optionYcInterview: "Entretien YC",
    optionCoverLetter: "Lettre de motivation",
    generate: "Générer",
    applyNow: "Postuler",
  },

  feeds: {
    createFeed: "Créer un flux",
    editFeedTitle: "Modifier le flux ⚙️",
    createFeedTitle: "Créer un flux ✨",
    updateFeed: "Mettre à jour le flux",
    saving: "Enregistrement...",
    step1: "Étape 1",
    step2: "Étape 2",
    stepBack: "← Retour",
    stepNext: "Suivant →",

    editTooltip: "Modifier le flux",
    deleteTooltip: "Supprimer le flux",
    experience: "Expérience :",
    years: "{{count}} an(s)",
    confirmDelete: "Voulez-vous vraiment supprimer ce flux ?",

    fieldRole: "Choisir un poste",
    fieldExperience: "Expérience",
    fieldPlatforms: "Plateformes",
    platformsPlaceholder: "Choisir des plateformes",
    fieldType: "Type",
    fieldCountry: "Pays",
    fieldSkills: "Compétences",
    skillsPlaceholder: "Choisir les compétences pertinentes",
    fieldSalaryType: "Type de rémunération",
    fieldSalary: "Rémunération",
    salaryFixed: "Forfait",
    salaryHourly: "Taux horaire",
    salaryMinPlaceholder: "Min. 5 000",
    hourlyRateFormat: "{{value}} $/h",

    errorTitle: "L’intitulé est obligatoire",
    errorExperience: "L’expérience est obligatoire",
    errorLocation: "Le lieu est obligatoire",
    errorSalary: "Saisissez une rémunération valide (nombre positif)",
    errorSave: "Échec de l’enregistrement du flux",

    typeRemote: "Télétravail",
    typeOnSite: "Sur site",
    typeHybrid: "Hybride",
    typeContract: "Contrat",
  },

  dropdown: {
    placeholder: "Choisir une option",
    noOptions: "Aucune option disponible",
  },

  actions: {
    notificationSettings: "Paramètres de notification",
    signOut: "Se déconnecter",
    billing: "Facturation",
  },

  notifications: {
    title: "Paramètres de notification",
    telegram: "Telegram",
    telegramConnected: "Connecté",
    telegramNotConnected: "Non connecté",
    telegramEnabled: "Activé",
    telegramConnect: "Connecter",
    email: "E-mail",
    emailSubscribed: "Abonné",
    emailNotSubscribed: "Non abonné",
    unsubscribe: "Se désabonner",
    subscribe: "S’abonner",
  },

  billing: {
    title: "Facturation et abonnement",
    planFree: "Gratuit",
    planPro: "Pro",
    periodFree: "par 12 h",
    periodPro: "par mois",
    freeFeature1: "10 offres par flux",
    freeFeature2: "Candidature manuelle uniquement",
    proFeature1: "40 offres par flux toutes les 2 h",
    proFeature2: "Générateur de propositions",
    proFeature3: "Candidature automatique",
    inDevelopment: "En développement 🔧",
    footnote:
      "Le système d’abonnement est en cours de développement. De nouvelles fonctionnalités arrivent bientôt !",
  },

  profile: {
    title: "Votre profil",
    stepOf: "Étape {{step}} sur 2",
    subtitle: "Utilisé par l’IA pour générer des documents personnalisés",

    sectionBasic: "Informations de base",
    labelName: "Nom",
    placeholderName: "Jean Dupont",
    labelEmail: "E-mail de contact",
    placeholderEmail: "jean@exemple.com",
    labelWebsite: "Site web",
    placeholderWebsite: "https://votresite.com",
    labelOtherLink: "Autre lien",
    placeholderOtherLink: "GitHub, LinkedIn, etc.",

    sectionDescription: "Présentation",
    labelAbout: "À propos de vous",
    placeholderAbout:
      "Décrivez brièvement qui vous êtes, vos spécialités, votre parcours et vos ambitions professionnelles...",

    sectionExperience: "Expérience professionnelle",
    placeholderCompany: "Entreprise",
    placeholderRole: "Poste / intitulé",
    placeholderExperienceDescription: "Description (facultatif)",
    addExperience: "Ajouter une expérience",

    sectionEducation: "Formation",
    placeholderInstitution: "Établissement",
    placeholderDegree: "Diplôme",
    placeholderGrade: "Note (0-100)",
    addEducation: "Ajouter une formation",

    sectionSkills: "Compétences et niveau",
    labelSkills: "Ajouter des compétences professionnelles",
    placeholderSkills: "Saisissez ou choisissez des compétences...",

    sectionInterests: "Centres d’intérêt",
    placeholderInterests:
      "ex. open source, architecture cloud, informatique quantique",
    sectionCertificates: "Certifications",
    placeholderCertificates: "ex. AWS Certified Solutions Architect, PMP",
    sectionLanguages: "Langues",
    placeholderLanguages: "ex. anglais (courant), espagnol (langue maternelle)",

    durationStart: "Début",
    durationEnd: "Fin",
    durationPresent: "En cours",

    errorName: "Le nom est obligatoire",
    errorDescription: "La présentation est obligatoire",
    errorSkills: "Choisissez au moins une compétence et son niveau",
    errorGrade: "La note doit être comprise entre 0 et 100",

    nextStep: "Étape suivante",
    generating: "Génération...",
    generate: "Générer",
  },
};
