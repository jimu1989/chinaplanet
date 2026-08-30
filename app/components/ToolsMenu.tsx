"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Language = "ar" | "en" | "zh";

type Tab = "time" | "weather" | "currency" | "shipping" | "holidays";

type City = {
  name: string;
  nameAr: string;
  nameEn: string;
  nameZh: string;
  country: string;
  countryAr: string;
  countryEn: string;
  countryZh: string;
  countryCode: "SA" | "CN";
  latitude: number;
  longitude: number;
  admin1?: string;
};

type Weather = {
  temperature: number;
  apparent: number;
  wind: number;
};

const TEXT = {
  ar: {
    tools: "الأدوات",
    time: "الوقت",
    weather: "الطقس",
    currency: "العملات",
    shipping: "الشحن",
    holidays: "الأعياد الصينية",
    saudi: "السعودية",
    china: "الصين",
    searchCity: "ابحث عن مدينة سعودية أو صينية",
    search: "بحث",
    loading: "جاري التحميل...",
    temperature: "الحرارة",
    feelsLike: "المحسوسة",
    wind: "الرياح",
    amount: "المبلغ بالريال",
    sar: "ريال سعودي",
    cny: "يوان صيني",
    convert: "القيمة باليوان",
    refresh: "تحديث السعر",
    weight: "الوزن",
    cartons: "عدد الكراتين",
    method: "طريقة الشحن",
    air: "جوي",
    sea: "بحري",
    calculate: "احسب",
    estimated: "بيانات الشحنة",
    year: "السنة",
    factoryWarning: "تنبيه للمستورد",
    factoryNote:
      "قد تتوقف بعض المصانع والخدمات اللوجستية خلال الأعياد الصينية، لذلك يُنصح بتأكيد مواعيد الإنتاج والشحن مع المورد وشركة الشحن مسبقًا.",
    noCity: "لم يتم العثور على مدينة.",
    cnyResult: "CNY",
    sarResult: "SAR",
    cnyValue: "القيمة باليوان",
    rateError: "تعذر تحديث سعر الصرف.",
    loadingRate: "جاري تحديث السعر...",
    actualWeight: "الوزن الفعلي",
    kg: "كجم",
    length: "الطول",
    cm: "سم",
    width: "العرض",
    height: "الارتفاع",
    totalVolume: "الحجم الكلي",
    volumetricWeight: "الوزن الحجمي",
    chargeableWeight: "الوزن المحتسب",
    volumetric: "حجمي",
    actual: "فعلي",
    calculationBasis: "أساس الحساب",
    airBasis:
      "للشحن الجوي: الوزن المحتسب حسب الوزن الفعلي أو الحجمي، أيهما أعلى.",
    seaBasis:
      "للشحن البحري: الوزن والحجم الفعليان، حسب طريقة التسعير وشركة الشحن.",
    source: "المصدر",
    iata: "IATA",
    carrierDependent: "قد تختلف القاعدة حسب شركة الشحن.",
    shippingExplanation:
      "الوزن المحتسب للشحن الجوي يعتمد عادةً على الأعلى بين الوزن الفعلي والوزن الحجمي، بينما تختلف طريقة التسعير البحري حسب شركة الشحن.",
  },

  en: {
    tools: "Tools",
    time: "Time",
    weather: "Weather",
    currency: "Currency",
    shipping: "Shipping",
    holidays: "Chinese holidays",
    saudi: "Saudi Arabia",
    china: "China",
    searchCity: "Search a Saudi or Chinese city",
    search: "Search",
    loading: "Loading...",
    temperature: "Temperature",
    feelsLike: "Feels like",
    wind: "Wind",
    amount: "Amount in SAR",
    sar: "Saudi Riyal",
    cny: "Chinese Yuan",
    convert: "Value in CNY",
    refresh: "Refresh rate",
    weight: "Weight",
    cartons: "Cartons",
    method: "Shipping method",
    air: "Air",
    sea: "Sea",
    calculate: "Calculate",
    estimated: "Shipment data",
    year: "Year",
    factoryWarning: "Importer notice",
    factoryNote:
      "Some factories and logistics services may close or slow down during Chinese holidays. Confirm production and shipping schedules with your supplier and carrier in advance.",
    noCity: "No city found.",
    cnyResult: "CNY",
    sarResult: "SAR",
    cnyValue: "Value in CNY",
    rateError: "Unable to update exchange rate.",
    loadingRate: "Updating rate...",
    actualWeight: "Actual weight",
    kg: "kg",
    length: "Length",
    cm: "cm",
    width: "Width",
    height: "Height",
    totalVolume: "Total volume",
    volumetricWeight: "Volumetric weight",
    chargeableWeight: "Chargeable weight",
    volumetric: "Volumetric",
    actual: "Actual",
    calculationBasis: "Calculation basis",
    airBasis:
      "For air shipping, chargeable weight is generally based on the higher of actual and volumetric weight.",
    seaBasis:
      "For sea shipping, actual weight and volume are used according to the carrier’s pricing method.",
    source: "Source",
    iata: "IATA",
    carrierDependent: "The rule may vary by carrier.",
    shippingExplanation:
      "Air chargeable weight is generally based on whichever is higher: actual or volumetric weight. Sea pricing varies by carrier.",
  },

  zh: {
    tools: "工具",
    time: "时间",
    weather: "天气",
    currency: "货币",
    shipping: "运输",
    holidays: "中国节假日",
    saudi: "沙特",
    china: "中国",
    searchCity: "搜索沙特或中国城市",
    search: "搜索",
    loading: "加载中...",
    temperature: "温度",
    feelsLike: "体感温度",
    wind: "风速",
    amount: "沙特里亚尔金额",
    sar: "沙特里亚尔",
    cny: "人民币",
    convert: "人民币金额",
    refresh: "更新汇率",
    weight: "重量",
    cartons: "箱数",
    method: "运输方式",
    air: "空运",
    sea: "海运",
    calculate: "计算",
    estimated: "货物数据",
    year: "年份",
    factoryWarning: "进口商提醒",
    factoryNote:
      "中国节日期间，部分工厂和物流服务可能停工或延迟。建议提前与供应商和物流公司确认生产及运输时间。",
    noCity: "未找到城市。",
    cnyResult: "CNY",
    sarResult: "SAR",
    cnyValue: "人民币金额",
    rateError: "无法更新汇率。",
    loadingRate: "正在更新汇率...",
    actualWeight: "实际重量",
    kg: "千克",
    length: "长度",
    cm: "厘米",
    width: "宽度",
    height: "高度",
    totalVolume: "总体积",
    volumetricWeight: "体积重量",
    chargeableWeight: "计费重量",
    volumetric: "体积重量",
    actual: "实际重量",
    calculationBasis: "计算依据",
    airBasis: "空运通常按实际重量和体积重量中较高者计算计费重量。",
    seaBasis: "海运根据物流公司的计价方式使用实际重量和体积等数据。",
    source: "来源",
    iata: "IATA",
    carrierDependent: "具体规则可能因物流公司而异。",
    shippingExplanation:
      "空运计费重量通常取实际重量和体积重量中的较高值；海运计价方式则因物流公司而异。",
  },
} as const;

