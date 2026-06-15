/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://holodos.by",

  generateRobotsTxt: false,
  generateIndexSitemap: false,
  sitemapSize: 50000,

  outDir: "./out",

  async transform(config, path) {
    let priority = 0.7;
    let changefreq = "monthly";

    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    }

    else if (path.startsWith("/services/")) {
      priority = 0.95;
      changefreq = "weekly";
    }

    else if (path.startsWith("/problems/")) {
      priority = 0.9;
      changefreq = "weekly";
    }

    else if (path.startsWith("/brands/")) {
      priority = 0.85;
      changefreq = "monthly";
    }

    else if (path.startsWith("/regions/")) {
      priority = 0.85;
      changefreq = "monthly";
    }

    else if (
      path === "/services" ||
      path === "/problems" ||
      path === "/brands" ||
      path === "/regions"
    ) {
      priority = 0.8;
      changefreq = "weekly";
    }

    else if (path.startsWith("/blog/")) {
      priority = 0.7;
      changefreq = "monthly";
    }

    else if (path === "/blog") {
      priority = 0.6;
      changefreq = "weekly";
    }

    else if (
      path === "/about" ||
      path === "/masterskaya"
    ) {
      priority = 0.5;
      changefreq = "monthly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};