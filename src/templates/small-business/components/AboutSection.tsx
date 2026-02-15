import { AboutContent } from "../types";

interface AboutSectionProps {
  content: AboutContent;
}

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="about" className="sb-section sb-about" aria-labelledby="about-title">
      <div className="sb-container">
        <h2 id="about-title" className="sb-section-title">
          {content.title}
        </h2>
        <p className="sb-section-intro">{content.description}</p>
        <p className="sb-mission">{content.mission}</p>

        <dl className="sb-stats">
          {content.stats.map((stat) => (
            <div key={stat.label} className="sb-stat-card">
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default AboutSection;
