import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://holodos.ru/sitemap.xml",
    host: "https://holodos.ru",
  };
}
