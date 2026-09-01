#!/bin/bash
set -e

echo "🚀 China Planet — adding Tools menu..."

NAV="app/components/Navbar.tsx"
TOOLS="app/components/ToolsMenu.tsx"

# Safety checks
test -f "$NAV" || {
  echo "❌ $NAV not found"
  exit 1
}

# Backup
BACKUP=".tools-menu-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP"
cp "$NAV" "$BACKUP/Navbar.tsx"

echo "📦 Backup: $BACKUP"

# Create the tools menu
cat > "$TOOLS" <<'EOF'
"use client";

import { useEffect, useState } from "react";

type ToolMenuProps = {
  language?: "ar" | "en" | "zh";
};

type City = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

const translations = {
  ar: {
    tools: "الأدوات",
    time: "الوقت",
    currency: "محول العملات",
    weather: "الطقس",
    searchCity: "ابحث عن مدينة في السعودية أو الصين",
    search: "بحث",
    loading: "جاري التحميل...",
    noResults: "لم يتم العثور على مدينة",
    temperature: "درجة الحرارة",
    feelsLike: "المحسوسة",
    wind: "الرياح",
    refresh: "تحديث",
    sar: "ريال سعودي",
    cny: "يوان صيني",
    amount: "المبلغ",
    convert: "تحويل",
  },
  en: {
    tools: "Tools",
    time: "Time",
    currency: "Currency converter",
    weather: "Weather",
    searchCity: "Search any city in Saudi Arabia or China",
    search: "Search",
    loading: "Loading...",
    noResults: "No city found",
    temperature: "Temperature",
    feelsLike: "Feels like",
    wind: "Wind",
    refresh: "Refresh",
    sar: "Saudi Riyal",
    cny: "Chinese Yuan",
    amount: "Amount",
    convert: "Convert",
  },
  zh: {
    tools: "工具",
    time: "时间",
    currency: "货币转换",
    weather: "天气",
    searchCity: "搜索沙特或中国的城市",
    search: "搜索",
    loading: "加载中...",
    noResults: "未找到城市",
    temperature: "温度",
    feelsLike: "体感",
    wind: "风速",
    refresh: "刷新",
    sar: "沙特里亚尔",
    cny: "人民币",
    amount: "金额",
    convert: "转换",
  },
};

