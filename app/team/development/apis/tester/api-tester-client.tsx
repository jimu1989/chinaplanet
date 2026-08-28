"use client";

import { useMemo, useState } from "react";

type ApiDefinition = {
  id: string;
  name: string;
  method: "GET";
  endpoint: string;
  description: string;
};

type TestResult = {
  ok: boolean;
  status: number | null;
  duration: number;
  headers: Record<string, string>;
  body: unknown;
  error?: string;
  timestamp: string;
};

const APIS: ApiDefinition[] = [
  {
    id: "dashboard",
    name: "Team Dashboard",
    method: "GET",
    endpoint: "/api/team/dashboard",
    description: "قراءة بيانات لوحة تحكم الفريق.",
  },
  {
    id: "members",
    name: "Team Members",
    method: "GET",
    endpoint: "/api/team/members",
    description: "اختبار نقطة أعضاء الفريق.",
  },
  {
    id: "permissions",
    name: "Team Permissions",
    method: "GET",
    endpoint: "/api/team/permissions",
    description: "قراءة مصفوفة صلاحيات الفريق.",
  },
  {
    id: "service-requests",
    name: "Service Requests",
    method: "GET",
    endpoint: "/api/team/service-requests",
    description: "قراءة طلبات الخدمات.",
  },
  {
    id: "api-catalog",
    name: "API Catalog",
    method: "GET",
    endpoint: "/api/team/api-catalog",
    description: "قراءة كتالوج APIs.",
  },
  {
    id: "system-health",
    name: "System Health",
    method: "GET",
    endpoint: "/api/team/system-health",
    description: "اختبار صحة النظام.",
  },
];

function formatBody(body: unknown) {
  if (typeof body === "string") {
    return body;
  }

  try {
    return JSON.stringify(body, null, 2);
  } catch {
    return String(body);
  }
}

