import type {
  AIIntent,
  AIContext,
  AIToolName,
} from "./types";

const intentKeywords: Record<
  Exclude<AIIntent, "unknown">,
  string[]
> = {
  general_question: [
    "مرحبا",
    "السلام",
    "اهلا",
    "أهلا",
    "كيف حالك",
    "من انت",
    "ماذا تستطيع",
    "hello",
    "hi",
    "help",
  ],

  product_search: [
    "منتج",
    "منتجات",
    "سعر",
    "أسعار",
    "شراء",
    "ابحث عن",
    "أبحث عن",
    "أريد",
    "كم سعر",
    "product",
    "products",
    "price",
    "buy",
    "looking for",
  ],

  supplier_search: [
    "مصنع",
    "مصانع",
    "مورد",
    "موردين",
    "موردون",
    "شركة تصنيع",
    "تصنيع",
    "مصدر",
    "factory",
    "supplier",
    "manufacturer",
  ],

  china_information: [
    "الصين",
    "شنغهاي",
    "قوانغتشو",
    "غوانزو",
    "شنتشن",
    "شينزن",
    "إيوو",
    "بكين",
    "هانغتشو",
    "السفر",
    "التجارة",
    "الاستيراد",
    "الجمارك",
    "china",
    "shanghai",
    "guangzhou",
    "shenzhen",
    "yiwu",
    "beijing",
    "import",
    "shipping",
  ],

  customer_support: [
    "حسابي",
    "حساب",
    "مشكلتي",
    "مشكلة",
    "مساعدة",
    "طلب المساعدة",
    "بياناتي",
    "my account",
    "support",
    "problem",
  ],

  project_status: [
    "مشروعي",
    "المشروع",
    "حالة المشروع",
    "مشروعي الحالي",
    "مشاريع",
    "project",
    "project status",
    "my project",
  ],

  order_status: [
    "طلبي",
    "الطلب",
    "حالة الطلب",
    "الشحنة",
    "الشحن",
    "التوصيل",
    "وين طلبي",
    "أين طلبي",
    "order",
    "order status",
    "shipment",
    "tracking",
  ],

  create_request: [
    "أنشئ طلب",
    "انشئ طلب",
    "سجل طلب",
    "سجل لي",
    "أريد تقديم طلب",
    "قدم طلب",
    "أرسل طلب",
    "افتح طلب",
    "create request",
    "submit request",
    "new request",
  ],
};

function normalizeText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[ًٌٍَُِّْـ]/g, "")
    .replace(/[؟?!،,.]/g, " ");
}

export function detectIntent(message: string): AIIntent {
  const text = normalizeText(message);

  if (!text) {
    return "unknown";
  }

  const scores = new Map<AIIntent, number>();

  for (const [intent, keywords] of Object.entries(
    intentKeywords
  ) as [
    Exclude<AIIntent, "unknown">,
    string[]
  ][]) {
    let score = 0;

    for (const keyword of keywords) {
      const normalizedKeyword = normalizeText(keyword);

      if (text.includes(normalizedKeyword)) {
        score += normalizedKeyword.includes(" ")
          ? 2
          : 1;
      }
    }

    if (score > 0) {
      scores.set(intent, score);
    }
  }

  if (!scores.size) {
    return "unknown";
  }

  return [...scores.entries()].sort(
    (a, b) => b[1] - a[1]
  )[0][0];
}

export function getToolsForIntent(
  intent: AIIntent,
  context: AIContext
): AIToolName[] {
  switch (intent) {
    case "product_search":
      return ["search_products"];

    case "supplier_search":
      return ["search_suppliers"];

    case "china_information":
      return ["search_knowledge"];

    case "customer_support":
      if (context.userType === "guest") {
        return ["search_knowledge"];
      }

      return ["get_customer"];

    case "project_status":
      if (
        context.userType !== "customer" &&
        context.userType !== "team"
      ) {
        return ["search_knowledge"];
      }

      return ["get_project"];

    case "order_status":
      if (
        context.userType !== "customer" &&
        context.userType !== "team"
      ) {
        return ["search_knowledge"];
      }

      return ["get_order"];

    case "create_request":
      if (context.userType === "guest") {
        return ["search_knowledge"];
      }

      return ["create_request"];

    case "general_question":
    case "unknown":
    default:
      // مهم:
      // حتى الأسئلة العامة يتم تمريرها إلى Knowledge Base
      // حتى لا يعتمد Gemini على معلوماته العامة فقط.
      return ["search_knowledge"];
  }
}

export function buildRoutingResult(
  message: string,
  context: AIContext
) {
  const intent = detectIntent(message);

  const tools = getToolsForIntent(
    intent,
    context
  );

  return {
    intent,
    tools,
  };
}