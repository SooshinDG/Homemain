import { ServicesContent } from "../types";

interface ServicesSectionProps {
  content: ServicesContent;
}

export function ServicesSection({ content }: ServicesSectionProps) {
  return (
    <section id="services" className="sb-section sb-services" aria-labelledby="services-title">
      <div className="sb-container">
        <h2 id="services-title" className="sb-section-title">
          {content.title}
        </h2>
        <p className="sb-section-intro">{content.intro}</p>

        <div className="sb-grid sb-grid-three">
          {content.items.map((service) => (
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
