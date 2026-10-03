import type { MetadataRoute } from "next";
import { company, services } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/services", "/industries", "/contact", ...services.map((s) => `/services/${s.slug}`)];
  return paths.map((p) => ({ url: `${company.url}${p}` }));
}
