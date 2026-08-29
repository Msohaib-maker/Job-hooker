import type { Translation } from "./en";

/** 简体中文 — Simplified Chinese. */
export const zh: Translation = {
  meta: {
    title: "JobHooker —— 更快找到理想工作",
    description:
      "JobHooker 抓取 Upwork、Y Combinator、LinkedIn 等平台的职位，按你的档案为每个职位打分，并为你写好求职信。免费浏览公开职位，无需注册账号。",
  },

  language: {
    label: "语言",
    en: "英语",
    zh: "中文",
    fr: "法语",
  },

  common: {
    search: "搜索",
    cancel: "取消",
    back: "返回",
    next: "下一步",
    add: "添加",
    remove: "删除",
    loading: "加载中…",
    tryAgain: "重试",
    close: "关闭",
    notAvailable: "暂无",
  },

  nav: {
    homeAria: "JobHooker 首页",
    browseJobs: "浏览职位",
    signIn: "登录",
    getStarted: "免费开始",
    privacy: "隐私政策",
    backToSite: "返回首页",
  },

  hero: {
    titleLine1: "不必再苦苦搜索。",
    titleLine2: "直接挑选合适职位。",
    subtitle:
      "JobHooker 把 Upwork、Y Combinator、LinkedIn 等平台的职位汇聚到同一条信息流，逐一与你的档案匹配打分，并在你打开网页之前就写好求职信。",
    bulletFeed: "各大招聘平台的职位汇聚成一条信息流",
    bulletScores: "匹配评分，只投递真正适合你的职位",
    bulletDocuments: "自动生成求职信、简历和 Upwork 提案",
    bulletAlerts: "即时推送到 Telegram 和邮箱",
    bulletInterview: "为每个职位生成面试准备资料",
    ctaPrimary: "免费开始",
    ctaSecondary: "免费浏览职位",
    noCard: "无需信用卡 —— 浏览公开职位完全不需要注册账号。",
    boardsLabel: "实时抓取的招聘平台",
    metaUpwork: "自由职业合同",
    metaFiverr: "项目需求",
    metaYC: "创业公司职位",
    metaLinkedIn: "全职工作",
    metaIndeed: "全球职位",
    metaGlassdoor: "含薪资信息",
    moreBoards: "+ 每周新增 CareerBuilder、Wellfound 等更多平台。",
  },

  jobs: {
    eyebrow: "免费浏览",
    title: "公开职位，无需注册",
    subtitle:
      "我们从 Upwork、Y Combinator、LinkedIn 等平台抓取了最新且已核实的职位。你可以随意浏览 —— 想要投递链接和 AI 撰写的申请材料时，再免费注册账号。",
    searchPlaceholder: "搜索职位或技能",
    searchAria: "搜索公开职位",
    filterAll: "全部职位",
    filterRemote: "远程",
    filterOnSite: "现场办公",
    positionsOne: "{{count}} 个在招职位",
    positionsOther: "{{count}} 个在招职位",
    loadError: "暂时无法加载职位列表。",
    emptyTitle: "暂时没有符合该搜索的职位。",
    emptyBody: "换个关键词试试，或清除筛选条件查看全部职位。",
    typeRemote: "远程",
    typeOnSite: "现场办公",
    salaryUndisclosed: "薪资面议",
    unlockApply: "解锁投递链接",
    postedToday: "今天",
    postedYesterday: "昨天",
    postedDaysAgo: "{{count}} 天前",
    postedMonthsAgo: "{{count}} 个月前",
    behindLogin: "登录后可查看 {{count}} 个职位",
    readyToApply: "准备好开始投递了吗？",
    ctaBody:
      "免费账号即可获得投递链接、匹配评分，以及每个职位的 AI 求职信。",
    ctaButton: "免费注册账号",
  },

  video: {
    badge: "教程",
    title: "看看它是如何运作的",
    body: "观看 3 分钟快速教程，了解 AI 如何为你找到最合适的机会，且没有任何垃圾信息。",
    englishOnly: "该教程视频为英文讲解。",
    iframeTitle: "教程视频",
    thumbnailAlt: "视频封面",
  },

  how: {
    eyebrow: "运作方式",
    titleBefore: "",
    titleAfter: " 能为你做什么？",
    intro:
      "用你自己的筛选条件和 AI 提示词创建信息流。JobHooker 会为每一个符合条件的职位生成定制的求职信、简历和面试准备资料。",
    tryItNow: "立即体验",

    feedsBadge: "信息流",
    feedsTitle: "用你自己的筛选条件创建信息流",
    feedsBody:
      "每条信息流都会按照职位名称、薪资期望、工作地点和核心技能为你筛选职位。",
    feedsPointTypes: "时薪 / 固定价类型",
    feedsPointSkills: "核心技能",
    feedsPointUnlimited: "信息流数量不限",
    feedsPointLocation: "工作地点",

    mockFeedsLabel: "信息流",
    mockNewFeed: "新建信息流…",
    mockCreateFeed: "创建信息流",
    mockFeedName: "AI / 大模型集成",
    mockJobType: "职位类型",
    mockKeySkills: "核心技能",
    mockHourly: "时薪",
    mockFixed: "固定价",
    mockFullTime: "全职",
    mockAdd: "+ 添加",
    mockMinRate: "最低时薪（美元）",
    mockMaxRate: "最高时薪（美元）",
    mockCancel: "取消",
    mockCreateButton: "创建信息流",

    docsBadge: "AI 文档",
    docsTitle: "为每个职位定制求职信、简历和面试准备资料。",
    docsBody:
      "对于每一个符合你条件的职位，JobHooker 都会生成定制的求职信、量身定制的简历以及 Upwork 提案 —— 让你每次投递都有备而来。",
    docsPointCover: "每个职位专属的求职信",
    docsPointCv: "针对职位定制的简历",
    docsPointInterview: "通用与定制的面试准备 PDF",
    docsPointDownload: "一键下载，随时可发送",

    alertsBadge: "通知",
    alertsTitle: "职位即时推送到 Telegram 和邮箱。",
    alertsBody:
      "一旦发现高分职位，JobHooker 会立刻推送到你的 Telegram 频道和邮箱 —— 包含评分、职位名称和直达链接。无需刷新页面，也不会错过机会。",
    alertsPointTelegram: "Telegram 频道推送",
    alertsPointEmail: "邮件摘要与即时提醒",
    alertsPointScore: "每条提醒都附带评分",
    alertsPointLink: "直达链接，快速投递",

    mockChannelName: "JobHooker 职位提醒",
    mockSubscribers: "{{count}} 位订阅者",
    mockViewApply: "查看并投递 →",
    mockAlertJob1: "高级 React 开发工程师",
    mockAlertJob2: "前端工程师",
    mockAlertJob3: "全栈开发工程师",
    mockAlertTime1: "刚刚",
    mockAlertTime2: "2 分钟前",
    mockAlertTime3: "5 分钟前",

    ctaButton: "免费开始使用",
    ctaNote: "一个月免费试用 - 无需信用卡",
  },

  footer: {
    rights: "© {{year}} Job Hooker。保留所有权利。",
  },

  register: {
    brandTitleBefore: "一个收件箱，收齐",
    brandTitleHighlight: "所有值得",
    brandTitleAfter: "你花时间的职位。",
    pullingFrom: "职位来源",
    propScores: "在你阅读之前，每个职位都已按你的档案打分",
    propDocuments: "为每个职位起草求职信、简历和提案",
    propAlerts: "新匹配职位即时推送到 Telegram 和邮箱",
    quote: "JobHooker 让我在一周之内拿到了三家顶尖公司的面试机会。",
    quoteAuthor: "—— 早期内测用户",

    emailHeading: "登录或创建账号",
    emailSubtitle: "只需一个邮箱地址 —— 无需记住任何密码。",
    otpHeading: "请查收邮件",
    otpSubtitleBefore: "我们已将 {{length}} 位验证码发送至 ",
    otpSubtitleAfter: "。验证码将在几分钟后失效。",

    emailLabel: "邮箱地址",
    emailPlaceholder: "you@company.com",
    sendingCode: "正在发送验证码…",
    continueWithEmail: "使用邮箱继续",
    sameCodeNote: "新用户或老用户 —— 同一个验证码通用。",

    codeLabel: "验证码",
    digitAria: "第 {{index}} 位，共 {{total}} 位",
    verifying: "正在验证…",
    verifyAndContinue: "验证并继续",
    changeEmail: "更换邮箱",
    resendIn: "{{seconds}} 秒后可重新发送",
    resendCode: "重新发送验证码",

    sendFailed: "邮件发送失败。请检查邮箱地址后重试。",
    codeInvalid: "验证码无效或已过期。请重新获取。",

    termsBefore: "继续即表示你同意我们的",
    termsLink: "隐私政策",
    termsAfter: "。",
  },

  privacy: {
    title: "隐私政策",
    lastUpdated: "最后更新：2026 年 1 月 10 日",
    intro:
      "本隐私政策说明我们在你使用本应用及相关服务（以下称“本服务”）时，如何收集、使用、披露和保护你的信息。使用本服务即表示你同意按照本政策收集和使用相关信息。",

    collectHeading: "1. 我们收集的信息",
    personalHeading: "1.1 个人信息",
    personalEmail: "邮箱地址",
    personalName: "姓名或用户名",
    personalAuth: "认证数据（例如一次性验证码或登录令牌）",

    usageHeading: "1.2 使用数据",
    usageDevice: "设备类型和操作系统",
    usageBrowser: "浏览器类型和版本",
    usageIp: "IP 地址",
    usagePages: "访问的页面和执行的操作",
    usageTime: "访问日期和时间",

    cookiesHeading: "1.3 Cookie 与跟踪技术",
    cookiesBody:
      "我们可能使用 Cookie 或类似技术来维持会话、提升性能并分析使用情况。",

    useHeading: "2. 我们如何使用你的信息",
    useProvide: "提供并维护本服务",
    useAuth: "身份验证与安全（一次性验证码）",
    useImprove: "改进和优化本服务",
    useCommunicate: "告知重要更新",
    useFraud: "防止欺诈和滥用",

    sharingHeading: "3. 信息的共享",
    sharingBody:
      "我们不会出售你的个人信息。我们仅在与可信服务提供商合作、法律要求或业务转让等情况下共享数据。",

    securityHeading: "4. 数据安全",
    securityBody:
      "我们采取合理的安全措施保护你的数据。但没有任何系统是绝对安全的。",

    retentionHeading: "5. 数据保留",
    retentionBody: "我们仅在实现本政策所述目的所必需的期限内保留个人数据。",

    rightsHeading: "6. 你的权利",
    rightsBody:
      "在适用的情况下，你可以要求访问、更正或删除你的数据，或限制对数据的处理。",

    childrenHeading: "7. 儿童隐私",
    childrenBody:
      "本服务不面向 13 岁以下儿童，我们也不会在知情的情况下收集他们的数据。",

    changesHeading: "8. 本政策的变更",
    changesBody:
      "我们可能会不时更新本政策。继续使用本服务即表示你接受这些变更。",

    contactHeading: "9. 联系我们",
    contactBody: "如果你对本隐私政策有任何疑问，请通过以下方式联系我们：",
  },

  dashboard: {
    title: "控制台",
    subtitle: "你的求职活动概览",
    statHighScore: "高分匹配",
    statToday: "今日新增",
    statWeek: "本周新增",

    panelTitle: "{{feed}} 的职位",
    panelFallbackFeed: "信息流",
    panelSubtitle: "显示抓取结果",
    collapsePanel: "收起职位面板",
    expandPanel: "展开职位面板",

    detailPlatform: "平台：",
    detailCompany: "公司：",
    detailLocation: "地点：",
    detailExperience: "经验要求：",
    detailJobType: "职位类型：",
    detailDescription: "职位描述",
    unknownCompany: "公司未知",
    remoteFallback: "远程",
    experienceUnspecified: "未说明",
    noDescription: "暂无职位描述。",

    feedSelectedTitle: "已选择 {{feed}} 信息流",
    feedSelectedBody:
      "抓取信息流已完全同步。所有匹配职位均已处理并归类到你的本地数据库中。",
    openJobsPanel: "打开职位列表面板",
    configureNotifications: "配置通知",

    noFeedTitle: "未选择信息流",
    noFeedBody: "从左侧面板选择一条信息流以查看职位，或创建新的信息流开始使用。",

    proposalTitle: "Upwork 提案",
    proposalGeneratedFor: "生成对象：",
    proposalLabel: "可编辑的提案内容",
    proposalPlaceholder: "在此编辑 AI 生成的提案……",
    proposalWaiting: "正在等待提案生成……",
    proposalCopy: "复制到剪贴板",
  },

  jobList: {
    searchPlaceholder: "按职位名称搜索……",
    clearSearch: "清除搜索",
    foundOne: "找到 {{count}} 个职位",
    foundOther: "找到 {{count}} 个职位",
    emptyTitle: "没有符合条件的职位。",
    emptyBody: "试着调整筛选条件或搜索关键词。",
  },

  jobCard: {
    typeRemote: "远程",
    typeOnSite: "现场办公",
    typeHybrid: "混合办公",
    typeContract: "合同制",
    optionDescription: "职位描述",
    optionCv: "简历",
    optionProposal: "提案",
    optionPitchVideo: "路演视频",
    optionYcInterview: "YC 面试",
    optionCoverLetter: "求职信",
    generate: "生成",
    applyNow: "立即投递",
  },

  feeds: {
    createFeed: "创建信息流",
    editFeedTitle: "编辑信息流 ⚙️",
    createFeedTitle: "创建信息流 ✨",
    updateFeed: "更新信息流",
    saving: "保存中……",
    step1: "第 1 步",
    step2: "第 2 步",
    stepBack: "← 上一步",
    stepNext: "下一步 →",

    editTooltip: "编辑信息流",
    deleteTooltip: "删除信息流",
    experience: "经验：",
    years: "{{count}} 年",
    confirmDelete: "确定要删除这条信息流吗？",

    fieldRole: "选择职位",
    fieldExperience: "工作经验",
    fieldPlatforms: "平台",
    platformsPlaceholder: "选择平台",
    fieldType: "类型",
    fieldCountry: "国家/地区",
    fieldSkills: "技能",
    skillsPlaceholder: "选择相关技能",
    fieldSalaryType: "薪资类型",
    fieldSalary: "薪资",
    salaryFixed: "固定价",
    salaryHourly: "时薪",
    salaryMinPlaceholder: "最低 5,000",
    hourlyRateFormat: "{{value}} 美元/小时",

    errorTitle: "请填写职位名称",
    errorExperience: "请填写工作经验",
    errorLocation: "请填写工作地点",
    errorSalary: "请输入有效的薪资（必须为正数）",
    errorSave: "信息流保存失败",

    typeRemote: "远程",
    typeOnSite: "现场办公",
    typeHybrid: "混合办公",
    typeContract: "合同制",
  },

  dropdown: {
    placeholder: "请选择",
    noOptions: "暂无可选项",
  },

  actions: {
    notificationSettings: "通知设置",
    signOut: "退出登录",
    billing: "账单",
  },

  notifications: {
    title: "通知设置",
    telegram: "Telegram",
    telegramConnected: "已连接",
    telegramNotConnected: "未连接",
    telegramEnabled: "已启用",
    telegramConnect: "连接",
    email: "邮箱",
    emailSubscribed: "已订阅",
    emailNotSubscribed: "未订阅",
    unsubscribe: "取消订阅",
    subscribe: "订阅",
  },

  billing: {
    title: "账单与订阅",
    planFree: "免费版",
    planPro: "专业版",
    periodFree: "每 12 小时",
    periodPro: "每月",
    freeFeature1: "每条信息流 10 个职位",
    freeFeature2: "仅支持手动投递",
    proFeature1: "每 2 小时每条信息流 40 个职位",
    proFeature2: "提案生成器",
    proFeature3: "自动投递职位",
    inDevelopment: "开发中 🔧",
    footnote: "订阅系统正在积极开发中，新功能即将推出！",
  },

  profile: {
    title: "你的档案",
    stepOf: "第 {{step}} 步，共 2 步",
    subtitle: "AI 将根据这些信息生成定制材料",

    sectionBasic: "基本信息",
    labelName: "姓名",
    placeholderName: "张三",
    labelEmail: "联系邮箱",
    placeholderEmail: "john@example.com",
    labelWebsite: "个人网站",
    placeholderWebsite: "https://yoursite.com",
    labelOtherLink: "其他链接",
    placeholderOtherLink: "GitHub、LinkedIn 等",

    sectionDescription: "个人简介",
    labelAbout: "关于你",
    placeholderAbout: "简要介绍你自己、你的专业领域、工作背景和职业目标……",

    sectionExperience: "工作经历",
    placeholderCompany: "公司",
    placeholderRole: "职位 / 头衔",
    placeholderExperienceDescription: "描述（选填）",
    addExperience: "添加工作经历",

    sectionEducation: "教育经历",
    placeholderInstitution: "学校",
    placeholderDegree: "学位",
    placeholderGrade: "成绩（0-100）",
    addEducation: "添加教育经历",

    sectionSkills: "技能与熟练度",
    labelSkills: "添加专业技能",
    placeholderSkills: "输入或选择技能……",

    sectionInterests: "兴趣爱好",
    placeholderInterests: "例如：开源、云架构、量子计算",
    sectionCertificates: "证书",
    placeholderCertificates: "例如：AWS 认证解决方案架构师、PMP",
    sectionLanguages: "语言",
    placeholderLanguages: "例如：英语（流利）、西班牙语（母语）",

    durationStart: "开始",
    durationEnd: "结束",
    durationPresent: "至今",

    errorName: "请填写姓名",
    errorDescription: "请填写个人简介",
    errorSkills: "请至少选择一项技能并设置熟练度",
    errorGrade: "成绩必须在 0 到 100 之间",

    nextStep: "下一步",
    generating: "生成中……",
    generate: "生成",
  },
};
