import { cn } from "@/core/lib/utils";

type PageContainerProps = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export function PageContainer({ children, className }: PageContainerProps) {
  return <div className={cn("mx-auto w-full max-w-7xl px-6 lg:px-8", className)}>{children}</div>;
}
