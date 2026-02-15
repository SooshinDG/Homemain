import type { AboutSectionProps } from "../types";

export function AboutSection({
  sectionId,
  titleId,
  title,
  description,
  mission,
  stats,
}: AboutSectionProps) {
  return (
    <section id={sectionId} className="sb-section sb-about" aria-labelledby={titleId}>
      <div className="sb-container">
        <h2 id={titleId} className="sb-section-title">
          {title}
        </h2>
        <p className="sb-section-intro">{description}</p>
        <p className="sb-mission">{mission}</p>

        <dl className="sb-stats">
          {stats.map((stat) => (
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