export default function ApiTesterClient() {
  const [selectedId, setSelectedId] = useState(APIS[0].id);
  const [query, setQuery] = useState("");
  const [body, setBody] = useState("{}");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [history, setHistory] = useState<TestResult[]>([]);
  const [copied, setCopied] = useState(false);

  const selectedApi = useMemo(
    () => APIS.find((api) => api.id === selectedId) ?? APIS[0],
    [selectedId],
  );

  async function runTest() {
    setLoading(true);
    setCopied(false);

    const started = performance.now();

    try {
      let parsedBody: unknown = undefined;

      if (body.trim() && body.trim() !== "{}") {
        parsedBody = JSON.parse(body);
      }

      const response = await fetch("/api/team/development/test", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Dev-Test-Api": selectedApi.id,
          ...(parsedBody
            ? {
                "X-Dev-Test-Body": JSON.stringify(parsedBody),
              }
            : {}),
          ...(query.trim()
            ? {
                "X-Dev-Test-Query": query.trim(),
              }
            : {}),
        },
        cache: "no-store",
      });

      const duration = Math.round(performance.now() - started);
      const responseText = await response.text();

      let responseBody: unknown = responseText;

      try {
        responseBody = responseText
          ? JSON.parse(responseText)
          : null;
      } catch {
        // Keep plain text response.
      }

      const headers: Record<string, string> = {};

      response.headers.forEach((value, key) => {
        headers[key] = value;
      });

      const nextResult: TestResult = {
        ok: response.ok,
        status: response.status,
        duration,
        headers,
        body: responseBody,
        timestamp: new Date().toISOString(),
      };

      setResult(nextResult);
      setHistory((current) => [nextResult, ...current].slice(0, 10));
    } catch (error) {
      const duration = Math.round(performance.now() - started);

      const nextResult: TestResult = {
        ok: false,
        status: null,
        duration,
        headers: {},
        body: null,
        error:
          error instanceof Error
            ? error.message
            : "حدث خطأ غير معروف.",
        timestamp: new Date().toISOString(),
      };

      setResult(nextResult);
      setHistory((current) => [nextResult, ...current].slice(0, 10));
    } finally {
      setLoading(false);
    }
  }

  async function copyResponse() {
    if (!result) return;

    await navigator.clipboard.writeText(formatBody(result.body));
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <main
      dir="rtl"
      className="min-h-[calc(100vh-125px)] bg-[#f3f0eb] px-5 py-8 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[38px] bg-white p-7 shadow-[0_15px_50px_rgba(40,30,20,0.05)] lg:p-10">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-10 bg-[#c94a3d]" />
            <span className="text-[10px] font-semibold tracking-[0.3em] text-[#a69c93]">
              API TESTER V2
            </span>
          </div>

          <div className="mt-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-3xl font-bold text-[#40372f]">
                مختبر واجهات البرمجة
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-8 text-[#8a8179]">
                أداة داخلية لاختبار APIs الخاصة بالمشروع مع حماية
                manage_project وتنفيذ محصور داخل القائمة المسموحة.
              </p>
            </div>

            <div className="rounded-full bg-[#f5f2ed] px-4 py-2 text-xs font-semibold text-[#756b62]">
              INTERNAL • GET ONLY
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-bold text-[#5d554e]">
                  API
                </label>

                <select
                  value={selectedId}
                  onChange={(event) => {
                    setSelectedId(event.target.value);
                    setResult(null);
                  }}
                  className="w-full rounded-2xl border border-[#e7e1da] bg-[#faf8f5] px-4 py-3 text-sm text-[#40372f] outline-none"
                >
                  {APIS.map((api) => (
                    <option key={api.id} value={api.id}>
                      {api.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl border border-[#e7e1da] bg-[#faf8f5] p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-lg bg-[#40372f] px-3 py-1.5 text-xs font-bold text-white">
                    {selectedApi.method}
                  </span>

                  <code className="break-all text-xs text-[#5d554e]">
                    {selectedApi.endpoint}
                  </code>
                </div>

                <p className="mt-3 text-xs leading-6 text-[#8a8179]">
                  {selectedApi.description}
                </p>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-[#5d554e]">
                  Query Parameters
                </label>

                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="مثال: status=pending"
                  className="w-full rounded-2xl border border-[#e7e1da] bg-[#faf8f5] px-4 py-3 text-sm text-[#40372f] outline-none"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-bold text-[#5d554e]">
                    JSON Request Body
                  </label>

                  <span className="text-[10px] text-[#a69c93]">
                    GET request
                  </span>
                </div>

                <textarea
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  spellCheck={false}
                  className="min-h-36 w-full resize-y rounded-2xl border border-[#e7e1da] bg-[#292522] p-4 font-mono text-xs leading-6 text-white outline-none"
                />
              </div>

              <button
                type="button"
                onClick={runTest}
                disabled={loading}
                className="w-full rounded-2xl bg-[#c94a3d] px-5 py-3.5 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "جاري الاختبار..." : "تشغيل الاختبار"}
              </button>

              <div className="rounded-2xl border border-[#eee8e1] bg-[#fcfaf8] p-4 text-xs leading-6 text-[#8a8179]">
                <div className="font-bold text-[#5d554e]">
                  Security
                </div>
                <div className="mt-2">
                  manage_project • internal allowlist • server-side
                  execution • timeout protection
                </div>
              </div>
            </div>

            <div className="min-w-0 rounded-3xl bg-[#292522] p-5 text-white">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-semibold tracking-[0.25em] text-[#bdb3aa]">
                    RESPONSE
                  </div>

                  <div className="mt-2 flex items-center gap-3">
                    <span
                      className={`rounded-lg px-3 py-1 text-xs font-bold ${
                        !result
                          ? "bg-white/10 text-white/70"
                          : result.ok
                            ? "bg-green-500/20 text-green-300"
                            : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {!result
                        ? "READY"
                        : result.status ?? "ERROR"}
                    </span>

                    {result && (
                      <span className="text-xs text-white/50">
                        {result.duration} ms
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={copyResponse}
                  disabled={!result}
                  className="rounded-xl bg-white/10 px-3 py-2 text-xs text-white/80 transition hover:bg-white/15 disabled:opacity-30"
                >
                  {copied ? "تم النسخ ✓" : "نسخ"}
                </button>
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
                <div className="border-b border-white/10 px-4 py-3 text-[10px] font-bold tracking-[0.2em] text-white/40">
                  BODY
                </div>

                <pre className="max-h-[520px] min-h-[360px] overflow-auto p-4 text-left font-mono text-xs leading-6 text-white/80">
                  {result
                    ? result.error
                      ? result.error
                      : formatBody(result.body)
                    : "Run an API test to see the response here."}
                </pre>
              </div>

              {result && (
                <div className="mt-5">
                  <div className="mb-3 text-[10px] font-bold tracking-[0.2em] text-white/40">
                    HEADERS
                  </div>

                  <pre className="max-h-40 overflow-auto rounded-2xl bg-black/20 p-4 text-left font-mono text-[11px] leading-5 text-white/60">
                    {JSON.stringify(result.headers, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-[#eee8e1] bg-[#fcfaf8] p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-[#40372f]">
                  سجل الجلسة
                </h2>
                <p className="mt-1 text-xs text-[#a69c93]">
                  آخر 10 اختبارات فقط — لا يتم تخزينها في قاعدة البيانات.
                </p>
              </div>

              <span className="rounded-full bg-white px-3 py-1 text-xs text-[#8a8179]">
                {history.length}
              </span>
            </div>

            {history.length > 0 ? (
              <div className="mt-4 space-y-2">
                {history.map((item, index) => (
                  <button
                    key={`${item.timestamp}-${index}`}
                    type="button"
                    onClick={() => setResult(item)}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3 text-right transition hover:bg-[#f7f3ef]"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          item.ok
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />

                      <span className="text-xs font-semibold text-[#5d554e]">
                        {item.status ?? "ERROR"}
                      </span>
                    </div>

                    <span className="text-xs text-[#a69c93]">
                      {item.duration} ms
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-2xl bg-white px-4 py-8 text-center text-xs text-[#a69c93]">
                لا توجد اختبارات في هذه الجلسة.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
