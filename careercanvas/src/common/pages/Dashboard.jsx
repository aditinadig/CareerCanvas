import React from "react";
import { Link } from "react-router-dom";
import { 
  Compass, 
  Map, 
  TrendingUp, 
  BookOpen, 
  MessageSquare,
  ArrowRight,
  Target,
  Calendar,
  Award
} from "lucide-react";

const Dashboard = () => {
  const modules = [
    {
      name: "Pathfinder",
      description: "Find career paths that match your skills",
      icon: Compass,
      href: "/pathfinder",
      color: "primary",
      features: ["Skill-based recommendations", "Career path analysis", "Skill gap identification"]
    },
    {
      name: "RouteMap",
      description: "Explore career progression paths",
      icon: Map,
      href: "/routemap",
      color: "secondary",
      features: ["Career transitions", "Salary insights", "Required skills"]
    },
    {
      name: "GrowthTracker",
      description: "Track your learning and set career goals",
      icon: TrendingUp,
      href: "/growth-tracker",
      color: "accent",
      features: ["Weekly logs", "Goal setting", "Progress timeline"]
    },
    {
      name: "FlashDeck",
      description: "Learn skills through interactive flashcards",
      icon: BookOpen,
      href: "/flash-deck",
      color: "neutral",
      features: ["Role-specific cards", "Progress tracking", "AI-generated content"]
    },
    {
      name: "TalkTracks",
      description: "Practice interview responses and self-presentation",
      icon: MessageSquare,
      href: "/talk-tracks",
      color: "info",
      features: ["Interview prep", "Response templates", "AI feedback"]
    }
  ];

  const stats = [
    { label: "Goals Set", value: "12", icon: Target },
    { label: "Skills Learned", value: "8", icon: Award },
    { label: "Weeks Tracked", value: "6", icon: Calendar }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate mb-2">Welcome back!</h1>
        <p className="text-slate-600">Ready to continue your career journey?</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg p-6 shadow-sm border border-base-200">
              <div className="flex items-center">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-slate">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-base-200 mb-8">
        <h2 className="text-xl font-semibold text-slate mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="btn btn-primary btn-outline">
            Add Weekly Log
          </button>
          <button className="btn btn-secondary btn-outline">
            Set New Goal
          </button>
          <button className="btn btn-accent btn-outline">
            Practice Interview
          </button>
          <button className="btn btn-neutral btn-outline">
            Review Flashcards
          </button>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <div key={module.name} className="bg-white rounded-lg shadow-sm border border-base-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`p-3 bg-${module.color}/10 rounded-lg`}>
                      <Icon className={`w-6 h-6 text-${module.color}`} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-slate">{module.name}</h3>
                      <p className="text-slate-600">{module.description}</p>
                    </div>
                  </div>
                  <Link 
                    to={module.href}
                    className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
                
                <div className="space-y-2">
                  {module.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-slate-500">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Link 
                  to={module.href}
                  className={`btn btn-${module.color} w-full mt-6`}
                >
                  Open {module.name}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard; 