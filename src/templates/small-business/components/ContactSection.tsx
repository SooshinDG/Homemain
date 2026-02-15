import type { ContactSectionProps } from "../types";

export function ContactSection({
  sectionId,
  titleId,
  title,
  intro,
  detailsLabels,
  phone,
  email,
  address,
  hours,
  form,
}: ContactSectionProps) {
  return (
    <section id={sectionId} className="sb-section sb-contact" aria-labelledby={titleId}>
      <div className="sb-container sb-contact-layout">
        <div>
          <h2 id={titleId} className="sb-section-title">
            {title}
          </h2>
          <p className="sb-section-intro">{intro}</p>

          <ul className="sb-contact-details">
            <li>
              <strong>{detailsLabels.phone}:</strong> <a href={`tel:${phone}`}>{phone}</a>
            </li>
            <li>
              <strong>{detailsLabels.email}:</strong> <a href={`mailto:${email}`}>{email}</a>
            </li>
            <li>
              <strong>{detailsLabels.address}:</strong> {address}
            </li>
            <li>
              <strong>{detailsLabels.hours}:</strong> {hours}
            </li>
          </ul>
        </div>

        <form className="sb-contact-form" action={form.action} method={form.method}>
          <h3>{form.heading}</h3>

          <label>
            {form.fields.name.label}
            <input
              type="text"
              name={form.fields.name.name}
              placeholder={form.fields.name.placeholder}
            />
          </label>

          <label>
            {form.fields.email.label}
            <input
              type="email"
              name={form.fields.email.name}
              placeholder={form.fields.email.placeholder}
            />
          </label>

          <label>
            {form.fields.message.label}
            <textarea
              name={form.fields.message.name}
              rows={5}
              placeholder={form.fields.message.placeholder}
            />
          </label>

          <button type="submit" className="sb-button sb-button-primary">
            {form.submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactSection;
