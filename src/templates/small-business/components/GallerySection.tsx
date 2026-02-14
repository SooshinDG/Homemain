import { GalleryContent } from "../types";

interface GallerySectionProps {
  content: GalleryContent;
}

export function GallerySection({ content }: GallerySectionProps) {
  return (
    <section id="gallery" className="sb-section sb-gallery" aria-labelledby="gallery-title">
      <div className="sb-container">
        <h2 id="gallery-title" className="sb-section-title">
          {content.title}
        </h2>
        <p className="sb-section-intro">{content.intro}</p>

        <div className="sb-grid sb-grid-two">
          {content.items.map((item) => (
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
