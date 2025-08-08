" use client";

import { useContext, useState } from "react";

// Providers
import { AuthContext } from "@/provider/auth";

// Icons
import {
  X,
  ShoppingCart,
  Package,
  BarChart3,
  AlignJustify,
} from "lucide-react";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { signOut } = useContext(AuthContext);

  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "products", label: "Produtos", icon: Package },
    { id: "sales", label: "Vendas", icon: ShoppingCart },
    { id: "sair", label: "Sair", icon: X },
  ];

  const handleTabClick = async (tabId: string) => {
    if (tabId === "sair") {
      await signOut();
    } else {
      onTabChange(tabId);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              I&I Águas e Variedades
            </h1>
          </div>

          {/* Menu Button */}
          <div className="md:hidden">
            <AlignJustify
              onClick={openMenu}
              className="w-7 h-7 cursor-pointer"
            />
          </div>

          {/* Main Navigation */}
          <nav className="hidden md:flex md:space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    handleTabClick(tab.id);
                    onTabChange(tab.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
