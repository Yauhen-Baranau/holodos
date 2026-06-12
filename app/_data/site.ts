export const siteUrl = "https://holodos.by";
export const siteName = "Холодос";
export const phoneDisplay = "+375 44 558 19 58";
export const phoneHref = "tel:+375445581958";
export const email = "online888bazar@gmail.com";
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
