import React, { useState } from "react";
import { Search, Plus, Target, TrendingUp, Star, ArrowRight } from "lucide-react";
import SkillRadarChart from "./components/SkillRadarChart";

const Pathfinder = () => {
  const [skills, setSkills] = useState("");
  const [careerPaths, setCareerPaths] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPath, setSelectedPath] = useState(null);

  // Mock career paths data
  const mockCareerPaths = [
    {
      id: 1,
      title: "Frontend Developer",
      description: "Build user interfaces and interactive web applications",
      matchScore: 85,
      requiredSkills: ["JavaScript", "React", "HTML", "CSS", "Git"],
      userSkills: ["JavaScript", "HTML", "CSS"],
      salary: "$65,000 - $120,000",
      growth: "High",
      tools: ["VS Code", "Chrome DevTools", "Figma"]
    },
    {
      id: 2,
      title: "UX Designer",
      description: "Design user experiences and create intuitive interfaces",
      matchScore: 72,
      requiredSkills: ["User Research", "Figma", "Prototyping", "User Testing", "Design Systems"],
      userSkills: ["Figma", "Prototyping"],
      salary: "$70,000 - $130,000",
      growth: "High",
      tools: ["Figma", "Sketch", "InVision", "Miro"]
    },
    {
      id: 3,
      title: "Product Manager",
      description: "Lead product strategy and coordinate cross-functional teams",
      matchScore: 68,
      requiredSkills: ["Product Strategy", "Data Analysis", "Stakeholder Management", "Agile", "User Research"],
      userSkills: ["Data Analysis", "User Research"],
      salary: "$80,000 - $150,000",
      growth: "Very High",
      tools: ["Jira", "Figma", "Mixpanel", "Slack"]
    }
  ];

  const handleFindPaths = () => {
    if (!skills.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setCareerPaths(mockCareerPaths);
      setIsLoading(false);
    }, 1500);
  };

  const handleAddToPlan = (careerPath) => {
    // This would typically save to user's plan
    alert(`${careerPath.title} added to your career plan!`);
  };

  const getSkillGaps = (requiredSkills, userSkills) => {
    return requiredSkills.filter(skill => !userSkills.includes(skill));
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate mb-2">Pathfinder</h1>
        <p className="text-slate-600">Discover career paths that match your skills</p>
      </div>

      {/* Skills Input */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-base-200 mb-8">
        <h2 className="text-xl font-semibold text-slate mb-4">Enter Your Skills</h2>
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="e.g., JavaScript, Figma, Public Speaking, Project Management"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="input input-bordered w-full"
            />
            <p className="text-sm text-slate-500 mt-2">
              Separate skills with commas. Be specific about your experience level.
            </p>
          </div>
          <button
            onClick={handleFindPaths}
            disabled={!skills.trim() || isLoading}
            className="btn btn-primary"
          >
            {isLoading ? (
              <div className="loading loading-spinner loading-sm"></div>
            ) : (
              <Search className="w-5 h-5" />
            )}
            Find Paths
          </button>
        </div>
      </div>

      {/* Career Paths Results */}
      {careerPaths.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate">Recommended Career Paths</h2>
          
          {careerPaths.map((path) => (
            <div key={path.id} className="bg-white rounded-lg shadow-sm border border-base-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl font-semibold text-slate">{path.title}</h3>
                      <div className="flex items-center gap-1 bg-success/10 text-success px-2 py-1 rounded-full text-sm">
                        <Star className="w-4 h-4" />
                        {path.matchScore}% Match
                      </div>
                    </div>
                    <p className="text-slate-600 mb-3">{path.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <span className="text-sm text-slate-600">Growth: {path.growth}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary" />
                        <span className="text-sm text-slate-600">Salary: {path.salary}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleAddToPlan(path)}
                    className="btn btn-primary btn-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add to Plan
                  </button>
                </div>

                {/* Skills Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Radar Chart */}
                  <div>
                    <h4 className="font-semibold text-slate mb-3">Skills Match</h4>
                    <div className="h-64">
                      <SkillRadarChart 
                        requiredSkills={path.requiredSkills}
                        userSkills={path.userSkills}
                      />
                    </div>
                  </div>

                  {/* Skills Breakdown */}
                  <div>
                    <h4 className="font-semibold text-slate mb-3">Skills Analysis</h4>
                    
                    <div className="space-y-4">
                      {/* Your Skills */}
                      <div>
                        <h5 className="text-sm font-medium text-success mb-2">Your Skills</h5>
                        <div className="flex flex-wrap gap-2">
                          {path.userSkills.map((skill) => (
                            <span key={skill} className="badge badge-success badge-outline">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Missing Skills */}
                      <div>
                        <h5 className="text-sm font-medium text-error mb-2">Skills to Develop</h5>
                        <div className="flex flex-wrap gap-2">
                          {getSkillGaps(path.requiredSkills, path.userSkills).map((skill) => (
                            <span key={skill} className="badge badge-error badge-outline">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tools */}
                      <div>
                        <h5 className="text-sm font-medium text-primary mb-2">Common Tools</h5>
                        <div className="flex flex-wrap gap-2">
                          {path.tools.map((tool) => (
                            <span key={tool} className="badge badge-primary badge-outline">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {careerPaths.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-slate mb-2">Ready to discover your career paths?</h3>
          <p className="text-slate-600">Enter your skills above to get personalized career recommendations.</p>
        </div>
      )}
    </div>
  );
};

export default Pathfinder; 