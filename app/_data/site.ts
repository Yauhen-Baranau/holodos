export const siteUrl = "https://holodos.by";
export const siteName = "Холодос";
export const phoneDisplay = "+375 33 644 34 01";
export const phoneHref = "tel:+375336443401";
export const email = "info@holodos.by";
export const address = "г. Минск, ул. Домбровская, 9";

export type ServicePage = {
  slug: string;
  title: string;
  menuTitle: string;
  description: string;
  eyebrow: string;
  lead: string;
  price: string;
  duration: string;
  badge: string;
  brandImage?: string;
  symptoms: string[];
  sections: Array<{
    title: string;
    body: string;
    bullets?: string[];
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
};
