import smallBusinessDummyContent from "./content";
import {
  AboutSection,
  ContactSection,
  CtaSection,
  GallerySection,
  HeroSection,
  ServicesSection,
} from "./components";
import { SmallBusinessTemplateContent } from "./types";
import "./smallBusinessTemplate.css";

export interface SmallBusinessLandingTemplateProps {
  content?: SmallBusinessTemplateContent;
}

/**
 * Modular small-business landing template.
 * Pass a custom `content` object to replace all text and links.
 */
export function SmallBusinessLandingTemplate({
  content = smallBusinessDummyContent,
}: SmallBusinessLandingTemplateProps) {
  return (
    <main className="sb-template">
      <HeroSection content={content.hero} />
      <AboutSection content={content.about} />
      <ServicesSection content={content.services} />
      <GallerySection content={content.gallery} />
      <ContactSection content={content.contact} />
      <CtaSection content={content.cta} />
    </main>
  );
}

export default SmallBusinessLandingTemplate;
