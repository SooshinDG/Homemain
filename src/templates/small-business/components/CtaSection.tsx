import { CtaContent } from "../types";

interface CtaSectionProps {
  content: CtaContent;
}

export function CtaSection({ content }: CtaSectionProps) {
  return (
    <section id="cta" className="sb-section sb-cta" aria-labelledby="cta-title">
      <div className="sb-container sb-cta-box">
        <h2 id="cta-title" className="sb-section-title">
          {content.title}
        </h2>
        <p>{content.description}</p>
        <a className="sb-button sb-button-primary" href={content.buttonHref}>
          {content.buttonLabel}
        </a>
      </div>
    </section>
  );
}

export default CtaSection;
