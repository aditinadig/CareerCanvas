import React, { useState } from "react";
import { Map, ArrowRight, DollarSign, Users, Clock, Target } from "lucide-react";

const RouteMap = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  // Mock career progression data
  const careerPaths = [
    {
      id: "tech",
      title: "Technology",
      roles: [
        {
          id: "intern",
          title: "Software Intern",
          level: 1,
          salary: "$40,000 - $60,000",
          duration: "3-6 months",
          skills: ["Basic Programming", "Git", "Agile"],
          tools: ["VS Code", "GitHub", "Slack"],
          description: "Entry-level position for learning software development fundamentals"
        },
        {
          id: "junior",
          title: "Junior Developer",
          level: 2,
          salary: "$60,000 - $85,000",
          duration: "1-2 years",
          skills: ["JavaScript", "React", "API Development", "Testing"],
          tools: ["VS Code", "Postman", "Jest", "Docker"],
          description: "Building features and learning best practices"
        },
        {
          id: "senior",
          title: "Senior Developer",
          level: 3,
          salary: "$85,000 - $130,000",
          duration: "3-5 years",
          skills: ["System Design", "Mentoring", "Architecture", "Performance"],
          tools: ["AWS", "Kubernetes", "Monitoring Tools"],
          description: "Leading technical decisions and mentoring junior developers"
        },
        {
          id: "lead",
          title: "Tech Lead",
          level: 4,
          salary: "$130,000 - $180,000",
          duration: "5+ years",
          skills: ["Team Leadership", "Project Management", "Strategic Planning"],
          tools: ["Jira", "Confluence", "Architecture Tools"],
          description: "Leading development teams and technical strategy"
        }
      ]
    },
    {
      id: "design",
      title: "Design",
      roles: [
        {
          id: "design-intern",
          title: "Design Intern",
          level: 1,
          salary: "$35,000 - $50,000",
          duration: "3-6 months",
          skills: ["Basic Design", "Figma", "User Research"],
          tools: ["Figma", "Sketch", "Miro"],
          description: "Learning design fundamentals and user-centered design"
        },
        {
          id: "junior-designer",
          title: "Junior Designer",
          level: 2,
          salary: "$50,000 - $75,000",
          duration: "1-2 years",
          skills: ["UI Design", "Prototyping", "User Testing", "Design Systems"],
          tools: ["Figma", "InVision", "UserTesting"],
          description: "Creating user interfaces and conducting user research"
        },
        {
          id: "senior-designer",
          title: "Senior Designer",
          level: 3,
          salary: "$75,000 - $120,000",
          duration: "3-5 years",
          skills: ["Design Strategy", "Mentoring", "Design Leadership"],
          tools: ["Figma", "Design Systems", "Analytics"],
          description: "Leading design initiatives and mentoring junior designers"
        },
        {
          id: "design-lead",
          title: "Design Lead",
          level: 4,
          salary: "$120,000 - $160,000",
          duration: "5+ years",
          skills: ["Design Strategy", "Team Leadership", "Stakeholder Management"],
          tools: ["Design Systems", "Analytics", "Project Management"],
          description: "Leading design teams and strategic design decisions"
        }
      ]
    }
  ];

  const handleRoleClick = (role) => {
    setSelectedRole(role);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate mb-2">RouteMap</h1>
        <p className="text-slate-600">Explore career progression paths and transitions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Career Paths */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-slate mb-6">Career Progression Paths</h2>
          
          {careerPaths.map((path) => (
            <div key={path.id} className="bg-white rounded-lg shadow-sm border border-base-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-slate mb-4">{path.title}</h3>
              
              <div className="space-y-4">
                {path.roles.map((role, index) => (
                  <div key={role.id}>
                    <div className="flex items-center">
                      {/* Role Card */}
                      <div 
                        className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedRole?.id === role.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-base-300 hover:border-primary/50'
                        }`}
                        onClick={() => handleRoleClick(role)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-slate">{role.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Clock className="w-4 h-4" />
                            {role.duration}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {role.salary}
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            Level {role.level}
                          </div>
                        </div>
                      </div>

                      {/* Arrow */}
                      {index < path.roles.length - 1 && (
                        <div className="mx-4 text-slate-400">
                          <ArrowRight className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Role Details */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-slate mb-6">Role Details</h2>
          
          {selectedRole ? (
            <div className="bg-white rounded-lg shadow-sm border border-base-200 p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-slate mb-2">{selectedRole.title}</h3>
              <p className="text-slate-600 mb-4">{selectedRole.description}</p>
              
              <div className="space-y-4">
                {/* Salary */}
                <div>
                  <h4 className="font-medium text-slate mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Salary Range
                  </h4>
                  <p className="text-sm text-slate-600">{selectedRole.salary}</p>
                </div>

                {/* Duration */}
                <div>
                  <h4 className="font-medium text-slate mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Typical Duration
                  </h4>
                  <p className="text-sm text-slate-600">{selectedRole.duration}</p>
                </div>

                {/* Required Skills */}
                <div>
                  <h4 className="font-medium text-slate mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRole.skills.map((skill) => (
                      <span key={skill} className="badge badge-primary badge-outline text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <h4 className="font-medium text-slate mb-2">Common Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRole.tools.map((tool) => (
                      <span key={tool} className="badge badge-secondary badge-outline text-xs">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Next Steps */}
                <div className="pt-4 border-t border-base-200">
                  <h4 className="font-medium text-slate mb-2">Next Steps</h4>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p>• Focus on developing the required skills</p>
                    <p>• Gain relevant experience through projects</p>
                    <p>• Network with professionals in this role</p>
                    <p>• Consider certifications or additional training</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-base-200 p-6 text-center">
              <Map className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate mb-2">Select a Role</h3>
              <p className="text-slate-600">Click on any role to see detailed information about requirements, salary, and next steps.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RouteMap; 