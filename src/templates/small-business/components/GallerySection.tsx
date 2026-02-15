import type { GallerySectionProps } from "../types";

export function GallerySection({
  sectionId,
  titleId,
  title,
  intro,
  items,
}: GallerySectionProps) {
  return (
    <section id={sectionId} className="sb-section sb-gallery" aria-labelledby={titleId}>
      <div className="sb-container">
        <h2 id={titleId} className="sb-section-title">
          {title}
        </h2>
        <p className="sb-section-intro">{intro}</p>

        <div className="sb-grid sb-grid-two">
          {items.map((item) => (
            <figure key={item.title} className="sb-gallery-item">
              <img src={item.imageUrl} alt={item.alt} loading="lazy" />
              <figcaption>
                <strong>{item.title}</strong>
                <span>{item.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GallerySection;
