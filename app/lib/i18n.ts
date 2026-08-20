export const languages = {
  ar: {
    label: "العربية",
    short: "AR",
    dir: "rtl",
  },

  en: {
    label: "English",
    short: "EN",
    dir: "ltr",
  },

  zh: {
    label: "中文",
    short: "中",
    dir: "ltr",
  },
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = "ar";

export function isLanguage(value: string): value is Language {
  return value in languages;
}

export const translations = {
  // =========================================================
  // العربية
  // =========================================================

  ar: {
    nav: {
      home: "الرئيسية",
      services: "الخدمات",
      destinations: "الوجهات",
      whyUs: "لماذا كوكب الصين؟",
      contact: "تواصل معنا",
      login: "تسجيل الدخول",
      team: "دخول الفريق",
      register: "إنشاء حساب",
      account: "حسابي",
      menu: "فتح القائمة",
    },

    hero: {
      title: "الصين كما لم ترها من قبل",
      description:
        "نقرّب لك الصين، من السفر والدراسة واللغة إلى التجارة والأعمال.",
    },

    services: {
      label: "ماذا نقدم",
      title: "شريكك الموثوق في الصين",
      description:
        "خدمات واضحة ومدروسة تساعد الأفراد والشركات على الوصول إلى الصين بثقة.",
      logoAlt: "شعار كوكب الصين",
      more: "تعرف أكثر",
      explore: "استكشف خدماتنا",

      business: {
        title: "حلول الأعمال",
        description:
          "نساعدك على بناء علاقات وفرص أعمال موثوقة في السوق الصيني.",
      },

      travel: {
        title: "السفر والسياحة",
        description:
          "تجارب سفر مصممة بعناية لاكتشاف الصين بطريقة مريحة ومميزة.",
      },

      study: {
        title: "الدراسة واللغة",
        description:
          "مساعدة في الدراسة والجامعات وتعلّم اللغة الصينية.",
      },

      trade: {
        title: "التجارة والتوريد",
        description:
          "نربطك بالمصانع والفرص التجارية المناسبة في الصين.",
      },
    },

    whyUs: {
      label: "لماذا كوكب الصين؟",
    },

    destinations: {
      label: "الوجهات",
      title: "اكتشف أهم مدن الصين",
    },

    goals: {
      label: "أهدافنا",
      title: "ما خطوتك القادمة؟",
    },

    testimonials: {
      label: "آراء عملائنا",
    },

    contact: {
      label: "تواصل معنا",
    },

    footer: {
      help: "تحتاج مساعدة؟ تواصل معنا مباشرة.",
      whatsapp: "تواصل معنا عبر واتساب",
    },

    worldTime: {
      saudi: "السعودية",
      china: "الصين",
    },

    currency: {
      title: "أسعار العملات",
      sar: "ريال سعودي",
      cny: "يوان صيني",
      usd: "دولار أمريكي",
      loading: "جاري تحديث الأسعار...",
      unavailable: "تعذر تحميل أسعار العملات.",
      lastUpdate: "آخر تحديث",
    },

    auth: {
      loginBrandDescription:
        "سجّل دخولك للوصول إلى حسابك وتجربتك الخاصة مع كوكب الصين.",

      backHome: "← العودة إلى الرئيسية",

      welcomeBack: "مرحبًا بعودتك",
      toChinaPlanet: "إلى كوكب الصين",

      loginTitle: "تسجيل الدخول",
      loginDescription: "أدخل بيانات حسابك للمتابعة.",

      email: "البريد الإلكتروني",
      password: "كلمة المرور",

      forgotPassword: "نسيت كلمة المرور؟",

      login: "تسجيل الدخول",
      loggingIn: "جاري تسجيل الدخول...",

      noAccount: "ليس لديك حساب؟",
      createAccount: "إنشاء حساب",

      registerTitle: "إنشاء حساب",
      registerDescription:
        "أنشئ حسابك في كوكب الصين واستمتع بتجربة أكثر سهولة.",

      name: "الاسم",
      fullName: "اسمك الكامل",
      phone: "رقم الجوال",
      confirmPassword: "تأكيد كلمة المرور",

      creatingAccount: "جاري إنشاء الحساب...",

      hasAccount: "لديك حساب بالفعل؟",

      resetTitle: "تغيير كلمة المرور",
      resetDescription: "أدخل كلمة المرور الجديدة لحسابك.",

      newPassword: "كلمة المرور الجديدة",
      changingPassword: "جاري تغيير كلمة المرور...",
      changePassword: "تغيير كلمة المرور",

      forgotEmail: "اكتب بريدك الإلكتروني أولًا.",
      emailRequired: "اكتب بريدك الإلكتروني.",
      passwordRequired: "اكتب كلمة المرور.",

      invalidLogin:
        "تعذر تسجيل الدخول. تأكد من البريد وكلمة المرور، وتأكد من تأكيد بريدك الإلكتروني.",

      unexpected: "حدث خطأ غير متوقع. حاول مرة أخرى.",

      passwordShort: "كلمة المرور يجب أن تكون 6 أحرف على الأقل.",

      passwordsMismatch: "كلمتا المرور غير متطابقتين.",

      resetSent:
        "تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني.",

      resetFailed:
        "تعذر إرسال رابط استعادة كلمة المرور. حاول مرة أخرى.",

      accountCreated:
        "تم إنشاء حسابك بنجاح. تحقق من بريدك الإلكتروني لتأكيد الحساب.",

      createFailed:
        "تعذر إنشاء الحساب. حاول مرة أخرى.",

      profileFailed:
        "تم إنشاء الحساب، لكن تعذر حفظ بيانات الملف الشخصي. حاول تسجيل الدخول ثم المحاولة مرة أخرى.",

      resetSuccess:
        "تم تغيير كلمة المرور بنجاح. سيتم تحويلك لتسجيل الدخول.",

      resetFailedExpired:
        "تعذر تغيير كلمة المرور. قد يكون رابط الاستعادة منتهي الصلاحية.",

      teamAccess: "دخول الفريق",
      teamAccessLabel: "TEAM ACCESS",

      teamDescription:
        "أدخل بيانات حسابك للوصول إلى مساحة الفريق.",

      teamWelcome: "مرحبًا بك",
      teamSpace: "في مساحة الفريق",

      teamBrandDescription:
        "مساحة خاصة لفريق كوكب الصين لإدارة المشروع والعمل على تطوير الخدمات والمحتوى والتجربة.",

      teamLoginLoading: "جاري التحقق...",
      teamLogin: "دخول الفريق",

      teamSecure: "مساحة آمنة لأعضاء الفريق",

      teamDenied:
        "هذا الحساب ليس لديه صلاحية دخول الفريق.",

      accountCheckFailed:
        "تعذر التحقق من الحساب.",

      home: "الرئيسية",
    },

    pages: {
      privacy: {
        title: "سياسة الخصوصية",
      },

      terms: {
        title: "الشروط والأحكام",
      },

      account: {
        title: "حسابي",
      },

      team: {
        title: "مساحة الفريق",
        members: "أعضاء الفريق",
        permissions: "الصلاحيات",
      },
    },
  },

  // =========================================================
  // English
  // =========================================================

  en: {
    nav: {
      home: "Home",
      services: "Services",
      destinations: "Destinations",
      whyUs: "Why China Planet?",
      contact: "Contact Us",
      login: "Login",
      team: "Team Login",
      register: "Create Account",
      account: "My Account",
      menu: "Open menu",
    },

    hero: {
      title: "China Like You Have Never Seen It",
      description:
        "We bring China closer to you — from travel, education and language to trade and business.",
    },

    services: {
      label: "What We Offer",
      title: "Your Trusted Partner in China",
      description:
        "Clear and carefully designed services that help individuals and businesses access China with confidence.",
      logoAlt: "China Planet logo",
      more: "Learn More",
      explore: "Explore Our Services",

      business: {
        title: "Business Solutions",
        description:
          "We help you build trusted business relationships and opportunities in the Chinese market.",
      },

      travel: {
        title: "Travel & Tourism",
        description:
          "Carefully designed travel experiences to discover China comfortably and uniquely.",
      },

      study: {
        title: "Study & Language",
        description:
          "Support with education, universities, and learning the Chinese language.",
      },

      trade: {
        title: "Trade & Sourcing",
        description:
          "We connect you with suitable factories and business opportunities in China.",
      },
    },

    whyUs: {
      label: "Why China Planet?",
    },

    destinations: {
      label: "Destinations",
      title: "Discover China's Major Cities",
    },

    goals: {
      label: "YOUR CHINA JOURNEY",
      title: "What's Your Next Step?",
    },

    testimonials: {
      label: "What Our Clients Say",
    },

    contact: {
      label: "Contact Us",
    },

    footer: {
      help: "Need help? Get in touch with us directly.",
      whatsapp: "Contact us on WhatsApp",
    },

    worldTime: {
      saudi: "Saudi Arabia",
      china: "China",
    },

    currency: {
      title: "Currency Rates",
      sar: "Saudi Riyal",
      cny: "Chinese Yuan",
      usd: "US Dollar",
      loading: "Updating rates...",
      unavailable: "Unable to load currency rates.",
      lastUpdate: "Last updated",
    },

    auth: {
      loginBrandDescription:
        "Sign in to access your account and your personalized China Planet experience.",

      backHome: "← Back to home",

      welcomeBack: "Welcome back",
      toChinaPlanet: "to China Planet",

      loginTitle: "Login",
      loginDescription:
        "Enter your account details to continue.",

      email: "Email",
      password: "Password",

      forgotPassword: "Forgot your password?",

      login: "Login",
      loggingIn: "Signing in...",

      noAccount: "Don't have an account?",
      createAccount: "Create Account",

      registerTitle: "Create Account",
      registerDescription:
        "Create your China Planet account and enjoy a smoother experience.",

      name: "Name",
      fullName: "Your full name",
      phone: "Phone number",
      confirmPassword: "Confirm password",

      creatingAccount: "Creating account...",

      hasAccount: "Already have an account?",

      resetTitle: "Change Password",
      resetDescription:
        "Enter your new account password.",

      newPassword: "New password",
      changingPassword: "Changing password...",
      changePassword: "Change password",

      forgotEmail:
        "Enter your email address first.",

      emailRequired:
        "Enter your email address.",

      passwordRequired:
        "Enter your password.",

      invalidLogin:
        "Unable to sign in. Check your email and password and make sure your email is confirmed.",

      unexpected:
        "Something went wrong. Please try again.",

      passwordShort:
        "Password must be at least 6 characters.",

      passwordsMismatch:
        "Passwords do not match.",

      resetSent:
        "A password recovery link has been sent to your email.",

      resetFailed:
        "Unable to send the password recovery link. Please try again.",

      accountCreated:
        "Your account was created successfully. Check your email to confirm your account.",

      createFailed:
        "Unable to create your account. Please try again.",

      profileFailed:
        "Your account was created, but your profile could not be saved. Please sign in and try again.",

      resetSuccess:
        "Password changed successfully. Redirecting to login.",

      resetFailedExpired:
        "Unable to change your password. The recovery link may have expired.",

      teamAccess: "Team Login",
      teamAccessLabel: "TEAM ACCESS",

      teamDescription:
        "Enter your account details to access the team workspace.",

      teamWelcome: "Welcome",
      teamSpace: "to the team workspace",

      teamBrandDescription:
        "A private workspace for the China Planet team to manage the project and develop services, content, and the overall experience.",

      teamLoginLoading: "Checking...",
      teamLogin: "Team Login",

      teamSecure:
        "Secure workspace for team members",

      teamDenied:
        "This account does not have team access.",

      accountCheckFailed:
        "Unable to verify the account.",

      home: "Home",
    },

    pages: {
      privacy: {
        title: "Privacy Policy",
      },

      terms: {
        title: "Terms & Conditions",
      },

      account: {
        title: "My Account",
      },

      team: {
        title: "Team Workspace",
        members: "Team Members",
        permissions: "Permissions",
      },
    },
  },

  // =========================================================
  // 中文
  // =========================================================

  zh: {
    nav: {
      home: "首页",
      services: "服务",
      destinations: "目的地",
      whyUs: "为什么选择中国星球？",
      contact: "联系我们",
      login: "登录",
      team: "团队登录",
      register: "创建账户",
      account: "我的账户",
      menu: "打开菜单",
    },

    hero: {
      title: "探索你从未见过的中国",
      description:
        "让中国离你更近，从旅行、留学和语言，到贸易与商业。",
    },

    services: {
      label: "我们提供什么",
      title: "您值得信赖的中国伙伴",
      description:
        "清晰、专业的服务，帮助个人和企业更加自信地进入中国市场。",
      logoAlt: "中国星球标志",
      more: "了解更多",
      explore: "探索我们的服务",

      business: {
        title: "商业解决方案",
        description:
          "帮助您在中国市场建立可靠的商业关系并寻找商业机会。",
      },

      travel: {
        title: "旅行与旅游",
        description:
          "精心设计的旅行体验，让您舒适而独特地探索中国。",
      },

      study: {
        title: "留学与语言",
        description:
          "提供留学、大学申请以及中文学习方面的帮助。",
      },

      trade: {
        title: "贸易与采购",
        description:
          "帮助您对接合适的中国工厂和商业机会。",
      },
    },

    whyUs: {
      label: "为什么选择中国星球？",
    },

    destinations: {
      label: "目的地",
      title: "探索中国主要城市",
    },

    goals: {
      label: "我们的目标",
      title: "您的下一步是什么？",
    },

    testimonials: {
      label: "客户评价",
    },

    contact: {
      label: "联系我们",
    },

    footer: {
      help: "需要帮助？欢迎直接联系我们。",
      whatsapp: "通过 WhatsApp 联系我们",
    },

    worldTime: {
      saudi: "沙特阿拉伯",
      china: "中国",
    },

    currency: {
      title: "实时汇率",
      sar: "沙特里亚尔",
      cny: "人民币",
      usd: "美元",
      loading: "正在更新汇率...",
      unavailable: "无法加载汇率。",
      lastUpdate: "最后更新",
    },

    auth: {
      loginBrandDescription:
        "登录您的账户，享受专属的中国星球体验。",

      backHome: "← 返回首页",

      welcomeBack: "欢迎回来",
      toChinaPlanet: "来到中国星球",

      loginTitle: "登录",
      loginDescription:
        "请输入您的账户信息以继续。",

      email: "电子邮箱",
      password: "密码",

      forgotPassword: "忘记密码？",

      login: "登录",
      loggingIn: "正在登录...",

      noAccount: "还没有账户？",
      createAccount: "创建账户",

      registerTitle: "创建账户",
      registerDescription:
        "创建您的中国星球账户，享受更便捷的体验。",

      name: "姓名",
      fullName: "您的姓名",
      phone: "手机号码",
      confirmPassword: "确认密码",

      creatingAccount: "正在创建账户...",

      hasAccount: "已经有账户？",

      resetTitle: "修改密码",
      resetDescription:
        "请输入您的新密码。",

      newPassword: "新密码",
      changingPassword: "正在修改密码...",
      changePassword: "修改密码",

      forgotEmail:
        "请先输入您的电子邮箱。",

      emailRequired:
        "请输入您的电子邮箱。",

      passwordRequired:
        "请输入密码。",

      invalidLogin:
        "无法登录，请检查邮箱和密码，并确认您的邮箱已验证。",

      unexpected:
        "发生意外错误，请重试。",

      passwordShort:
        "密码至少需要 6 个字符。",

      passwordsMismatch:
        "两次输入的密码不一致。",

      resetSent:
        "密码重置链接已发送至您的邮箱。",

      resetFailed:
        "无法发送密码重置链接，请重试。",

      accountCreated:
        "账户创建成功，请检查邮箱并确认账户。",

      createFailed:
        "无法创建账户，请重试。",

      profileFailed:
        "账户已创建，但个人资料保存失败。",

      resetSuccess:
        "密码修改成功，即将跳转到登录页面。",

      resetFailedExpired:
        "无法修改密码，重置链接可能已过期。",

      teamAccess: "团队登录",
      teamAccessLabel: "TEAM ACCESS",

      teamDescription:
        "请输入您的账户信息以进入团队工作区。",

      teamWelcome: "欢迎",
      teamSpace: "来到团队工作区",

      teamBrandDescription:
        "中国星球团队的专属工作区，用于管理项目以及开发服务、内容和整体体验。",

      teamLoginLoading: "正在验证...",
      teamLogin: "团队登录",

      teamSecure:
        "团队成员安全工作区",

      teamDenied:
        "此账户没有团队访问权限。",

      accountCheckFailed:
        "无法验证账户。",

      home: "首页",
    },

    pages: {
      privacy: {
        title: "隐私政策",
      },

      terms: {
        title: "条款与条件",
      },

      account: {
        title: "我的账户",
      },

      team: {
        title: "团队工作区",
        members: "团队成员",
        permissions: "权限",
      },
    },
  },
} as const;