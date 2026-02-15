import type { ReactNode } from "react";
import smallBusinessTemplateContent from "./content";
import {
  AboutSection,
  ContactSection,
  CtaSection,
  GallerySection,
  HeroSection,
  ServicesSection,
} from "./components";
import { SectionStackLayout } from "../layouts";
import type { SectionLayoutItem } from "../layouts";
import type {
  SmallBusinessSectionKey,
  SmallBusinessTemplateContent,
  SmallBusinessTemplateSections,
} from "./types";
import "./smallBusinessTemplate.css";

export interface SmallBusinessLandingTemplateProps {
  content?: SmallBusinessTemplateContent;
  className?: string;
}

type SectionRendererMap = {
  [Key in SmallBusinessSectionKey]: (
    sectionProps: SmallBusinessTemplateSections[Key],
  ) => ReactNode;
};

const sectionRenderers: SectionRendererMap = {
  hero: (sectionProps) => <HeroSection {...sectionProps} />,
  about: (sectionProps) => <AboutSection {...sectionProps} />,
  services: (sectionProps) => <ServicesSection {...sectionProps} />,
  gallery: (sectionProps) => <GallerySection {...sectionProps} />,
  contact: (sectionProps) => <ContactSection {...sectionProps} />,
  cta: (sectionProps) => <CtaSection {...sectionProps} />,
};

function renderSection<Key extends SmallBusinessSectionKey>(
  sectionKey: Key,
  sections: SmallBusinessTemplateSections,
): SectionLayoutItem {
  return {
    id: sectionKey,
    node: sectionRenderers[sectionKey](sections[sectionKey]),
  };
}

function buildSectionLayout(content: SmallBusinessTemplateContent): SectionLayoutItem[] {
  return content.layout.sectionOrder.map((sectionKey) =>
    renderSection(sectionKey, content.sections),
  );
}

/**
 * Modular small-business landing template.
 * Layout order is configured via `/content/small-business.json`.
 */
export function SmallBusinessLandingTemplate({
  content = smallBusinessTemplateContent,
  className = "sb-template",
}: SmallBusinessLandingTemplateProps) {
  return <SectionStackLayout className={className} sections={buildSectionLayout(content)} />;
}

export default SmallBusinessLandingTemplate;
