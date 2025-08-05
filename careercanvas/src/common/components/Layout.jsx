import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Compass, 
  Map, 
  TrendingUp, 
  BookOpen, 
  MessageSquare, 
  Menu, 
  X,
  Home
} from "lucide-react";
import Logo from "./Logo";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Pathfinder", href: "/pathfinder", icon: Compass },
    { name: "RouteMap", href: "/routemap", icon: Map },
    { name: "GrowthTracker", href: "/growth-tracker", icon: TrendingUp },
    { name: "FlashDeck", href: "/flash-deck", icon: BookOpen },
    { name: "TalkTracks", href: "/talk-tracks", icon: MessageSquare },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-soft-gray">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-base-200">
            <Logo />
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                    ${isActive(item.href)
                      ? 'bg-primary text-primary-content'
                      : 'text-slate-600 hover:bg-base-200 hover:text-slate-900'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Close button for mobile */}
          <button
            className="lg:hidden absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-700"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-base-200 px-4 py-3">
          <button
            className="p-2 text-slate-500 hover:text-slate-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 