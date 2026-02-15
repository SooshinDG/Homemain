import type { CtaSectionProps } from "../types";

export function CtaSection({ sectionId, titleId, title, description, button }: CtaSectionProps) {
  return (
    <section id={sectionId} className="sb-section sb-cta" aria-labelledby={titleId}>
      <div className="sb-container sb-cta-box">
        <h2 id={titleId} className="sb-section-title">
          {title}
        </h2>
        <p>{description}</p>
        <a className="sb-button sb-button-primary" href={button.href}>
          {button.label}
        </a>
      </div>
    </section>
  );
}

export default CtaSection;
