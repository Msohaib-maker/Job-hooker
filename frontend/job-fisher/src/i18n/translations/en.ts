/**
 * English is the reference dictionary: every other language is typed against
 * this object, so a missing or misspelled key is a compile error.
 *
 * Placeholders use {{name}} and are filled by `t(key, { name: value })`.
 */
export const en = {
  meta: {
    title: "JobHooker – Find Your Dream Job Fast",
    description:
      "JobHooker scrapes Upwork, Y Combinator, LinkedIn and more, scores every role against your profile, and writes the cover letter for you. Browse open roles free — no account needed.",
  },

  language: {
    label: "Language",
    en: "English",
    zh: "Chinese",
    fr: "French",
  },

  common: {
    search: "Search",
    cancel: "Cancel",
    back: "Back",
    next: "Next",
    add: "Add",
    remove: "Remove",
    loading: "Loading…",
    tryAgain: "Try again",
    close: "Close",
    notAvailable: "N/A",
  },

  nav: {
    homeAria: "JobHooker home",
    browseJobs: "Browse jobs",
    signIn: "Sign in",
    getStarted: "Get started",
    privacy: "Privacy",
    backToSite: "Back to site",
  },

  hero: {
    titleLine1: "Stop searching.",
    titleLine2: "Start shortlisting.",
    subtitle:
      "JobHooker pulls openings from Upwork, Y Combinator, LinkedIn and more into one lane, scores each against your profile, and writes the cover letter before you have even opened the tab.",
    bulletFeed: "Every major board scraped into one feed",
    bulletScores: "Match scores, so you only apply where you fit",
    bulletDocuments:
      "Cover letters, CVs and Upwork proposals written for you",
    bulletAlerts: "Instant alerts to Telegram and email",
    bulletInterview: "Interview prep generated per role",
    ctaPrimary: "Start for free",
    ctaSecondary: "Browse jobs free",
    noCard:
      "No credit card required — browsing open roles needs no account at all.",
    boardsLabel: "Boards we pull from, live",
    metaUpwork: "Freelance contracts",
    metaFiverr: "Project briefs",
    metaYC: "Startup roles",
    metaLinkedIn: "Full-time jobs",
    metaIndeed: "Global listings",
    metaGlassdoor: "Salary-backed",
    moreBoards: "+ CareerBuilder, Wellfound and more added every week.",
  },

  jobs: {
    eyebrow: "Free to browse",
    title: "Open roles, no account needed",
    subtitle:
      "We have fresh and verified openings pulled from the Upwork, Y Combinator, LinkedIn and more. Browse as much as you like — create a free account when you want apply links and AI-written applications.",
    searchPlaceholder: "Search roles or skills",
    searchAria: "Search open roles",
    filterAll: "All roles",
    filterRemote: "Remote",
    filterOnSite: "On-site",
    positionsOne: "{{count}} open position",
    positionsOther: "{{count}} open positions",
    loadError: "We could not load the job feed just now.",
    emptyTitle: "No roles match that search yet.",
    emptyBody:
      "Try a different keyword, or clear the filters to see everything.",
    typeRemote: "Remote",
    typeOnSite: "On-site",
    salaryUndisclosed: "Salary undisclosed",
    unlockApply: "Unlock apply link",
    postedToday: "Today",
    postedYesterday: "Yesterday",
    postedDaysAgo: "{{count}}d ago",
    postedMonthsAgo: "{{count}}mo ago",
    behindLogin: "{{count}} roles behind the login",
    readyToApply: "Ready to start applying?",
    ctaBody:
      "Free accounts get apply links, match scores, and AI cover letters for every role.",
    ctaButton: "Create free account",
  },

  video: {
    badge: "TUTORIAL",
    title: "See how it works",
    body: "Watch our quick 3-minute tutorial to understand how AI finds the perfect opportunities for you with zero spam.",
    englishOnly: "The tutorial is narrated in English.",
    iframeTitle: "Tutorial Video",
    thumbnailAlt: "Video Thumbnail",
  },

  how: {
    eyebrow: "How it works",
    titleBefore: "How ",
    titleAfter: " will help you?",
    intro:
      "Create feeds with your own filters and AI prompts. JobHooker creates custom cover letters, cvs and interview sheets for every job matching your feeds.",
    tryItNow: "Try it now",

    feedsBadge: "Feeds",
    feedsTitle: "Create feeds with your own filters",
    feedsBody:
      "Each feed will match the title, salary expectations, job location and key skills to filter the jobs for you.",
    feedsPointTypes: "Hourly/Fixed Types",
    feedsPointSkills: "Key skills",
    feedsPointUnlimited: "Unlimited feeds",
    feedsPointLocation: "Job Location",

    mockFeedsLabel: "FEEDS",
    mockNewFeed: "New feed…",
    mockCreateFeed: "Create a feed",
    mockFeedName: "AI / LLM integrations",
    mockJobType: "JOB TYPE",
    mockKeySkills: "KEY SKILLS",
    mockHourly: "Hourly",
    mockFixed: "Fixed",
    mockFullTime: "Full-time",
    mockAdd: "+ Add",
    mockMinRate: "MIN $/HR",
    mockMaxRate: "MAX $/HR",
    mockCancel: "Cancel",
    mockCreateButton: "Create Feed",

    docsBadge: "AI Documents",
    docsTitle:
      "Create Tailored cover letters, CVs, and interview prep — per job.",
    docsBody:
      "For every job that matches your criteria, JobHooker generates a custom cover letter, a tailored CV, and a Upwork Proposals — so you show up prepared every time.",
    docsPointCover: "Custom cover letters per job",
    docsPointCv: "Tailored CV per role",
    docsPointInterview: "Common & custom interview prep PDFs",
    docsPointDownload: "One-click download, ready to send",

    alertsBadge: "Notifications",
    alertsTitle: "Instant job alerts to Telegram and email.",
    alertsBody:
      "The moment a high-scoring job is found, JobHooker pushes it straight to your Telegram channel and inbox — with the score, title, and a direct link. No dashboard refreshing, no missed opportunities.",
    alertsPointTelegram: "Telegram channel feed",
    alertsPointEmail: "Email digest & instant alerts",
    alertsPointScore: "Score shown in every alert",
    alertsPointLink: "Direct link to apply fast",

    mockChannelName: "JobHooker Alerts",
    mockSubscribers: "{{count}} subscribers",
    mockViewApply: "View & Apply →",
    mockAlertJob1: "Senior React Developer",
    mockAlertJob2: "Frontend Engineer",
    mockAlertJob3: "Full Stack Developer",
    mockAlertTime1: "just now",
    mockAlertTime2: "2m ago",
    mockAlertTime3: "5m ago",

    ctaButton: "Get Started Free",
    ctaNote: "Free trial for a month - No credit card",
  },

  footer: {
    rights: "© {{year}} Job Hooker. All rights reserved.",
  },

  register: {
    brandTitleBefore: "One inbox for ",
    brandTitleHighlight: "every opening",
    brandTitleAfter: " worth your time.",
    pullingFrom: "Pulling from",
    propScores: "Every role scored against your profile before you read it",
    propDocuments: "Cover letters, CVs and proposals drafted per opening",
    propAlerts: "Instant Telegram and email alerts on new matches",
    quote:
      "JobHooker helped me land interviews at three top companies inside a week.",
    quoteAuthor: "— Early beta user",

    emailHeading: "Sign in or create an account",
    emailSubtitle:
      "One email address is all it takes — no password to remember.",
    otpHeading: "Check your inbox",
    otpSubtitleBefore: "We sent a {{length}}-digit code to ",
    otpSubtitleAfter: ". It expires in a few minutes.",

    emailLabel: "Email address",
    emailPlaceholder: "you@company.com",
    sendingCode: "Sending code…",
    continueWithEmail: "Continue with email",
    sameCodeNote: "New or returning — the same code does both.",

    codeLabel: "Verification code",
    digitAria: "Digit {{index}} of {{total}}",
    verifying: "Verifying…",
    verifyAndContinue: "Verify and continue",
    changeEmail: "Change email",
    resendIn: "Resend in {{seconds}}s",
    resendCode: "Resend code",

    sendFailed: "We could not send that email. Check the address and try again.",
    codeInvalid: "That code is invalid or has expired. Request a new one.",

    termsBefore: "By continuing you agree to our ",
    termsLink: "Privacy Policy",
    termsAfter: ".",
  },

  privacy: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: January 10, 2026",
    intro:
      "This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our application and related services (the “Service”). By using the Service, you agree to the collection and use of information in accordance with this policy.",

    collectHeading: "1. Information We Collect",
    personalHeading: "1.1 Personal Information",
    personalEmail: "Email address",
    personalName: "Name or username",
    personalAuth: "Authentication data (such as OTP or login tokens)",

    usageHeading: "1.2 Usage Data",
    usageDevice: "Device type and operating system",
    usageBrowser: "Browser type and version",
    usageIp: "IP address",
    usagePages: "Pages visited and actions taken",
    usageTime: "Date and time of access",

    cookiesHeading: "1.3 Cookies and Tracking",
    cookiesBody:
      "We may use cookies or similar technologies to maintain sessions, improve performance, and analyze usage patterns.",

    useHeading: "2. How We Use Your Information",
    useProvide: "Provide and maintain the Service",
    useAuth: "Authentication and security (OTP)",
    useImprove: "Improve and optimize the Service",
    useCommunicate: "Communicate important updates",
    useFraud: "Prevent fraud and abuse",

    sharingHeading: "3. Sharing of Information",
    sharingBody:
      "We do not sell your personal information. We may share data only with trusted service providers, for legal requirements, or during business transfers.",

    securityHeading: "4. Data Security",
    securityBody:
      "We use reasonable security measures to protect your data. However, no system is completely secure.",

    retentionHeading: "5. Data Retention",
    retentionBody:
      "We retain personal data only as long as necessary to fulfill the purposes described in this policy.",

    rightsHeading: "6. Your Rights",
    rightsBody:
      "You may request access, correction, or deletion of your data, or restrict processing where applicable.",

    childrenHeading: "7. Children’s Privacy",
    childrenBody:
      "The Service is not intended for children under the age of 13, and we do not knowingly collect data from them.",

    changesHeading: "8. Changes to This Policy",
    changesBody:
      "We may update this policy from time to time. Continued use of the Service means you accept the changes.",

    contactHeading: "9. Contact Us",
    contactBody: "If you have questions about this Privacy Policy, contact us at:",
  },

  dashboard: {
    title: "Dashboard",
    subtitle: "Overview of your job hunting activity",
    statHighScore: "High-Score Matches",
    statToday: "New Today",
    statWeek: "New This Week",

    panelTitle: "{{feed}} Jobs",
    panelFallbackFeed: "Feed",
    panelSubtitle: "Showing scraped results",
    collapsePanel: "Collapse jobs panel",
    expandPanel: "Expand jobs panel",

    detailPlatform: "Platform:",
    detailCompany: "Company:",
    detailLocation: "Location:",
    detailExperience: "Experience:",
    detailJobType: "Job Type:",
    detailDescription: "Description",
    unknownCompany: "Unknown Company",
    remoteFallback: "Remote",
    experienceUnspecified: "Not specified",
    noDescription: "No description available.",

    feedSelectedTitle: "{{feed}} Feed Selected",
    feedSelectedBody:
      "The scraping feed is fully synchronized. All matches are processed and categorized in your local database.",
    openJobsPanel: "Open Jobs List Panel",
    configureNotifications: "Configure Notifications",

    noFeedTitle: "No Feed Selected",
    noFeedBody:
      "Select a feed from the left panel to view jobs, or create a new feed to get started.",

    proposalTitle: "Upwork Proposal",
    proposalGeneratedFor: "Generated for: ",
    proposalLabel: "Editable Proposal text",
    proposalPlaceholder: "Edit your AI-generated proposal here...",
    proposalWaiting: "Waiting for proposal generation...",
    proposalCopy: "Copy to Clipboard",
  },

  jobList: {
    searchPlaceholder: "Search by job title...",
    clearSearch: "Clear search",
    foundOne: "{{count}} Job Found",
    foundOther: "{{count}} Jobs Found",
    emptyTitle: "No jobs found matching your criteria.",
    emptyBody: "Try adjusting your filters or search terms.",
  },

  jobCard: {
    typeRemote: "Remote",
    typeOnSite: "On-site",
    typeHybrid: "Hybrid",
    typeContract: "Contract",
    optionDescription: "Description",
    optionCv: "CV",
    optionProposal: "Proposal",
    optionPitchVideo: "Pitch Video",
    optionYcInterview: "YC Interview",
    optionCoverLetter: "Cover Letter",
    generate: "Generate",
    applyNow: "Apply Now",
  },

  feeds: {
    createFeed: "Create Feed",
    editFeedTitle: "Edit Feed ⚙️",
    createFeedTitle: "Create Feed ✨",
    updateFeed: "Update Feed",
    saving: "Saving...",
    step1: "Step 1",
    step2: "Step 2",
    stepBack: "← Back",
    stepNext: "Next →",

    editTooltip: "Edit feed",
    deleteTooltip: "Delete feed",
    experience: "Experience:",
    years: "{{count}}yr",
    confirmDelete: "Are you sure you want to delete this feed?",

    fieldRole: "Select Role",
    fieldExperience: "Experience",
    fieldPlatforms: "Platforms",
    platformsPlaceholder: "Select platforms",
    fieldType: "Type",
    fieldCountry: "Country",
    fieldSkills: "Skills",
    skillsPlaceholder: "Select relevant skills",
    fieldSalaryType: "Salary Type",
    fieldSalary: "Salary",
    salaryFixed: "Fixed Price",
    salaryHourly: "Hourly Rate",
    salaryMinPlaceholder: "Min. 5,000",
    hourlyRateFormat: "${{value}}/hr",

    errorTitle: "Title is required",
    errorExperience: "Experience is required",
    errorLocation: "Location is required",
    errorSalary: "Please enter a valid salary (must be a positive number)",
    errorSave: "Failed to save feed",

    typeRemote: "Remote",
    typeOnSite: "On Site",
    typeHybrid: "Hybrid",
    typeContract: "Contract",
  },

  dropdown: {
    placeholder: "Select an option",
    noOptions: "No options available",
  },

  actions: {
    notificationSettings: "Notification Settings",
    signOut: "Sign out",
    billing: "Billing",
  },

  notifications: {
    title: "Notification Settings",
    telegram: "Telegram",
    telegramConnected: "Connected",
    telegramNotConnected: "Not connected",
    telegramEnabled: "Enabled",
    telegramConnect: "Connect",
    email: "Email",
    emailSubscribed: "Subscribed",
    emailNotSubscribed: "Not Subscribed",
    unsubscribe: "Unsubscribe",
    subscribe: "Subscribe",
  },

  billing: {
    title: "Billing & Subscription",
    planFree: "Free",
    planPro: "Pro",
    periodFree: "per 12h",
    periodPro: "per month",
    freeFeature1: "10 jobs per feed",
    freeFeature2: "Manual apply only",
    proFeature1: "40 jobs per feed every 2h",
    proFeature2: "Proposal generator",
    proFeature3: "Automatic job apply",
    inDevelopment: "Active Development 🔧",
    footnote:
      "Subscription system is under active development. New features coming soon!",
  },

  profile: {
    title: "Your Profile",
    stepOf: "Step {{step}} of 2",
    subtitle: "Used by AI to generate customized artifacts",

    sectionBasic: "Basic Info",
    labelName: "Name",
    placeholderName: "John Doe",
    labelEmail: "Contact Email",
    placeholderEmail: "john@example.com",
    labelWebsite: "Website",
    placeholderWebsite: "https://yoursite.com",
    labelOtherLink: "Other Link",
    placeholderOtherLink: "GitHub, LinkedIn, etc.",

    sectionDescription: "Description",
    labelAbout: "About you",
    placeholderAbout:
      "Briefly describe yourself, your architectural specialties, background, and career ambitions...",

    sectionExperience: "Work Experience",
    placeholderCompany: "Company",
    placeholderRole: "Role / Title",
    placeholderExperienceDescription: "Description (optional)",
    addExperience: "Add Experience",

    sectionEducation: "Education",
    placeholderInstitution: "Institution",
    placeholderDegree: "Degree",
    placeholderGrade: "Grade (0-100)",
    addEducation: "Add Education",

    sectionSkills: "Skills & Expertise",
    labelSkills: "Add Professional Skills",
    placeholderSkills: "Type or select skills...",

    sectionInterests: "Interests",
    placeholderInterests:
      "e.g. Open Source, Cloud Architecture, Quantum Computing",
    sectionCertificates: "Certificates",
    placeholderCertificates: "e.g. AWS Certified Solutions Architect, PMP",
    sectionLanguages: "Languages",
    placeholderLanguages: "e.g. English (Fluent), Spanish (Native)",

    durationStart: "Start",
    durationEnd: "End",
    durationPresent: "Present",

    errorName: "Name is required",
    errorDescription: "Description is required",
    errorSkills: "Select at least one skill & level",
    errorGrade: "Grade must be between 0 and 100",

    nextStep: "Next Step",
    generating: "Generating...",
    generate: "Generate",
  },
};

export type Translation = typeof en;
