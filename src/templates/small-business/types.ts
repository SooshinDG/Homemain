export interface HeroContent {
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  highlights: string[];
}

export interface AboutContent {
  title: string;
  description: string;
  mission: string;
  stats: Array<{
    label: string;
    value: string;
  }>;
}

export interface ServiceItem {
  title: string;
  description: string;
  bullets: string[];
}

export interface ServicesContent {
  title: string;
  intro: string;
  items: ServiceItem[];
}

export interface GalleryItem {
  title: string;
  caption: string;
  imageUrl: string;
  alt: string;
}

export interface GalleryContent {
  title: string;
  intro: string;
  items: GalleryItem[];
}

export interface ContactContent {
  title: string;
  intro: string;
  labels: {
    phone: string;
    email: string;
    address: string;
    hours: string;
  };
  phone: string;
  email: string;
  address: string;
  hours: string;
  formHeading: string;
  formFields: {
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    submitLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
  };
}

export interface CtaContent {
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface SmallBusinessTemplateContent {
  hero: HeroContent;
  about: AboutContent;
  services: ServicesContent;
  gallery: GalleryContent;
  contact: ContactContent;
  cta: CtaContent;
}
