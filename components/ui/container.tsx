// React
import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 p-4 overflow-hidden bg-white dark:bg-gray-800 shadow rounded-2xl ring-1 ring-gray-200 dark:ring-gray-700">
      {children}
    </div>
  );
}
