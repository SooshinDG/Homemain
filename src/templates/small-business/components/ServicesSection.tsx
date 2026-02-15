import type { ServicesSectionProps } from "../types";

export function ServicesSection({
  sectionId,
  titleId,
  title,
  intro,
  items,
}: ServicesSectionProps) {
  return (
    <section id={sectionId} className="sb-section sb-services" aria-labelledby={titleId}>
      <div className="sb-container">
        <h2 id={titleId} className="sb-section-title">
          {title}
        </h2>
        <p className="sb-section-intro">{intro}</p>

        <div className="sb-grid sb-grid-three">
          {items.map((service) => (
            <article key={service.title} className="sb-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
