import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/mentions-legales", "/politique-de-confidentialite", "/cgv"] }],
    sitemap: "https://www.sena-consulting.fr/sitemap.xml",
  };
}
