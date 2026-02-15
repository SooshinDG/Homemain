export type TemplateCategory = "landing-page" | "dashboard" | "ecommerce" | "saas";

export interface TemplateSummary {
  id: string;
  slug: string;
  name: string;
  category: TemplateCategory;
  description: string;
  price: number;
  isPublished: boolean;
}
