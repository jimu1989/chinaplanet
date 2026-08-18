"use client";

import { useEffect, useState } from "react";
import type { Language } from "../lib/i18n";

type Props = {
  language: Language;
};

function getTime(timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

export default function LiveInfo({ language }: Props) {
  const [saudiTime, setSaudiTime] = useState("");
  const [chinaTime, setChinaTime] = useState("");

  useEffect(() => {
    const update = () => {
      setSaudiTime(getTime("Asia/Riyadh"));
      setChinaTime(getTime("Asia/Shanghai"));
    };

    update();

    const timer = window.setInterval(update, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const labels = {
    ar: {
      saudi: "السعودية",
      china: "الصين",
    },
    en: {
      saudi: "Saudi Arabia",
      china: "China",
    },
    zh: {
      saudi: "沙特阿拉伯",
      china: "中国",
    },
  }[language];

  return (
    <div className="flex items-center justify-center gap-4 text-xs text-[#786e65]">
      <span>
        {labels.saudi}: {saudiTime}
      </span>

      <span className="h-1 w-1 rounded-full bg-[#c94a3d]" />

      <span>
        {labels.china}: {chinaTime}
      </span>
    </div>
  );
}
