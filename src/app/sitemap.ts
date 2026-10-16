import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/api";
import { SITE_URL } from "@/lib/constants";
import { SERVICES } from "@/lib/services";

// Every public page, on the client's own domain. Services and posts come
// from their sources, so a new one joins the sitemap at the next build.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/faq", "/contact", "/consultation", "/blog"].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));
  const services = SERVICES.map((s) => ({ url: `${SITE_URL}/services/${s.slug}` }));
  const posts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.date),
  }));
  return [...pages, ...services, ...posts];
}
