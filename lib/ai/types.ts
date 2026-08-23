export type AIUserType = "guest" | "customer" | "team";

export type AIMessageRole =
  | "system"
  | "user"
  | "assistant"
  | "tool";

export type AIToolName =
  | "search_knowledge"
  | "search_products"
  | "search_suppliers"
  | "get_customer"
  | "get_project"
  | "get_order"
  | "create_request"
  | "create_task";

export type AIIntent =
  | "general_question"
  | "product_search"
  | "supplier_search"
  | "china_information"
  | "customer_support"
  | "project_status"
  | "order_status"
  | "create_request"
  | "unknown";

export type AIMessage = {
  role: AIMessageRole;
  content: string;
  name?: string;
  toolCallId?: string;
};

export type AIContext = {
  userId?: string;
  userType: AIUserType;
  locale: "ar" | "en" | "zh";
  pathname?: string;
  sessionId?: string;
};

export type AIRequest = {
  message: string;
  history?: AIMessage[];
  context?: Partial<AIContext>;
};

export type AIToolResult = {
  success: boolean;
  tool: AIToolName;
  data?: unknown;
  message?: string;
};

export type AIResponse = {
  success: boolean;
  message: string;
  intent: AIIntent;
  toolsUsed: AIToolName[];
};