type Holiday = {
  id: string;
  name: {
    ar: string;
    en: string;
    zh: string;
  };
  date: string;
  days: number;
  note: {
    ar: string;
    en: string;
    zh: string;
  };
};

const HOLIDAYS: Record<number, Holiday[]> = {
  2026: [
    {
      id: "spring-festival",
      name: {
        ar: "رأس السنة الصينية",
        en: "Chinese New Year / Spring Festival",
        zh: "春节 / 中国新年",
      },
      date: "2026-02-17",
      days: 9,
      note: {
        ar: "أهم فترة في السنة للمصانع والشحن. قد تتوقف المصانع وتتأخر الطلبات والشحنات.",
        en: "The most important factory and logistics disruption period of the year.",
        zh: "全年最重要的工厂和物流影响期，部分工厂可能停工，订单和运输可能延迟。",
      },
    },
    {
      id: "qingming",
      name: {
        ar: "عيد تشينغمينغ",
        en: "Qingming Festival",
        zh: "清明节",
      },
      date: "2026-04-05",
      days: 3,
      note: {
        ar: "إجازة رسمية وقد تتأثر بعض الخدمات والشحنات.",
        en: "Public holiday. Some services and logistics may be affected.",
        zh: "法定节假日，部分服务和物流可能受到影响。",
      },
    },
    {
      id: "labour-day",
      name: {
        ar: "عيد العمال",
        en: "Labour Day",
        zh: "劳动节",
      },
      date: "2026-05-01",
      days: 5,
      note: {
        ar: "فترة إجازة رسمية وقد يزداد ضغط الشحن قبل وبعد الإجازة.",
        en: "Public holiday period. Shipping demand may increase before and after the holiday.",
        zh: "法定节假日期间，节日前后物流需求可能增加。",
      },
    },
    {
      id: "dragon-boat",
      name: {
        ar: "عيد قوارب التنين",
        en: "Dragon Boat Festival",
        zh: "端午节",
      },
      date: "2026-06-19",
      days: 3,
      note: {
        ar: "إجازة رسمية قصيرة وقد تتأثر بعض العمليات.",
        en: "Short public holiday. Some operations may be affected.",
        zh: "短期法定节假日，部分业务可能受到影响。",
      },
    },
    {
      id: "mid-autumn",
      name: {
        ar: "عيد منتصف الخريف",
        en: "Mid-Autumn Festival",
        zh: "中秋节",
      },
      date: "2026-09-25",
      days: 3,
      note: {
        ar: "إجازة رسمية، وقد تتأثر بعض المصانع والخدمات اللوجستية.",
        en: "Public holiday. Some factories and logistics services may be affected.",
        zh: "法定节假日，部分工厂和物流服务可能受到影响。",
      },
    },
    {
      id: "national-day",
      name: {
        ar: "اليوم الوطني الصيني",
        en: "Chinese National Day",
        zh: "中国国庆节",
      },
      date: "2026-10-01",
      days: 7,
      note: {
        ar: "عطلة الأسبوع الذهبي. من المتوقع ارتفاع الطلب على الشحن قبل الإجازة وبعدها.",
        en: "Golden Week. Expect increased logistics demand before and after the holiday.",
        zh: "黄金周期间，节日前后物流需求通常会增加。",
      },
    },
  ],

  2027: [
    {
      id: "spring-festival",
      name: {
        ar: "رأس السنة الصينية",
        en: "Chinese New Year / Spring Festival",
        zh: "春节 / 中国新年",
      },
      date: "2027-02-06",
      days: 7,
      note: {
        ar: "أهم فترة في السنة للمصانع والشحن. قد تتوقف المصانع وتتأخر الطلبات والشحنات.",
        en: "The most important factory and logistics disruption period of the year.",
        zh: "全年最重要的工厂和物流影响期，部分工厂可能停工，订单和运输可能延迟。",
      },
    },
    {
      id: "qingming",
      name: {
        ar: "عيد تشينغمينغ",
        en: "Qingming Festival",
        zh: "清明节",
      },
      date: "2027-04-05",
      days: 3,
      note: {
        ar: "إجازة رسمية وقد تتأثر بعض الخدمات والشحنات.",
        en: "Public holiday. Some services and logistics may be affected.",
        zh: "法定节假日，部分服务和物流可能受到影响。",
      },
    },
    {
      id: "labour-day",
      name: {
        ar: "عيد العمال",
        en: "Labour Day",
        zh: "劳动节",
      },
      date: "2027-05-01",
      days: 5,
      note: {
        ar: "فترة إجازة رسمية وقد يزداد ضغط الشحن قبل وبعد الإجازة.",
        en: "Public holiday period. Shipping demand may increase before and after the holiday.",
        zh: "法定节假日期间，节日前后物流需求可能增加。",
      },
    },
    {
      id: "dragon-boat",
      name: {
        ar: "عيد قوارب التنين",
        en: "Dragon Boat Festival",
        zh: "端午节",
      },
      date: "2027-06-09",
      days: 3,
      note: {
        ar: "إجازة رسمية قصيرة وقد تتأثر بعض العمليات.",
        en: "Short public holiday. Some operations may be affected.",
        zh: "短期法定节假日，部分业务可能受到影响。",
      },
    },
    {
      id: "mid-autumn",
      name: {
        ar: "عيد منتصف الخريف",
        en: "Mid-Autumn Festival",
        zh: "中秋节",
      },
      date: "2027-09-15",
      days: 3,
      note: {
        ar: "إجازة رسمية، وقد تتأثر بعض المصانع والخدمات اللوجستية.",
        en: "Public holiday. Some factories and logistics services may be affected.",
        zh: "法定节假日，部分工厂和物流服务可能受到影响。",
      },
    },
    {
      id: "national-day",
      name: {
        ar: "اليوم الوطني الصيني",
        en: "Chinese National Day",
        zh: "中国国庆节",
      },
      date: "2027-10-01",
      days: 7,
      note: {
        ar: "عطلة الأسبوع الذهبي. من المتوقع ارتفاع الطلب على الشحن قبل الإجازة وبعدها.",
        en: "Golden Week. Expect increased logistics demand before and after the holiday.",
        zh: "黄金周期间，节日前后物流需求通常会增加。",
      },
    },
  ],
};

