// Bibliotecas
import { ArrowUp } from "lucide-react";

// Tipagem
import { LucideProps } from "lucide-react";
interface ItemsCardsDetail {
  icon: React.ComponentType<LucideProps>;
  title: string;
  value: string;
  percentage?: string | undefined;
}

export default function InfoCards({ data }: { data: ItemsCardsDetail[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item, index) => (
        <div
          key={index}
          className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 p-5"
        >
          <div className="absolute top-5 left-4 transform bg-[#3b82f6] text-gray-200 p-3 rounded-md">
            <item.icon className="w-6 h-6" />
          </div>
          <div className="ml-16">
            <p className="text-sm font-medium text-gray-500">{item.title}</p>
            <div className="flex items-center">
              <p className="text-lg font-bold text-gray-800">{item.value}</p>
              {item.percentage && (
                <p className="ml-1 flex items-center text-xs font-semibold text-green-500">
                  <ArrowUp className="w-[1.3em] h-[1.3em] text-green-400" />
                  {item.percentage}%
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
