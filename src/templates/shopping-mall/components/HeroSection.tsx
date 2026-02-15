export interface HeroSectionProps {
  headline: string;
  supportingText: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
}

export function HeroSection({
  headline,
  supportingText,
  primaryCtaLabel,
  primaryCtaHref,
}: HeroSectionProps) {
  return (
    <section className="shopping-template__hero">
      <div className="shopping-template__hero-content">
        <span className="shopping-template__eyebrow">Template-ready storefront</span>
        <h1 className="shopping-template__headline">{headline}</h1>
        <p className="shopping-template__supporting">{supportingText}</p>
        <a className="shopping-template__primary-cta" href={primaryCtaHref}>
          {primaryCtaLabel}
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
