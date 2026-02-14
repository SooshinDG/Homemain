import { Fragment } from "react";
import type { ReactNode } from "react";

export interface SectionLayoutItem {
  id: string;
  node: ReactNode;
}

export interface SectionStackLayoutProps {
  className?: string;
  sections: SectionLayoutItem[];
}

export function SectionStackLayout({ className, sections }: SectionStackLayoutProps) {
  return (
    <main className={className}>
      {sections.map((section) => (
        <Fragment key={section.id}>{section.node}</Fragment>
      ))}
    </main>
  );
}

export default SectionStackLayout;
