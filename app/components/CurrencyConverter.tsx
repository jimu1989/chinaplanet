"use client";

import { useEffect, useMemo, useState } from "react";
import type { Language } from "../lib/i18n";

type Currency = "SAR" | "CNY" | "USD";

type Props = {
  language: Language;
};

type RatesResponse = {
  base: "SAR";
  rates: Record<Currency, number>;
  updatedAt: string;
};

const currencies: Currency[] = ["SAR", "CNY", "USD"];

const text = {
  ar: {
    title: "محول العملات",
    description: "أسعار الصرف المباشرة بين الريال السعودي واليوان والدولار.",
    amount: "المبلغ",
    from: "من",
    to: "إلى",
    loading: "جاري تحديث الأسعار...",
    unavailable: "أسعار الصرف غير متاحة حاليًا",
    updated: "آخر تحديث",
  },
  en: {
    title: "Currency Converter",
    description:
      "Live exchange rates between Saudi Riyal, Chinese Yuan and US Dollar.",
    amount: "Amount",
    from: "From",
    to: "To",
    loading: "Updating rates...",
    unavailable: "Exchange rates are currently unavailable",
    updated: "Last updated",
  },
  zh: {
    title: "货币转换器",
    description: "沙特里亚尔、人民币和美元之间的实时汇率。",
    amount: "金额",
    from: "从",
    to: "到",
    loading: "正在更新汇率...",
    unavailable: "当前无法获取汇率",
    updated: "最后更新",
  },
};

const currencyNames = {
  ar: {
    SAR: "ريال سعودي",
    CNY: "يوان صيني",
    USD: "دولار أمريكي",
  },
  en: {
    SAR: "Saudi Riyal",
    CNY: "Chinese Yuan",
    USD: "US Dollar",
  },
  zh: {
    SAR: "沙特里亚尔",
    CNY: "人民币",
    USD: "美元",
  },
};

export default function CurrencyConverter({ language }: Props) {
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState<Currency>("SAR");
  const [to, setTo] = useState<Currency>("CNY");
  const [rates, setRates] = useState<RatesResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const t = text[language];
  const names = currencyNames[language];

  useEffect(() => {
    let active = true;

    async function loadRates() {
      try {
        setLoading(true);

        const response = await fetch("/api/exchange-rate", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch rates");
        }

        const data: RatesResponse = await response.json();

        if (active) {
          setRates(data);
        }
      } catch {
        if (active) {
          setRates(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadRates();

    const interval = window.setInterval(loadRates, 15 * 60 * 1000);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  const converted = useMemo(() => {
    if (!rates) return null;

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount)) return null;

    const fromRate = rates.rates[from];
    const toRate = rates.rates[to];

    return (numericAmount / fromRate) * toRate;
  }, [amount, from, to, rates]);

  const formatNumber = (value: number) =>
    new Intl.NumberFormat(
      language === "ar" ? "ar-SA" : language === "zh" ? "zh-CN" : "en-US",
      {
        maximumFractionDigits: 4,
      }
    ).format(value);

  return (
    <section className="cp-section bg-[#f3f0eb]">
      <div className="cp-container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="cp-line" />
            <span className="cp-label">{t.title}</span>
            <span className="cp-line" />
          </div>

          <h2 className="cp-title mt-5 text-3xl sm:text-4xl">
            {t.title}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#786e65]">
            {t.description}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-[28px] border border-[#e2d9d0] bg-[#f8f6f2] p-6 shadow-sm sm:p-8">
          <div className="grid gap-5 md:grid-cols-[1.2fr_1fr_1fr]">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold text-[#554d46]">
                {t.amount}
              </span>

              <input
                type="number"
                min="0"
                step="any"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="h-12 w-full rounded-2xl border border-[#d8cec4] bg-white px-4 text-sm text-[#40372f] outline-none transition focus:border-[#c94a3d]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold text-[#554d46]">
                {t.from}
              </span>

              <select
                value={from}
                onChange={(event) =>
                  setFrom(event.target.value as Currency)
                }
                className="h-12 w-full rounded-2xl border border-[#d8cec4] bg-white px-4 text-sm text-[#40372f] outline-none focus:border-[#c94a3d]"
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency} — {names[currency]}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold text-[#554d46]">
                {t.to}
              </span>

              <select
                value={to}
                onChange={(event) =>
                  setTo(event.target.value as Currency)
                }
                className="h-12 w-full rounded-2xl border border-[#d8cec4] bg-white px-4 text-sm text-[#40372f] outline-none focus:border-[#c94a3d]"
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency} — {names[currency]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-6 text-center">
            {loading ? (
              <p className="text-sm text-[#786e65]">{t.loading}</p>
            ) : converted !== null ? (
              <>
                <p className="text-xs text-[#786e65]">
                  {formatNumber(Number(amount) || 0)} {from}
                </p>

                <p className="mt-2 text-3xl font-semibold text-[#40372f]">
                  {formatNumber(converted)} {to}
                </p>

                {rates?.updatedAt && (
                  <p className="mt-3 text-[10px] text-[#9a8f86]">
                    {t.updated}:{" "}
                    {new Intl.DateTimeFormat(
                      language === "ar"
                        ? "ar-SA"
                        : language === "zh"
                          ? "zh-CN"
                          : "en-US",
                      {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }
                    ).format(new Date(rates.updatedAt))}
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-[#c94a3d]">{t.unavailable}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
