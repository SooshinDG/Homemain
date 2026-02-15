import { ContactContent } from "../types";

interface ContactSectionProps {
  content: ContactContent;
}

export function ContactSection({ content }: ContactSectionProps) {
  return (
    <section id="contact" className="sb-section sb-contact" aria-labelledby="contact-title">
      <div className="sb-container sb-contact-layout">
        <div>
          <h2 id="contact-title" className="sb-section-title">
            {content.title}
          </h2>
          <p className="sb-section-intro">{content.intro}</p>

          <ul className="sb-contact-details">
            <li>
              <strong>{content.labels.phone}:</strong>{" "}
              <a href={`tel:${content.phone}`}>{content.phone}</a>
            </li>
            <li>
              <strong>{content.labels.email}:</strong>{" "}
              <a href={`mailto:${content.email}`}>{content.email}</a>
            </li>
            <li>
              <strong>{content.labels.address}:</strong> {content.address}
            </li>
            <li>
              <strong>{content.labels.hours}:</strong> {content.hours}
            </li>
          </ul>
        </div>

        <form className="sb-contact-form" action="#" method="post">
          <h3>{content.formHeading}</h3>

          <label>
            {content.formFields.nameLabel}
            <input
              type="text"
              name="name"
              placeholder={content.formFields.namePlaceholder}
            />
          </label>

          <label>
            {content.formFields.emailLabel}
            <input
              type="email"
              name="email"
              placeholder={content.formFields.emailPlaceholder}
            />
          </label>

          <label>
            {content.formFields.messageLabel}
            <textarea
              name="message"
              rows={5}
              placeholder={content.formFields.messagePlaceholder}
            />
          </label>

          <button type="submit" className="sb-button sb-button-primary">
            {content.formFields.submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactSection;
