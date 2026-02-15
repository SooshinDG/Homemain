import rawTemplateContent from "../../../content/small-business.json";
import { SMALL_BUSINESS_SECTION_KEYS } from "./types";
import type {
  SmallBusinessSectionKey,
  SmallBusinessTemplateContent,
} from "./types";

function isSectionKey(value: unknown): value is SmallBusinessSectionKey {
  return (
    typeof value === "string" &&
    (SMALL_BUSINESS_SECTION_KEYS as readonly string[]).includes(value)
  );
}

function normalizeSectionOrder(sectionOrder: unknown): SmallBusinessSectionKey[] {
  if (!Array.isArray(sectionOrder)) {
    return [...SMALL_BUSINESS_SECTION_KEYS];
  }

  const uniqueValidOrder: SmallBusinessSectionKey[] = [];

  for (const sectionKey of sectionOrder) {
    if (isSectionKey(sectionKey) && !uniqueValidOrder.includes(sectionKey)) {
      uniqueValidOrder.push(sectionKey);
    }
  }

  for (const requiredSection of SMALL_BUSINESS_SECTION_KEYS) {
    if (!uniqueValidOrder.includes(requiredSection)) {
      uniqueValidOrder.push(requiredSection);
    }
  }

  return uniqueValidOrder;
}

const parsedTemplateContent = rawTemplateContent as SmallBusinessTemplateContent;

export const smallBusinessTemplateContent: SmallBusinessTemplateContent = {
  ...parsedTemplateContent,
  layout: {
    ...parsedTemplateContent.layout,
    sectionOrder: normalizeSectionOrder(parsedTemplateContent.layout?.sectionOrder),
  },
};

export default smallBusinessTemplateContent;
