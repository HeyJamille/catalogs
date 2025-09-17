// React
import { ReactNode } from "react";

// Tipagem
interface ContainerLayoutProps {
  title: string;
  children: ReactNode;
}

export default function ContainerLayout({
  title,
  children,
}: ContainerLayoutProps) {
  return (
    <div className="space-y-4 w-full">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
        {title}
      </h1>
      {children}
    </div>
  );
}
