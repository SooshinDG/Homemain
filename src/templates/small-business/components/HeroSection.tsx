import { HeroContent } from "../types";

interface HeroSectionProps {
  content: HeroContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section id="hero" className="sb-section sb-hero" aria-labelledby="hero-title">
      <div className="sb-container">
        <p className="sb-eyebrow">{content.eyebrow}</p>
        <h1 id="hero-title" className="sb-title">
          {content.title}
        </h1>
        <p className="sb-lead">{content.description}</p>

        <div className="sb-hero-actions">
          <a className="sb-button sb-button-primary" href={content.primaryCtaHref}>
            {content.primaryCtaLabel}
          </a>
          <a className="sb-button sb-button-secondary" href={content.secondaryCtaHref}>
            {content.secondaryCtaLabel}
          </a>
        </div>

        <ul className="sb-highlights" aria-label="Business highlights">
          {content.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default HeroSection;
