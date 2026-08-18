export const languages = {
  ar: { label: "العربية", short: "AR", dir: "rtl" },
  en: { label: "English", short: "EN", dir: "ltr" },
  zh: { label: "中文", short: "中", dir: "ltr" },
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = "ar";

export function isLanguage(value: string): value is Language {
  return value in languages;
}