const QUICK_WEATHER_CITIES: City[] = [
  {
    name: "Jeddah",
    nameAr: "جدة",
    nameEn: "Jeddah",
    nameZh: "吉达",
    country: "Saudi Arabia",
    countryAr: "السعودية",
    countryEn: "Saudi Arabia",
    countryZh: "沙特阿拉بية",
    countryCode: "SA",
    latitude: 21.4858,
    longitude: 39.1925,
  },
  {
    name: "Mecca",
    nameAr: "مكة",
    nameEn: "Mecca",
    nameZh: "麦加",
    country: "Saudi Arabia",
    countryAr: "السعودية",
    countryEn: "Saudi Arabia",
    countryZh: "沙特阿拉伯",
    countryCode: "SA",
    latitude: 21.3891,
    longitude: 39.8579,
  },
  {
    name: "Medina",
    nameAr: "المدينة المنورة",
    nameEn: "Medina",
    nameZh: "麦地那",
    country: "Saudi Arabia",
    countryAr: "السعودية",
    countryEn: "Saudi Arabia",
    countryZh: "沙特阿拉伯",
    countryCode: "SA",
    latitude: 24.5247,
    longitude: 39.5692,
  },
  {
    name: "Riyadh",
    nameAr: "الرياض",
    nameEn: "Riyadh",
    nameZh: "利雅得",
    country: "Saudi Arabia",
    countryAr: "السعودية",
    countryEn: "Saudi Arabia",
    countryZh: "沙特阿拉伯",
    countryCode: "SA",
    latitude: 24.7136,
    longitude: 46.6753,
  },
  {
    name: "Dammam",
    nameAr: "الدمام",
    nameEn: "Dammam",
    nameZh: "达曼",
    country: "Saudi Arabia",
    countryAr: "السعودية",
    countryEn: "Saudi Arabia",
    countryZh: "沙特阿拉伯",
    countryCode: "SA",
    latitude: 26.4207,
    longitude: 50.0888,
  },
  {
    name: "Khobar",
    nameAr: "الخبر",
    nameEn: "Khobar",
    nameZh: "胡拜尔",
    country: "Saudi Arabia",
    countryAr: "السعودية",
    countryEn: "Saudi Arabia",
    countryZh: "沙特阿拉伯",
    countryCode: "SA",
    latitude: 26.2172,
    longitude: 50.1971,
  },
  {
    name: "Dhahran",
    nameAr: "الظهران",
    nameEn: "Dhahran",
    nameZh: "宰赫兰",
    country: "Saudi Arabia",
    countryAr: "السعودية",
    countryEn: "Saudi Arabia",
    countryZh: "沙特阿拉伯",
    countryCode: "SA",
    latitude: 26.2361,
    longitude: 50.0393,
  },
  {
    name: "Taif",
    nameAr: "الطائف",
    nameEn: "Taif",
    nameZh: "塔伊夫",
    country: "Saudi Arabia",
    countryAr: "السعودية",
    countryEn: "Saudi Arabia",
    countryZh: "沙特阿拉伯",
    countryCode: "SA",
    latitude: 21.2703,
    longitude: 40.4158,
  },
  {
    name: "Tabuk",
    nameAr: "تبوك",
    nameEn: "Tabuk",
    nameZh: "塔布克",
    country: "Saudi Arabia",
    countryAr: "السعودية",
    countryEn: "Saudi Arabia",
    countryZh: "沙特阿拉伯",
    countryCode: "SA",
    latitude: 28.3838,
    longitude: 36.555,
  },
  {
    name: "Arar",
    nameAr: "عرعر",
    nameEn: "Arar",
    nameZh: "阿拉尔",
    country: "Saudi Arabia",
    countryAr: "السعودية",
    countryEn: "Saudi Arabia",
    countryZh: "沙特阿拉伯",
    countryCode: "SA",
    latitude: 30.9753,
    longitude: 41.0381,
  },
  {
    name: "Abha",
    nameAr: "أبها",
    nameEn: "Abha",
    nameZh: "艾卜哈",
    country: "Saudi Arabia",
    countryAr: "السعودية",
    countryEn: "Saudi Arabia",
    countryZh: "沙特阿拉伯",
    countryCode: "SA",
    latitude: 18.2164,
    longitude: 42.5053,
  },
  {
    name: "Khamis Mushait",
    nameAr: "خميس مشيط",
    nameEn: "Khamis Mushait",
    nameZh: "海米斯穆谢特",
    country: "Saudi Arabia",
    countryAr: "السعودية",
    countryEn: "Saudi Arabia",
    countryZh: "沙特阿拉伯",
    countryCode: "SA",
    latitude: 18.3,
    longitude: 42.7333,
  },
  {
    name: "Jazan",
    nameAr: "جازان",
    nameEn: "Jazan",
    nameZh: "吉赞",
    country: "Saudi Arabia",
    countryAr: "السعودية",
    countryEn: "Saudi Arabia",
    countryZh: "沙特阿拉伯",
    countryCode: "SA",
    latitude: 16.8892,
    longitude: 42.5511,
  },
  {
    name: "Najran",
    nameAr: "نجران",
    nameEn: "Najran",
    nameZh: "奈季兰",
    country: "Saudi Arabia",
    countryAr: "السعودية",
    countryEn: "Saudi Arabia",
    countryZh: "沙特阿拉伯",
    countryCode: "SA",
    latitude: 17.4924,
    longitude: 44.1277,
  },
  {
    name: "Hail",
    nameAr: "حائل",
    nameEn: "Hail",
    nameZh: "哈伊勒",
    country: "Saudi Arabia",
    countryAr: "السعودية",
    countryEn: "Saudi Arabia",
    countryZh: "沙特阿拉伯",
    countryCode: "SA",
    latitude: 27.5114,
    longitude: 41.7208,
  },
  {
    name: "Al Hofuf",
    nameAr: "الهفوف",
    nameEn: "Al Hofuf",
    nameZh: "胡富夫",
    country: "Saudi Arabia",
    countryAr: "السعودية",
    countryEn: "Saudi Arabia",
    countryZh: "沙特阿拉伯",
    countryCode: "SA",
    latitude: 25.3647,
    longitude: 49.5872,
  },
  {
    name: "Yanbu",
    nameAr: "ينبع",
    nameEn: "Yanbu",
    nameZh: "延布",
    country: "Saudi Arabia",
    countryAr: "السعودية",
    countryEn: "Saudi Arabia",
    countryZh: "沙特阿拉伯",
    countryCode: "SA",
    latitude: 24.0895,
    longitude: 38.0618,
  },
  {
    name: "Shanghai",
    nameAr: "شنغهاي",
    nameEn: "Shanghai",
    nameZh: "上海",
    country: "China",
    countryAr: "الصين",
    countryEn: "China",
    countryZh: "中国",
    countryCode: "CN",
    latitude: 31.2304,
    longitude: 121.4737,
  },
  {
    name: "Beijing",
    nameAr: "بكين",
    nameEn: "Beijing",
    nameZh: "北京",
    country: "China",
    countryAr: "الصين",
    countryEn: "China",
    countryZh: "中国",
    countryCode: "CN",
    latitude: 39.9042,
    longitude: 116.4074,
  },
  {
    name: "Guangzhou",
    nameAr: "قوانغتشو",
    nameEn: "Guangzhou",
    nameZh: "广州",
    country: "China",
    countryAr: "الصين",
    countryEn: "China",
    countryZh: "中国",
    countryCode: "CN",
    latitude: 23.1291,
    longitude: 113.2644,
  },
  {
    name: "Shenzhen",
    nameAr: "شنتشن",
    nameEn: "Shenzhen",
    nameZh: "深圳",
    country: "China",
    countryAr: "الصين",
    countryEn: "China",
    countryZh: "中国",
    countryCode: "CN",
    latitude: 22.5431,
    longitude: 114.0579,
  },
  {
    name: "Yiwu",
    nameAr: "إيوو",
    nameEn: "Yiwu",
    nameZh: "义乌",
    country: "China",
    countryAr: "الصين",
    countryEn: "China",
    countryZh: "中国",
    countryCode: "CN",
    latitude: 29.3069,
    longitude: 120.075,
  },
];

