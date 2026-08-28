"use client";

import { useEffect, useState } from "react";

type API = {
  id: string;
  name: string;
  path: string;
  methods: string[];
  description: string;
};

type APIResponse = {
  apis: API[];
  count: number;
};

type TestResult = {
  status: number;
  statusText: string;
  duration: number;
  body: unknown;
};

export default function APIsClient() {
  const [apis, setApis] = useState<API[]>([]);
  const [selected, setSelected] = useState<API | null>(null);
  const [method, setMethod] = useState("GET");
  const [requestBody, setRequestBody] = useState("{}");
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<TestResult | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/team/api-catalog", {
          cache: "no-store",
        });

        const json: APIResponse = await response.json();

        if (!response.ok) {
          throw new Error(
            (json as unknown as { error?: string }).error ||
              "تعذر تحميل APIs.",
          );
        }

        setApis(json.apis);

        if (json.apis.length) {
          setSelected(json.apis[0]);
          setMethod(json.apis[0].methods[0]);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "تعذر تحميل قائمة APIs.",
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  function selectAPI(api: API) {
    setSelected(api);
    const nextMethod = api.methods[0];
    setMethod(nextMethod);

    if (api.id === "team-members" && nextMethod === "DELETE") {
      setRequestBody(JSON.stringify({
        id: "ضع-معرف-العضو-هنا"
      }, null, 2));
    } else {
      setRequestBody("{}");
    }

    setResult(null);
    setError("");
  }

  function changeMethod(nextMethod: string) {
    setMethod(nextMethod);

    if (selected?.id === "team-members" && nextMethod === "DELETE") {
      setRequestBody(JSON.stringify({
        id: "ضع-معرف-العضو-هنا"
      }, null, 2));
    } else {
      setRequestBody("{}");
    }

    setResult(null);
    setError("");
  }

  async function testAPI() {
    if (!selected) return;

    setTesting(true);
    setResult(null);
    setError("");

    const started = performance.now();

    try {
      const response = await fetch(selected.path, {
        method,
        cache: "no-store",
        headers:
          method === "POST" ||
          method === "PATCH" ||
          method === "DELETE"
            ? {
                "Content-Type": "application/json",
              }
            : undefined,
        body:
          method === "POST" ||
          method === "PATCH" ||
          method === "DELETE"
            ? requestBody
            : undefined,
      });

      const duration = Math.round(performance.now() - started);

      const contentType =
        response.headers.get("content-type") || "";

      let body: unknown;

      if (contentType.includes("application/json")) {
        body = await response.json();
      } else {
        body = await response.text();
      }

      setResult({
        status: response.status,
        statusText: response.statusText,
        duration,
        body,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "فشل اختبار API.",
      );
    } finally {
      setTesting(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#171717]"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10">
          <p className="text-[10px] font-semibold tracking-[0.3em] text-[#a69c93]">
            DEVELOPMENT / APIS
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            APIs
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8a8179]">
            استعراض واختبار واجهات API الموجودة داخل المشروع.
          </p>
        </div>

        {error ? (
          <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="rounded-[32px] border border-[#e4ddd5] bg-white p-10 text-center text-sm text-[#8a8179]">
            جاري تحميل APIs...
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
            <section className="rounded-[32px] border border-[#e4ddd5] bg-white p-5 shadow-[0_15px_50px_rgba(40,30,20,0.04)]">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold">
                  APIs المشروع
                </h2>

                <span className="rounded-full bg-[#f8f6f2] px-3 py-1 text-xs font-semibold text-[#6f665e]">
                  {apis.length}
                </span>
              </div>

              <div className="space-y-2">
                {apis.map((api) => {
                  const active = selected?.id === api.id;

                  return (
                    <button
                      key={api.id}
                      onClick={() => selectAPI(api)}
                      className={`w-full rounded-2xl p-4 text-right transition ${
                        active
                          ? "bg-[#171717] text-white"
                          : "bg-[#f8f6f2] text-[#40372f] hover:bg-[#eee9e2]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-semibold">
                          {api.name}
                        </span>

                        <span className="text-[10px] font-semibold opacity-60">
                          {api.methods.join(" / ")}
                        </span>
                      </div>

                      <p
                        dir="ltr"
                        className="mt-2 text-left text-xs opacity-60"
                      >
                        {api.path}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="rounded-[32px] border border-[#e4ddd5] bg-white p-7 shadow-[0_15px_50px_rgba(40,30,20,0.04)]">
              {selected ? (
                <>
                  <div className="border-b border-[#eee8e2] pb-6">
                    <p className="text-[10px] font-semibold tracking-[0.25em] text-[#a69c93]">
                      API ENDPOINT
                    </p>

                    <h2 className="mt-3 text-2xl font-bold">
                      {selected.name}
                    </h2>

                    <p className="mt-2 text-sm text-[#8a8179]">
                      {selected.description}
                    </p>

                    <div
                      dir="ltr"
                      className="mt-5 rounded-2xl bg-[#171717] px-5 py-4 font-mono text-sm text-white"
                    >
                      {selected.path}
                    </div>
                  </div>

                  {(method === "POST" ||
                    method === "PATCH" ||
                    method === "DELETE") && (
                    <div className="mt-7">
                      <label className="mb-2 block text-xs font-semibold text-[#6f665e]">
                        Request Body
                      </label>
                      <textarea
                        value={requestBody}
                        onChange={(event) =>
                          setRequestBody(event.target.value)
                        }
                        dir="ltr"
                        spellCheck={false}
                        rows={10}
                        className="w-full rounded-2xl border border-[#e4ddd5] bg-[#171717] px-5 py-4 font-mono text-sm leading-7 text-white outline-none focus:border-[#c94a3d]"
                        placeholder='{"email":"example@example.com"}'
                      />
                      <p className="mt-2 text-xs text-[#a69c93]">
                        أدخل JSON صالحًا لإرساله إلى الـ API.
                      </p>
                    </div>
                  )}

                  <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-end">
                    <div className="flex-1">
                      <label className="mb-2 block text-xs font-semibold text-[#6f665e]">
                        Method
                      </label>

                      <select
                        value={method}
                        onChange={(event) =>
                          changeMethod(event.target.value)
                        }
                        className="w-full rounded-2xl border border-[#e4ddd5] bg-[#f8f6f2] px-4 py-3 text-sm outline-none"
                      >
                        {selected.methods.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={testAPI}
                      disabled={testing}
                      className="rounded-2xl bg-[#c94a3d] px-7 py-3 font-semibold text-white transition hover:opacity-85 disabled:opacity-50"
                    >
                      {testing ? "جاري الاختبار..." : "اختبار API"}
                    </button>
                  </div>

                  {result ? (
                    <div className="mt-8">
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl bg-[#f8f6f2] p-5">
                          <p className="text-xs text-[#8a8179]">
                            HTTP Status
                          </p>
                          <p className="mt-2 text-xl font-bold">
                            {result.status}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-[#f8f6f2] p-5">
                          <p className="text-xs text-[#8a8179]">
                            Response
                          </p>
                          <p className="mt-2 text-xl font-bold">
                            {result.statusText || "—"}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-[#f8f6f2] p-5">
                          <p className="text-xs text-[#8a8179]">
                            Latency
                          </p>
                          <p className="mt-2 text-xl font-bold">
                            {result.duration} ms
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <p className="mb-2 text-xs font-semibold text-[#6f665e]">
                          Response Body
                        </p>

                        <pre
                          dir="ltr"
                          className="max-h-[500px] overflow-auto rounded-2xl bg-[#171717] p-5 text-left text-xs leading-6 text-white"
                        >
                          {typeof result.body === "string"
                            ? result.body
                            : JSON.stringify(
                                result.body,
                                null,
                                2,
                              )}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-8 rounded-2xl bg-[#f8f6f2] p-8 text-center text-sm text-[#8a8179]">
                      اختر API ثم اضغط «اختبار API» لعرض النتيجة.
                    </div>
                  )}
                </>
              ) : null}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
