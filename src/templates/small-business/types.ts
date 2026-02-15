export const SMALL_BUSINESS_SECTION_KEYS = [
  "hero",
  "about",
  "services",
  "gallery",
  "contact",
  "cta",
] as const;

export type SmallBusinessSectionKey = (typeof SMALL_BUSINESS_SECTION_KEYS)[number];
export type HttpMethod = "get" | "post";

export interface BaseSectionProps {
  sectionId: string;
  titleId: string;
}

export interface LinkContent {
  label: string;
  href: string;
}

export interface HeroSectionProps extends BaseSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: LinkContent;
  secondaryCta: LinkContent;
  highlightsAriaLabel: string;
  highlights: string[];
}

export interface AboutStat {
  label: string;
  value: string;
}

export interface AboutSectionProps extends BaseSectionProps {
  title: string;
  description: string;
  mission: string;
  stats: AboutStat[];
}

export interface ServiceItem {
  title: string;
  description: string;
  bullets: string[];
}

export interface ServicesSectionProps extends BaseSectionProps {
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

export interface GallerySectionProps extends BaseSectionProps {
  title: string;
  intro: string;
  items: GalleryItem[];
}

export interface ContactDetailsLabels {
  phone: string;
  email: string;
  address: string;
  hours: string;
}

export interface ContactFormField {
  name: string;
  label: string;
  placeholder: string;
}

export interface ContactFormContent {
  heading: string;
  action: string;
  method: HttpMethod;
  fields: {
    name: ContactFormField;
    email: ContactFormField;
    message: ContactFormField;
  };
  submitLabel: string;
}

export interface ContactSectionProps extends BaseSectionProps {
  title: string;
  intro: string;
  detailsLabels: ContactDetailsLabels;
  phone: string;
  email: string;
  address: string;
  hours: string;
  form: ContactFormContent;
}

export interface CtaSectionProps extends BaseSectionProps {
  title: string;
  description: string;
  button: LinkContent;
}

export interface SmallBusinessTemplateSections {
  hero: HeroSectionProps;
  about: AboutSectionProps;
  services: ServicesSectionProps;
  gallery: GallerySectionProps;
  contact: ContactSectionProps;
  cta: CtaSectionProps;
}

export interface SmallBusinessTemplateLayout {
  sectionOrder: SmallBusinessSectionKey[];
}

export interface SmallBusinessTemplateContent {
  layout: SmallBusinessTemplateLayout;
  sections: SmallBusinessTemplateSections;
}

export type HeroContent = HeroSectionProps;
export type AboutContent = AboutSectionProps;
export type ServicesContent = ServicesSectionProps;
export type GalleryContent = GallerySectionProps;
export type ContactContent = ContactSectionProps;
export type CtaContent = CtaSectionProps;