export default function ToolsMenu({ language = "ar" }: ToolMenuProps) {
  const t = translations[language];
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"time" | "currency" | "weather">("time");

  const [now, setNow] = useState(new Date());

  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState<number | null>(null);
  const [currencyLoading, setCurrencyLoading] = useState(false);

  const [cityQuery, setCityQuery] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [city, setCity] = useState<City | null>(null);
  const [weather, setWeather] = useState<{
    temperature: number;
    apparent: number;
    wind: number;
  } | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  async function loadRate() {
    setCurrencyLoading(true);

    try {
      const response = await fetch("/api/exchange-rate", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Currency request failed");
      }

      const data = await response.json();

      const possibleRate =
        Number(data.rate) ||
        Number(data.cny) ||
        Number(data.SAR_CNY) ||
        Number(data.sarToCny) ||
        Number(data.exchangeRate);

      if (Number.isFinite(possibleRate) && possibleRate > 0) {
        setRate(possibleRate);
      }
    } catch {
      setRate(null);
    } finally {
      setCurrencyLoading(false);
    }
  }

  useEffect(() => {
    if (tab === "currency") {
      void loadRate();
    }
  }, [tab]);

  async function searchCities() {
    const query = cityQuery.trim();

    if (!query) {
      setCities([]);
      return;
    }

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}&count=10&language=en&format=json`
      );

      if (!response.ok) {
        throw new Error("City search failed");
      }

      const data = await response.json();

      const results: City[] = (data.results ?? [])
        .filter(
          (item: {
            name?: string;
            country_code?: string;
            latitude?: number;
            longitude?: number;
          }) =>
            item.country_code === "SA" ||
            item.country_code === "CN"
        )
        .map(
          (item: {
            name: string;
            country: string;
            latitude: number;
            longitude: number;
          }) => ({
            name: item.name,
            country: item.country,
            latitude: item.latitude,
            longitude: item.longitude,
          })
        );

      setCities(results);
    } catch {
      setCities([]);
    }
  }

  async function loadWeather(selectedCity: City) {
    setCity(selectedCity);
    setCities([]);
    setWeatherLoading(true);

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&current=temperature_2m,apparent_temperature,wind_speed_10m&timezone=auto`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error("Weather request failed");
      }

      const data = await response.json();

      setWeather({
        temperature: Number(data.current?.temperature_2m ?? 0),
        apparent: Number(
          data.current?.apparent_temperature ?? 0
        ),
        wind: Number(data.current?.wind_speed_10m ?? 0),
      });
    } catch {
      setWeather(null);
    } finally {
      setWeatherLoading(false);
    }
  }

  const formattedTime = new Intl.DateTimeFormat(
    language === "ar"
      ? "ar-SA"
      : language === "zh"
        ? "zh-CN"
        : "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: language === "en",
    }
  ).format(now);

  const formattedDate = new Intl.DateTimeFormat(
    language === "ar"
      ? "ar-SA"
      : language === "zh"
        ? "zh-CN"
        : "en-US",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  ).format(now);

  const converted =
    rate !== null
      ? Number(amount || 0) * rate
      : null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
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
        <div
          dir={language === "ar" ? "rtl" : "ltr"}
          className="absolute top-[calc(100%+12px)] end-0 z-[80] w-[340px] max-w-[calc(100vw-24px)] overflow-hidden rounded-[24px] border border-[#e3ddd6] bg-[#f8f6f2] shadow-[0_20px_60px_rgba(40,30,20,0.18)]"
        >
          <div className="flex border-b border-[#e3ddd6] bg-white p-2">
            {(
              [
                ["time", "🕐", t.time],
                ["currency", "💱", t.currency],
                ["weather", "🌤️", t.weather],
              ] as const
            ).map(([value, icon, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setTab(value)}
                className={`flex-1 rounded-xl px-2 py-2 text-[10px] font-semibold transition ${
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

          <div className="p-5">
            {tab === "time" && (
              <div className="text-center">
                <p className="text-[10px] font-semibold text-[#9a9087]">
                  {t.time}
                </p>

                <p
                  className="mt-3 text-4xl font-semibold tracking-tight text-[#302c28]"
                  dir="ltr"
                >
                  {formattedTime}
                </p>

                <p className="mt-3 text-xs text-[#756b62]">
                  {formattedDate}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <div className="rounded-2xl bg-white p-3 ring-1 ring-[#e3ddd6]">
                    <p className="text-[9px] text-[#9a9087]">
                      🇸🇦 السعودية
                    </p>
                    <p className="mt-1 text-xs font-semibold text-[#554d46]">
                      Asia/Riyadh
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-3 ring-1 ring-[#e3ddd6]">
                    <p className="text-[9px] text-[#9a9087]">
                      🇨🇳 الصين
                    </p>
                    <p className="mt-1 text-xs font-semibold text-[#554d46]">
                      Asia/Shanghai
                    </p>
                  </div>
                </div>
              </div>
            )}

            {tab === "currency" && (
              <div>
                <p className="text-[10px] font-semibold text-[#9a9087]">
                  {t.currency}
                </p>

                <div className="mt-4">
                  <label className="text-[10px] text-[#756b62]">
                    {t.amount}
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={amount}
                    onChange={(event) =>
                      setAmount(event.target.value)
                    }
                    className="mt-2 w-full rounded-2xl border border-[#e3ddd6] bg-white px-4 py-3 text-sm outline-none focus:border-[#c94a3d]"
                  />
                </div>

                <div className="mt-3 rounded-2xl bg-white p-4 ring-1 ring-[#e3ddd6]">
                  <p className="text-xs text-[#756b62]">
                    {amount || "0"} {t.sar}
                  </p>

                  <p className="mt-2 text-2xl font-semibold text-[#302c28]">
                    {currencyLoading
                      ? "..."
                      : converted !== null
                        ? `${converted.toFixed(2)} CNY`
                        : "—"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => void loadRate()}
                  className="mt-3 w-full rounded-2xl bg-[#171717] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#c94a3d]"
                >
                  {t.refresh}
                </button>
              </div>
            )}

            {tab === "weather" && (
              <div>
                <p className="text-[10px] font-semibold text-[#9a9087]">
                  {t.weather}
                </p>

                <div className="mt-3 flex gap-2">
                  <input
                    value={cityQuery}
                    onChange={(event) =>
                      setCityQuery(event.target.value)
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        void searchCities();
                      }
                    }}
                    placeholder={t.searchCity}
                    className="min-w-0 flex-1 rounded-2xl border border-[#e3ddd6] bg-white px-3 py-3 text-xs outline-none focus:border-[#c94a3d]"
                  />

                  <button
                    type="button"
                    onClick={() => void searchCities()}
                    className="shrink-0 rounded-2xl bg-[#171717] px-4 text-xs font-semibold text-white"
                  >
                    {t.search}
                  </button>
                </div>

                {cities.length > 0 && (
                  <div className="mt-2 max-h-40 overflow-y-auto rounded-2xl border border-[#e3ddd6] bg-white">
                    {cities.map((item) => (
                      <button
                        key={`${item.name}-${item.latitude}-${item.longitude}`}
                        type="button"
                        onClick={() => void loadWeather(item)}
                        className="block w-full border-b border-[#eee8e1] px-4 py-3 text-start text-xs text-[#554d46] last:border-0 hover:bg-[#faf9f7]"
                      >
                        {item.name}
                        <span className="ms-2 text-[10px] text-[#9a9087]">
                          {item.country}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {city && (
                  <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-[#e3ddd6]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-[#302c28]">
                          {city.name}
                        </p>
                        <p className="mt-1 text-[9px] text-[#9a9087]">
                          {city.country}
                        </p>
                      </div>

                      <span className="text-2xl">🌤️</span>
                    </div>

                    {weatherLoading ? (
                      <p className="mt-4 text-xs text-[#756b62]">
                        {t.loading}
                      </p>
                    ) : weather ? (
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        <div className="rounded-xl bg-[#f8f6f2] p-2 text-center">
                          <p className="text-[9px] text-[#9a9087]">
                            {t.temperature}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-[#302c28]">
                            {weather.temperature}°
                          </p>
                        </div>

                        <div className="rounded-xl bg-[#f8f6f2] p-2 text-center">
                          <p className="text-[9px] text-[#9a9087]">
                            {t.feelsLike}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-[#302c28]">
                            {weather.apparent}°
                          </p>
                        </div>

                        <div className="rounded-xl bg-[#f8f6f2] p-2 text-center">
                          <p className="text-[9px] text-[#9a9087]">
                            {t.wind}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-[#302c28]">
                            {weather.wind}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-4 text-xs text-[#756b62]">
                        —
                      </p>
                    )}
                  </div>
                )}

                {!city && !cities.length && (
                  <p className="mt-4 text-center text-[10px] leading-5 text-[#9a9087]">
                    🇸🇦 السعودية · 🇨🇳 الصين
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
EOF

# Add import if it does not already exist
python3 - <<'PY'
from pathlib import Path

p = Path("app/components/Navbar.tsx")
s = p.read_text()

imp = 'import ToolsMenu from "./ToolsMenu";'

if imp not in s:
    marker = 'import { createSupabaseBrowserClient } from "../../lib/supabase-browser";'
    if marker not in s:
        raise SystemExit("❌ Could not find Navbar import marker")
    s = s.replace(marker, marker + "\n" + imp, 1)

# Add the tools button next to the desktop account/menu controls
marker = '''        {/* DESKTOP ACCOUNT AREA */}
        <div className="hidden items-center gap-3 lg:flex">'''

replacement = '''        {/* DESKTOP ACCOUNT AREA */}
        <div className="hidden items-center gap-3 lg:flex">
          <ToolsMenu language={currentLanguage} />'''

if marker in s and 'ToolsMenu language={currentLanguage}' not in s:
    s = s.replace(marker, replacement, 1)

# Add tools to mobile menu
mobile_marker = '''          {/* MOBILE LANGUAGES */}
          <div className="mt-5 flex gap-2 border-t border-[#e5ddd5] pt-5">'''

mobile_replacement = '''          {/* MOBILE TOOLS */}
          <div className="mt-5 border-t border-[#e5ddd5] pt-5">
            <ToolsMenu language={currentLanguage} />
          </div>

          {/* MOBILE LANGUAGES */}
          <div className="mt-5 flex gap-2 border-t border-[#e5ddd5] pt-5">'''

if mobile_marker in s and 'MOBILE TOOLS' not in s:
    s = s.replace(mobile_marker, mobile_replacement, 1)

p.write_text(s)
PY

echo ""
echo "🔎 Checking changes..."
git diff --check

echo ""
echo "📋 Git diff:"
git status --short

echo ""
echo "=============================================="
echo "✅ Tools menu added"
echo "=============================================="
echo ""
echo "Tools:"
echo "  🕐 Time"
echo "  💱 SAR → CNY"
echo "  🌤️ Weather — Saudi & China city search"
echo ""
echo "Run:"
echo "  npm run lint"
echo ""
echo "Then:"
echo "  npm run dev"
echo ""
echo "Open:"
echo "  http://localhost:3000/ar"
