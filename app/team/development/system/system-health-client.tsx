/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useCallback, useEffect, useState } from "react";

type Check = {
  name: string;
  status: "operational" | "warning" | "error";
  latency_ms: number;
  message: string;
};

type HealthResponse = {
  status: "operational" | "degraded";
  checked_at: string;
  total_latency_ms: number;
  checks: Check[];
};

const statusLabels = {
  operational: "يعمل",
  warning: "تحذير",
  error: "متوقف",
};

export default function SystemHealthClient() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const checkSystem = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/team/system-health", {
        cache: "no-store",
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "تعذر فحص النظام.");
      }

      setData(json);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "تعذر الاتصال بخدمة الفحص.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSystem();
  }, [checkSystem]);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#171717]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.3em] text-[#a69c93]">
              DEVELOPMENT / SYSTEM
            </p>

            <h1 className="mt-4 text-4xl font-bold">
              حالة النظام
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8a8179]">
              مراقبة الخدمات الأساسية داخل المشروع والتأكد من جاهزيتها.
            </p>
          </div>

          <button
            onClick={checkSystem}
            disabled={loading}
            className="rounded-full bg-[#171717] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-85 disabled:opacity-50"
          >
            {loading ? "جاري الفحص..." : "إعادة الفحص"}
          </button>
        </div>

        {error ? (
          <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {data ? (
          <>
            <section className="mb-6 rounded-[32px] border border-[#e4ddd5] bg-white p-7 shadow-[0_15px_50px_rgba(40,30,20,0.05)]">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs text-[#8a8179]">
                    الحالة العامة
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <span
                      className={`h-3 w-3 rounded-full ${
                        data.status === "operational"
                          ? "bg-[#4d8060]"
                          : "bg-[#c94a3d]"
                      }`}
                    />

                    <span className="text-2xl font-bold">
                      {data.status === "operational"
                        ? "النظام يعمل بشكل طبيعي"
                        : "يوجد خلل يحتاج للمراجعة"}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#f8f6f2] px-5 py-4">
                  <p className="text-xs text-[#8a8179]">
                    زمن الفحص
                  </p>
                  <p className="mt-1 text-lg font-bold">
                    {data.total_latency_ms} ms
                  </p>
                </div>
              </div>
            </section>

            <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {data.checks.map((check) => (
                <article
                  key={check.name}
                  className="rounded-[30px] border border-[#e4ddd5] bg-white p-7 shadow-[0_15px_50px_rgba(40,30,20,0.04)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-xl font-bold">
                      {check.name}
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        check.status === "operational"
                          ? "bg-[#edf5ef] text-[#4d8060]"
                          : check.status === "warning"
                            ? "bg-[#fff4df] text-[#9a6b16]"
                            : "bg-[#fceceb] text-[#b43e34]"
                      }`}
                    >
                      {statusLabels[check.status]}
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-[#8a8179]">
                    {check.message}
                  </p>

                  <div className="mt-6 border-t border-[#eee8e2] pt-5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#a69c93]">
                        الاستجابة
                      </span>
                      <span className="font-semibold text-[#40372f]">
                        {check.latency_ms} ms
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <p className="mt-6 text-xs text-[#a69c93]">
              آخر فحص:{" "}
              {new Date(data.checked_at).toLocaleString("ar-SA")}
            </p>
          </>
        ) : loading ? (
          <div className="rounded-[32px] border border-[#e4ddd5] bg-white p-10 text-center text-sm text-[#8a8179]">
            جاري فحص خدمات النظام...
          </div>
        ) : null}
      </div>
    </main>
  );
}
