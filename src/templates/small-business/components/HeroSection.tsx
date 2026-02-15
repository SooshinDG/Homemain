import type { HeroSectionProps } from "../types";

export function HeroSection({
  sectionId,
  titleId,
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  highlightsAriaLabel,
  highlights,
}: HeroSectionProps) {
  return (
    <section id={sectionId} className="sb-section sb-hero" aria-labelledby={titleId}>
      <div className="sb-container">
        <p className="sb-eyebrow">{eyebrow}</p>
        <h1 id={titleId} className="sb-title">
          {title}
        </h1>
        <p className="sb-lead">{description}</p>

        <div className="sb-hero-actions">
          <a className="sb-button sb-button-primary" href={primaryCta.href}>
            {primaryCta.label}
          </a>
          <a className="sb-button sb-button-secondary" href={secondaryCta.href}>
            {secondaryCta.label}
          </a>
        </div>

        <ul className="sb-highlights" aria-label={highlightsAriaLabel}>
          {highlights.map((highlight, index) => (
            <li key={`${highlight}-${index}`}>{highlight}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default HeroSection;
