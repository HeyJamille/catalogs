// React
import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-auto h-full border-1 border-gray-200 bg-white shadow-md rounded-2xl">
      {children}
    </div>
  );
}
