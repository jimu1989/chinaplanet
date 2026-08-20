import type { MetadataRoute } from "next";

const baseUrl = "https://chinaplanet.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/ar",
    "/en",
    "/zh",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority:
      route === "/ar" || route === "/en" || route === "/zh" ? 1 : 0.5,
  }));
}
