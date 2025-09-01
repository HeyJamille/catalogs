// React
import { ReactNode } from "react";

export default function ContainerLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-4 w-full">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
        {title}
      </h1>
      {children}
    </div>
  );
}
