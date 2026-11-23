import type { MetadataRoute } from "next";
import { company, services } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/team", "/services", "/industries", "/contact", ...services.map((s) => `/services/${s.slug}`)];
  const lastModified = new Date();
  return paths.map((p) => ({ url: `${company.url}${p}`, lastModified, priority: p === "" ? 1 : p.startsWith("/services/") ? 0.7 : 0.8 }));
}
