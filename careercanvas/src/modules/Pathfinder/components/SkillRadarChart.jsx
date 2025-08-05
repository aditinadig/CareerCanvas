import React from "react";

const SkillRadarChart = ({ requiredSkills, userSkills }) => {
  // Create a simple radar chart visualization
  const allSkills = [...new Set([...requiredSkills, ...userSkills])];
  const maxSkills = Math.max(allSkills.length, 5);
  
  // Calculate match percentages
  const skillMatches = requiredSkills.map(skill => ({
    skill,
    required: true,
    userHas: userSkills.includes(skill),
    matchPercentage: userSkills.includes(skill) ? 100 : 0
  }));

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Radar Chart Background */}
      <div className="relative w-48 h-48">
        {/* Concentric circles */}
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className="absolute border border-base-300 rounded-full"
            style={{
              width: `${(level / 5) * 100}%`,
              height: `${(level / 5) * 100}%`,
              top: `${((5 - level) / 5) * 50}%`,
              left: `${((5 - level) / 5) * 50}%`
            }}
          />
        ))}

        {/* Skill points */}
        {skillMatches.map((skillMatch, index) => {
          const angle = (index / skillMatches.length) * 2 * Math.PI - Math.PI / 2;
          const radius = 0.8; // 80% of the chart radius
          const x = Math.cos(angle) * radius * 96; // 96px = 48% of 200px
          const y = Math.sin(angle) * radius * 96;
          
          return (
            <div key={skillMatch.skill}>
              {/* Skill point */}
              <div
                className={`absolute w-3 h-3 rounded-full transform -translate-x-1.5 -translate-y-1.5 ${
                  skillMatch.userHas ? 'bg-success' : 'bg-error'
                }`}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`
                }}
              />
              
              {/* Skill label */}
              <div
                className="absolute text-xs font-medium transform -translate-x-1/2 -translate-y-full"
                style={{
                  left: `calc(50% + ${x * 1.1}px)`,
                  top: `calc(50% + ${y * 1.1}px)`,
                  color: skillMatch.userHas ? '#16a34a' : '#dc2626'
                }}
              >
                {skillMatch.skill}
              </div>
            </div>
          );
        })}

        {/* Center point */}
        <div className="absolute w-2 h-2 bg-primary rounded-full top-1/2 left-1/2 transform -translate-x-1 -translate-y-1" />
      </div>

      {/* Legend */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span>You have this skill</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-error rounded-full"></div>
          <span>Skill to develop</span>
        </div>
      </div>
    </div>
  );
};

export default SkillRadarChart; 