function cityName(city: City, language: Language) {
  if (language === "ar") return city.nameAr;
  if (language === "zh") return city.nameZh;
  return city.nameEn;
}

function cityCountry(city: City, language: Language) {
  if (language === "ar") return city.countryAr;
  if (language === "zh") return city.countryZh;
  return city.countryEn;
}

function formatDate(date: string, language: Language) {
  return new Intl.DateTimeFormat(
    language === "ar" ? "ar-SA" : language === "zh" ? "zh-CN" : "en-US",
    {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  ).format(new Date(`${date}T12:00:00`));
}

export default function ToolsMenu({
  language = "ar",
}: {
  language?: Language;
}) {
  const t = TEXT[language];

  const [open, setOpen] = useState(false);

  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [dragging, setDragging] = useState(false);

  const cityScrollRef = useRef<HTMLDivElement>(null);
 const dragOffset = useRef({
    x: 0,
    y: 0,
  });
  const [tab, setTab] = useState<Tab>("time");
  const [now, setNow] = useState(new Date());

  const [cityQuery, setCityQuery] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [city, setCity] = useState<City | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState<number | null>(null);
  const [currencyLoading, setCurrencyLoading] = useState(false);

  const [weight, setWeight] = useState("1");
  const [cartons, setCartons] = useState("1");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const [method, setMethod] = useState<"air" | "sea">("air");

  const [holidayYear, setHolidayYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  function handleMenuPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const menu = event.currentTarget.parentElement;

    if (!menu) {
      return;
    }

    const rect = menu.getBoundingClientRect();

    dragOffset.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    setDragging(true);

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handleMenuPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) {
      return;
    }

    const menuWidth = 390;
    const menuHeight = 120;

    const maxX = Math.max(8, window.innerWidth - menuWidth - 8);

    const maxY = Math.max(8, window.innerHeight - menuHeight - 8);

    const x = Math.min(Math.max(8, event.clientX - dragOffset.current.x), maxX);

    const y = Math.min(Math.max(8, event.clientY - dragOffset.current.y), maxY);

    setMenuPosition({
      x,
      y,
    });
  }

  function handleMenuPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    setDragging(false);

    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture may already be released.
    }
  }

  async function loadRate() {
    setCurrencyLoading(true);

    try {
      const response = await fetch("/api/exchange-rate", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to fetch exchange rate");
      }

      const value = Number(data?.rate);

      if (!Number.isFinite(value) || value <= 0) {
        throw new Error("Invalid SAR/CNY rate");
      }

      setRate(value);
    } catch (error) {
      console.error("EXCHANGE RATE ERROR:", error);
      setRate(null);
    } finally {
      setCurrencyLoading(false);
    }
  }

  async function searchCities() {
    const query = cityQuery.trim();

    if (!query) {
      setCities([]);
      return;
    }

    const normalize = (value: string) =>
      value
        .toLocaleLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[أإآ]/g, "ا")
        .replace(/ة/g, "ه")
        .replace(/ى/g, "ي")
        .trim();

    const normalizedQuery = normalize(query);

    const quickMatches = QUICK_WEATHER_CITIES.filter((item) =>
      [
        item.name,
        item.nameAr,
        item.nameEn,
        item.nameZh,
        item.countryAr,
        item.countryEn,
        item.countryZh,
      ].some((value) => normalize(value).includes(normalizedQuery)),
    );

    const searchQueries = Array.from(new Set([query, normalizedQuery])).filter(
      Boolean,
    );

    try {
      const allResults: City[] = [];

      for (const searchQuery of searchQueries) {
        const url =
          "https://geocoding-api.open-meteo.com/v1/search" +
          `?name=${encodeURIComponent(searchQuery)}` +
          "&count=100&language=en&format=json";

        const response = await fetch(url, {
          cache: "no-store",
        });

        if (!response.ok) {
          continue;
        }

        const data = await response.json();

        const results: City[] = (data.results ?? [])
          .filter(
            (item: {
              name?: string;
              country?: string;
              country_code?: string;
              latitude?: number;
              longitude?: number;
              admin1?: string;
            }) =>
              (item.country_code === "SA" || item.country_code === "CN") &&
              typeof item.name === "string" &&
              typeof item.latitude === "number" &&
              typeof item.longitude === "number",
          )
          .map(
            (item: {
              name: string;
              country: string;
              country_code: "SA" | "CN";
              latitude: number;
              longitude: number;
              admin1?: string;
            }) => ({
              name: item.name,
              nameAr: item.name,
              nameEn: item.name,
              nameZh: item.name,
              country: item.country,
              countryAr: item.country_code === "SA" ? "السعودية" : "الصين",
              countryEn: item.country_code === "SA" ? "Saudi Arabia" : "China",
              countryZh: item.country_code === "SA" ? "沙特阿拉伯" : "中国",
              countryCode: item.country_code,
              latitude: item.latitude,
              longitude: item.longitude,
              admin1: item.admin1,
            }),
          );

        allResults.push(...results);
      }

      const merged = [
        ...quickMatches,
        ...allResults.filter(
          (result, index, array) =>
            !array.some(
              (other, otherIndex) =>
                otherIndex < index &&
                Math.abs(other.latitude - result.latitude) < 0.01 &&
                Math.abs(other.longitude - result.longitude) < 0.01,
            ) &&
            !quickMatches.some(
              (quick) =>
                Math.abs(quick.latitude - result.latitude) < 0.01 &&
                Math.abs(quick.longitude - result.longitude) < 0.01,
            ),
        ),
      ].slice(0, 30);

      setCities(merged);
    } catch (error) {
      console.error("CITY SEARCH ERROR:", error);
      setCities(quickMatches);
    }
  }

  async function loadWeather(selectedCity: City) {
    setCity(selectedCity);
    setCities([]);
    setWeatherLoading(true);

    try {
      const url =
        "https://api.open-meteo.com/v1/forecast" +
        `?latitude=${selectedCity.latitude}` +
        `&longitude=${selectedCity.longitude}` +
        "&current=temperature_2m,apparent_temperature,wind_speed_10m" +
        "&timezone=auto";

      const response = await fetch(url, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Weather request failed");
      }

      const data = await response.json();

      setWeather({
        temperature: Number(data.current?.temperature_2m ?? 0),
        apparent: Number(data.current?.apparent_temperature ?? 0),
        wind: Number(data.current?.wind_speed_10m ?? 0),
      });
    } catch {
      setWeather(null);
    } finally {
      setWeatherLoading(false);
    }
  }

  const shipping = useMemo(() => {
    const actualKg = Math.max(Number(weight) || 0, 0);
    const boxCount = Math.max(Math.floor(Number(cartons) || 1), 1);

    const l = Math.max(Number(length) || 0, 0);
    const w = Math.max(Number(width) || 0, 0);
    const h = Math.max(Number(height) || 0, 0);

    const volumePerCartonM3 = (l * w * h) / 1_000_000;

    const totalVolumeM3 = volumePerCartonM3 * boxCount;

    /*
     * Air freight:
     *
     * IATA example/rule:
     * cm³ / 6000 = volumetric kg
     *
     * We deliberately use 6000 here as an IATA reference
     * and clearly label it as carrier/service dependent.
     */
    const airVolumetricKg =
      l > 0 && w > 0 && h > 0 ? (l * w * h * boxCount) / 6000 : 0;

    const chargeableAirKg = Math.max(actualKg, airVolumetricKg);

    return {
      actualKg,
      boxCount,
      volumePerCartonM3,
      totalVolumeM3,
      airVolumetricKg,
      chargeableAirKg,
    };
  }, [weight, cartons, length, width, height]);

  const formattedTime = new Intl.DateTimeFormat(
    language === "ar" ? "ar-SA" : language === "zh" ? "zh-CN" : "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: language === "en",
    },
  ).format(now);

  const formattedDate = new Intl.DateTimeFormat(
    language === "ar" ? "ar-SA" : language === "zh" ? "zh-CN" : "en-US",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  ).format(now);

  const converted = rate !== null ? (Number(amount) || 0) * rate : null;

  const holidays = useMemo(() => HOLIDAYS[holidayYear] ?? [], [holidayYear]);

  const tabs: Array<[Tab, string, string]> = [
    ["time", "🕐", t.time],
    ["weather", "🌤️", t.weather],
    ["currency", "💱", t.currency],
    ["shipping", "📦", t.shipping],
    ["holidays", "🧧", t.holidays],
  ];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={t.tools}
        className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-[11px] font-semibold transition ${
          open
            ? "border-[#c94a3d] bg-[#c94a3d] text-white"
            : "border-[#cdbfb4] text-[#554d46] hover:border-[#c94a3d] hover:text-[#c94a3d]"
        }`}
      >
        <span aria-hidden="true">⚙</span>
        {t.tools}
      </button>

      {open && (
        /*
         * DROPDOWN POSITION
         *
         * غيّر هذه القيم من className الموجود أسفل هذا التعليق:
         *
         * top-[calc(100%+12px)] = أسفل الزر + 12px
         * end-0                  = محاذاة مع نهاية الزر
         *
         * أمثلة:
         * top-full              = مباشرة أسفل الزر
         * top-[calc(100%+20px)] = أسفل الزر + 20px
         * -top-[200px]          = فوق الزر
         * start-0               = محاذاة من البداية
         * end-0                 = محاذاة من النهاية
         * start-1/2            = بداية القائمة من منتصف الزر
         *
         * لا تستخدم fixed هنا حتى تبقى القائمة مرتبطة بزر الأدوات.
         */
        <div
          dir={language === "ar" ? "rtl" : "ltr"}
          className="fixed z-[80] w-[420px] max-w-[calc(100vw-24px)] overflow-hidden rounded-[24px] border border-[#e3ddd6] bg-[#f8f6f2] shadow-[0_20px_60px_rgba(40,30,20,0.18)]"

          style={{
            left: menuPosition ? `${menuPosition.x}px` : undefined,
            top: menuPosition ? `${menuPosition.y}px` : undefined,
            right: menuPosition ? undefined : "24px",
          }}
        >
          <div
            onPointerDown={handleMenuPointerDown}
            onPointerMove={handleMenuPointerMove}
            onPointerUp={handleMenuPointerUp}
            onPointerCancel={handleMenuPointerUp}
            className={`flex cursor-grab select-none items-center justify-between border-b border-[#e3ddd6] bg-white px-4 py-2 ${
              dragging ? "cursor-grabbing" : ""
            }`}
            style={{ touchAction: "none" }}
          >
            <span className="text-[9px] font-semibold tracking-[0.12em] text-[#9a9087]">
              {language === "ar"
                ? "اسحب لتحريك القائمة"
                : language === "zh"
                  ? "拖动移动菜单"
                  : "DRAG TO MOVE"}
            </span>

            <span className="text-[#b5aaa0]" aria-hidden="true">
              ⋮⋮
            </span>
          </div>

          <div className="overflow-x-auto border-b border-[#e3ddd6] bg-white p-2">
            <div className="flex min-w-max gap-1">
              {tabs.map(([value, icon, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTab(value)}
                  className={`rounded-xl px-3 py-2 text-[10px] font-semibold transition ${
                    tab === value
                      ? "bg-[#171717] text-white"
                      : "text-[#756b62] hover:bg-[#f3f0eb]"
                  }`}
                >
                  <span className="me-1">{icon}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-[70vh] overflow-y-auto overscroll-contain p-5">
            {tab === "time" && (
              <div className="text-center">
                <p className="text-[10px] font-semibold text-[#9a9087]">
                  {t.time}
                </p>

                <p
                  dir="ltr"
                  className="mt-3 text-4xl font-semibold tracking-tight text-[#302c28]"
                >
                  {formattedTime}
                </p>

                <p className="mt-3 text-xs text-[#756b62]">{formattedDate}</p>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <div className="rounded-2xl bg-white p-4 ring-1 ring-[#e3ddd6]">
                    <p className="text-[10px] text-[#9a9087]">🇸🇦 {t.saudi}</p>
                    <p className="mt-2 text-sm font-semibold text-[#554d46]">
                      Asia/Riyadh
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-4 ring-1 ring-[#e3ddd6]">
                    <p className="text-[10px] text-[#9a9087]">🇨🇳 {t.china}</p>
                    <p className="mt-2 text-sm font-semibold text-[#554d46]">
                      Asia/Shanghai
                    </p>
                  </div>
                </div>
              </div>
            )}

            {tab === "weather" && (
              <div>
                <p className="text-[10px] font-semibold text-[#9a9087]">
                  {t.weather}
                </p>

                <section className="mt-4">
                  <div className="flex items-center justify-between">
                    <p className="text- font-semibold tracking-wide text-[#756b62]">{language === "ar"? "المدن السريعة" : language === "zh"? "快速城市" : "Quick cities"}</p>
                    <div className="flex gap-1">
                      <button type="button" onClick={() => cityScrollRef.current?.scrollBy({ left: -220, behavior: "smooth" })} className="h-6 w-6 rounded-full bg-white ring-1 ring-[#e3ddd6] flex items-center justify-center text- hover:bg-black hover:text-white">‹</button>
                      <button type="button" onClick={() => cityScrollRef.current?.scrollBy({ left: 220, behavior: "smooth" })} className="h-6 w-6 rounded-full bg-white ring-1 ring-[#e3ddd6] flex items-center justify-center text- hover:bg-black hover:text-white">›</button>
                    </div>
                  </div>
                  <div ref={cityScrollRef} className="mt-3 flex gap-2 overflow-x-auto pb-3 snap-x snap-mandatory -mx-1 px-1 scrollbar-hide" style={{scrollbarWidth:"none"}}>
                    {QUICK_WEATHER_CITIES.map((item) => {
                      const active = city?.latitude === item.latitude;
                      return (
                        <button key={`${item.latitude}-${item.longitude}`} type="button" onClick={() => void loadWeather(item)} className={`snap-start shrink-0 flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold ring-1 transition ${active? "bg-black text-white ring-black" : "bg-white text-[#554d46] ring-[#e3ddd6] hover:bg-black hover:text-white"}`}>
                          <span>{item.countryCode==="SA"?"🇸🇦":"🇨🇳"}</span><span className="whitespace-nowrap">{cityName(item, language)}</span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section className="mt-5">
                  <p className="text-[10px] font-semibold text-[#756b62]">
                    {language === "ar"
                      ? "البحث عن مدينة"
                      : language === "zh"
                        ? "搜索城市"
                        : "Search for a city"}
                  </p>

                  <p className="mt-1 text-[9px] leading-5 text-[#9a9087]">
                    {language === "ar"
                      ? "اكتب اسم المدينة بالعربي أو English أو 中文"
                      : language === "zh"
                        ? "可以使用阿拉伯语、English 或中文搜索"
                        : "Search in Arabic, English, or Chinese"}
                  </p>

                  <div className="mt-3 flex gap-2">
                    <input
                      value={cityQuery}
                      onChange={(event) => setCityQuery(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          void searchCities();
                        }
                      }}
                      placeholder={
                        language === "ar"
                          ? "جدة / Jeddah / 上海"
                          : language === "zh"
                            ? "جدة / Jeddah / 上海"
                            : "جدة / Jeddah / 上海"
                      }
                      className="min-w-0 flex-1 rounded-2xl border border-[#e3ddd6] bg-white px-3 py-3 text-xs outline-none focus:border-[#c94a3d]"
                    />

                    <button
                      type="button"
                      onClick={() => void searchCities()}
                      className="shrink-0 rounded-2xl bg-[#171717] px-4 text-xs font-semibold text-white transition hover:bg-[#c94a3d]"
                    >
                      {t.search}
                    </button>
                  </div>
                </section>

                {cities.length > 0 && (
                  <div className="mt-3 max-h-52 overflow-y-auto rounded-2xl border border-[#e3ddd6] bg-white">
                    {cities.map((item) => (
                      <button
                        key={`${item.countryCode}-${item.latitude}-${item.longitude}`}
                        type="button"
                        onClick={() => void loadWeather(item)}
                        className="block w-full border-b border-[#eee8e1] px-4 py-3 text-start last:border-0 hover:bg-[#faf9f7]"
                      >
                        <div className="flex items-center gap-2">
                          <span>{item.countryCode === "SA" ? "🇸🇦" : "🇨🇳"}</span>

                          <div>
                            <p className="text-xs font-semibold text-[#554d46]">
                              {cityName(item, language)}
                            </p>

                            <p className="mt-1 text-[9px] text-[#9a9087]">
                              {cityCountry(item, language)}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {city && (
                  <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-[#e3ddd6]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-[#302c28]">
                          {cityName(city, language)}
                        </p>

                        <p className="mt-1 text-[9px] text-[#9a9087]">
                          {cityCountry(city, language)}
                        </p>
                      </div>

                      <span className="text-2xl">🌤️</span>
                    </div>

                    {weatherLoading ? (
                      <p className="mt-4 text-xs text-[#756b62]">{t.loading}</p>
                    ) : weather ? (
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        <div className="rounded-xl bg-[#f8f6f2] p-2 text-center">
                          <p className="text-[9px] text-[#9a9087]">
                            {t.temperature}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-[#302c28]">
                            {weather.temperature}°C
                          </p>
                        </div>

                        <div className="rounded-xl bg-[#f8f6f2] p-2 text-center">
                          <p className="text-[9px] text-[#9a9087]">
                            {t.feelsLike}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-[#302c28]">
                            {weather.apparent}°C
                          </p>
                        </div>

                        <div className="rounded-xl bg-[#f8f6f2] p-2 text-center">
                          <p className="text-[9px] text-[#9a9087]">{t.wind}</p>
                          <p className="mt-1 text-sm font-semibold text-[#302c28]">
                            {weather.wind} km/h
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-4 text-xs text-[#756b62]">{t.noCity}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {tab === "currency" && (
              <div>
                <p className="text-[10px] font-semibold text-[#9a9087]">
                  {t.currency}
                </p>

                <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-[#e3ddd6]">
                  <label className="text-[10px] text-[#756b62]">
                    {t.amount}
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#e3ddd6] bg-[#f8f6f2] px-4 py-3 text-sm outline-none focus:border-[#c94a3d]"
                  />

                  <div className="mt-4">
                    <p className="text-[10px] text-[#9a9087]">{t.cnyValue}</p>

                    <p className="mt-1 text-2xl font-semibold text-[#302c28]">
                      {currencyLoading
                        ? "..."
                        : converted !== null
                          ? `${converted.toFixed(2)} CNY`
                          : "—"}
                    </p>

                    {!currencyLoading && rate === null && (
                      <p className="mt-2 text-[10px] text-[#c94a3d]">
                        {t.rateError}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => void loadRate()}
                  className="mt-3 w-full rounded-2xl bg-[#171717] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#c94a3d]"
                >
                  {currencyLoading ? t.loadingRate : t.refresh}
                </button>
              </div>
            )}

            {tab === "shipping" && (
              <div>
                <p className="text-[10px] font-semibold text-[#9a9087]">
                  {t.shipping}
                </p>

                <div className="mt-4">
                  <label className="text-[10px] text-[#756b62]">
                    {t.actualWeight} ({t.kg})
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={weight}
                    onChange={(event) => setWeight(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#e3ddd6] bg-white px-3 py-3 text-sm outline-none focus:border-[#c94a3d]"
                  />
                </div>

                <div className="mt-4">
                  <label className="text-[10px] text-[#756b62]">
                    {t.cartons}
                  </label>

                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={cartons}
                    onChange={(event) => setCartons(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#e3ddd6] bg-white px-3 py-3 text-sm outline-none focus:border-[#c94a3d]"
                  />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-[#756b62]">
                      {t.length} ({t.cm})
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={length}
                      onChange={(event) => setLength(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-[#e3ddd6] bg-white px-3 py-3 text-sm outline-none focus:border-[#c94a3d]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-[#756b62]">
                      {t.width} ({t.cm})
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={width}
                      onChange={(event) => setWidth(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-[#e3ddd6] bg-white px-3 py-3 text-sm outline-none focus:border-[#c94a3d]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-[#756b62]">
                      {t.height} ({t.cm})
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={height}
                      onChange={(event) => setHeight(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-[#e3ddd6] bg-white px-3 py-3 text-sm outline-none focus:border-[#c94a3d]"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-[10px] text-[#756b62]">{t.method}</p>

                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setMethod("air")}
                      className={`rounded-2xl px-3 py-3 text-xs font-semibold ${
                        method === "air"
                          ? "bg-[#171717] text-white"
                          : "bg-white text-[#554d46] ring-1 ring-[#e3ddd6]"
                      }`}
                    >
                      ✈️ {t.air}
                    </button>

                    <button
                      type="button"
                      onClick={() => setMethod("sea")}
                      className={`rounded-2xl px-3 py-3 text-xs font-semibold ${
                        method === "sea"
                          ? "bg-[#171717] text-white"
                          : "bg-white text-[#554d46] ring-1 ring-[#e3ddd6]"
                      }`}
                    >
                      🚢 {t.sea}
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <div className="rounded-2xl bg-white p-4 ring-1 ring-[#e3ddd6]">
                    <p className="text-[9px] text-[#9a9087]">{t.totalVolume}</p>

                    <p className="mt-2 text-xl font-semibold text-[#302c28]">
                      {shipping.totalVolumeM3.toFixed(3)}
                      {" m³"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-4 ring-1 ring-[#e3ddd6]">
                    <p className="text-[9px] text-[#9a9087]">
                      {t.volumetricWeight}
                    </p>

                    <p className="mt-2 text-xl font-semibold text-[#302c28]">
                      {method === "air"
                        ? shipping.airVolumetricKg.toFixed(2)
                        : "—"}
                      {method === "air" && " kg"}
                    </p>
                  </div>
                </div>

                <div className="mt-2 rounded-2xl bg-white p-4 ring-1 ring-[#e3ddd6]">
                  <p className="text-[9px] text-[#9a9087]">
                    {t.chargeableWeight}
                  </p>

                  <p className="mt-2 text-2xl font-semibold text-[#302c28]">
                    {method === "air"
                      ? shipping.chargeableAirKg.toFixed(2)
                      : shipping.actualKg.toFixed(2)}
                    {" kg "}
                    <span className="text-xs font-medium text-[#756b62]">
                      (
                      {method === "air"
                        ? shipping.airVolumetricKg > shipping.actualKg
                          ? t.volumetric
                          : t.actual
                        : t.actual}
                      )
                    </span>
                  </p>
                </div>

                <div className="mt-4 rounded-2xl border border-[#e3ddd6] bg-[#fff] p-4">
                  <p className="text-[10px] font-semibold text-[#554d46]">
                    {t.calculationBasis}
                  </p>

                  <p className="mt-2 text-[10px] leading-5 text-[#756b62]">
                    {method === "air" ? t.airBasis : t.seaBasis}
                  </p>

                  {method === "air" && (
                    <p className="mt-2 text-[9px] leading-5 text-[#9a9087]">
                      {t.source}: {t.iata}. {t.carrierDependent}.
                    </p>
                  )}

                  {method === "sea" && (
                    <p className="mt-2 text-[9px] leading-5 text-[#9a9087]">
                      {t.source}: {t.carrierDependent}.
                    </p>
                  )}
                </div>

                <div className="mt-4 rounded-2xl border border-[#ead3ce] bg-[#fff8f6] p-4">
                  <p className="text-[10px] leading-5 text-[#756b62]">
                    {t.shippingExplanation}
                  </p>
                </div>
              </div>
            )}

            {tab === "holidays" && (
              <div>
                <div className="mb-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-semibold tracking-[0.18em] text-[#9a9087]">
                        🧧 {t.holidays}
                      </p>

                      <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#302c28]">
                        {language === "ar"
                          ? "التقويم الصيني"
                          : language === "zh"
                            ? "中国节假日"
                            : "Chinese Holiday Calendar"}
                      </h3>

                      <p className="mt-2 text-[11px] leading-5 text-[#756b62]">
                        {language === "ar"
                          ? "اختر أي عيد لمعرفة التاريخ ومدة الإجازة وتأثيرها المحتمل على المصانع والشحن."
                          : language === "zh"
                            ? "点击节日查看日期、假期长度以及对工厂和物流的可能影响。"
                            : "Select a holiday to view the date, duration and possible impact on factories and logistics."}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-[#f3f0eb] px-3 py-2 text-[10px] font-semibold text-[#554d46]">
                      {holidayYear}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-[10px] font-semibold text-[#756b62]">
                    {t.year}
                  </label>

                  <select
                    value={holidayYear}
                    onChange={(event) =>
                      setHolidayYear(Number(event.target.value))
                    }
                    className="w-full rounded-2xl border border-[#e3ddd6] bg-white px-4 py-3 text-xs font-semibold text-[#554d46] outline-none transition focus:border-[#c94a3d]"
                  >
                    <option value={2026}>2026</option>
                    <option value={2027}>2027</option>
                  </select>
                </div>

                <div className="space-y-2">
                  {holidays.map((holiday, index) => (
                    <details
                      key={`${holidayYear}-${holiday.id}`}
                      className="group overflow-hidden rounded-2xl border border-[#e5ded7] bg-white transition-shadow open:shadow-[0_8px_25px_rgba(40,30,20,0.06)]"
                    >
                      <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-4 [&::-webkit-details-marker]:hidden">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f8f6f2] text-sm font-semibold text-[#9a9087]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-[#302c28]">
                            {holiday.name[language]}
                          </p>

                          <p className="mt-1 text-[9px] text-[#9a9087]">
                            {language === "ar"
                              ? "اضغط لعرض التاريخ والتفاصيل"
                              : language === "zh"
                                ? "点击查看日期和详情"
                                : "Click to view date and details"}
                          </p>
                        </div>

                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f8f6f2] text-sm text-[#756b62] transition-transform group-open:rotate-180">
                          ↓
                        </span>
                      </summary>

                      <div className="border-t border-[#eee8e1] px-4 pb-4 pt-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="rounded-xl bg-[#f8f6f2] p-3">
                            <p className="text-[9px] text-[#9a9087]">
                              {language === "ar"
                                ? "تاريخ البداية"
                                : language === "zh"
                                  ? "开始日期"
                                  : "Start date"}
                            </p>

                            <p className="mt-1 text-xs font-semibold text-[#302c28]">
                              {formatDate(holiday.date, language)}
                            </p>
                          </div>

                          <div className="rounded-xl bg-[#f8f6f2] p-3">
                            <p className="text-[9px] text-[#9a9087]">
                              {language === "ar"
                                ? "مدة الإجازة"
                                : language === "zh"
                                  ? "假期长度"
                                  : "Duration"}
                            </p>

                            <p className="mt-1 text-xs font-semibold text-[#302c28]">
                              {holiday.days}{" "}
                              {language === "ar"
                                ? "أيام"
                                : language === "zh"
                                  ? "天"
                                  : "days"}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 rounded-xl border border-[#ead3ce] bg-[#fff8f6] p-3">
                          <p className="text-[9px] font-semibold text-[#c94a3d]">
                            ⚠️ {t.factoryWarning}
                          </p>

                          <p className="mt-1 text-[10px] leading-5 text-[#756b62]">
                            {holiday.note[language]}
                          </p>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-[#ead3ce] bg-[#fff8f6] p-4">
                  <p className="text-[10px] font-semibold text-[#c94a3d]">
                    ⚠️ {t.factoryWarning}
                  </p>

                  <p className="mt-2 text-[10px] leading-5 text-[#756b62]">
                    {t.factoryNote}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
