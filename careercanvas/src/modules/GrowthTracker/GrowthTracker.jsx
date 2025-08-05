import React, { useState } from "react";
import { TrendingUp, Plus, Calendar, Target, CheckCircle, Clock, Edit, Trash2 } from "lucide-react";

const GrowthTracker = () => {
  const [activeTab, setActiveTab] = useState("logs");
  const [showAddLog, setShowAddLog] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [logs, setLogs] = useState([
    {
      id: 1,
      date: "2024-01-15",
      title: "Completed React Fundamentals Course",
      description: "Learned about components, state, props, and hooks. Built a todo app as final project.",
      skills: ["React", "JavaScript", "State Management"],
      hours: 8
    },
    {
      id: 2,
      date: "2024-01-08",
      title: "Attended UX Design Workshop",
      description: "Participated in a 2-day workshop on user research and prototyping techniques.",
      skills: ["User Research", "Prototyping", "Figma"],
      hours: 16
    }
  ]);
  
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Complete Frontend Development Bootcamp",
      description: "Finish the 12-week intensive course on modern web development",
      deadline: "2024-03-15",
      status: "in-progress",
      progress: 60,
      category: "Learning"
    },
    {
      id: 2,
      title: "Build Portfolio Website",
      description: "Create a personal portfolio showcasing my projects and skills",
      deadline: "2024-02-28",
      status: "completed",
      progress: 100,
      category: "Project"
    },
    {
      id: 3,
      title: "Get AWS Certified",
      description: "Pass the AWS Solutions Architect Associate certification",
      deadline: "2024-04-30",
      status: "not-started",
      progress: 0,
      category: "Certification"
    }
  ]);

  const [newLog, setNewLog] = useState({
    title: "",
    description: "",
    skills: "",
    hours: ""
  });

  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    deadline: "",
    category: "Learning"
  });

  const handleAddLog = () => {
    if (!newLog.title || !newLog.description) return;
    
    const log = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      title: newLog.title,
      description: newLog.description,
      skills: newLog.skills.split(',').map(s => s.trim()).filter(s => s),
      hours: parseInt(newLog.hours) || 0
    };
    
    setLogs([log, ...logs]);
    setNewLog({ title: "", description: "", skills: "", hours: "" });
    setShowAddLog(false);
  };

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.description || !newGoal.deadline) return;
    
    const goal = {
      id: Date.now(),
      title: newGoal.title,
      description: newGoal.description,
      deadline: newGoal.deadline,
      status: "not-started",
      progress: 0,
      category: newGoal.category
    };
    
    setGoals([goal, ...goals]);
    setNewGoal({ title: "", description: "", deadline: "", category: "Learning" });
    setShowAddGoal(false);
  };

  const updateGoalProgress = (goalId, progress) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, progress, status: progress >= 100 ? "completed" : "in-progress" }
        : goal
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "success";
      case "in-progress": return "warning";
      case "not-started": return "error";
      default: return "neutral";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "in-progress": return <Clock className="w-4 h-4" />;
      case "not-started": return <Target className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate mb-2">GrowthTracker</h1>
        <p className="text-slate-600">Log your learning and track your career goals</p>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-boxed mb-6">
        <button 
          className={`tab ${activeTab === "logs" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("logs")}
        >
          Weekly Logs
        </button>
        <button 
          className={`tab ${activeTab === "goals" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("goals")}
        >
          Goals
        </button>
        <button 
          className={`tab ${activeTab === "timeline" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("timeline")}
        >
          Timeline
        </button>
      </div>

      {/* Weekly Logs Tab */}
      {activeTab === "logs" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate">Weekly Learning Logs</h2>
            <button 
              onClick={() => setShowAddLog(true)}
              className="btn btn-primary btn-sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Log
            </button>
          </div>

          {/* Add Log Modal */}
          {showAddLog && (
            <div className="modal modal-open">
              <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Add Weekly Log</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="What did you work on?"
                    className="input input-bordered w-full"
                    value={newLog.title}
                    onChange={(e) => setNewLog({...newLog, title: e.target.value})}
                  />
                  <textarea
                    placeholder="What did you learn?"
                    className="textarea textarea-bordered w-full"
                    rows="3"
                    value={newLog.description}
                    onChange={(e) => setNewLog({...newLog, description: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Skills (comma separated)"
                    className="input input-bordered w-full"
                    value={newLog.skills}
                    onChange={(e) => setNewLog({...newLog, skills: e.target.value})}
                  />
                  <input
                    type="number"
                    placeholder="Hours spent"
                    className="input input-bordered w-full"
                    value={newLog.hours}
                    onChange={(e) => setNewLog({...newLog, hours: e.target.value})}
                  />
                </div>
                <div className="modal-action">
                  <button className="btn" onClick={() => setShowAddLog(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleAddLog}>Add Log</button>
                </div>
              </div>
            </div>
          )}

          {/* Logs List */}
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="bg-white rounded-lg shadow-sm border border-base-200 p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate">{log.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(log.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {log.hours} hours
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-600 mb-3">{log.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {log.skills.map((skill) => (
                    <span key={skill} className="badge badge-primary badge-outline">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Goals Tab */}
      {activeTab === "goals" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate">Career Goals</h2>
            <button 
              onClick={() => setShowAddGoal(true)}
              className="btn btn-primary btn-sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Goal
            </button>
          </div>

          {/* Add Goal Modal */}
          {showAddGoal && (
            <div className="modal modal-open">
              <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Add New Goal</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Goal title"
                    className="input input-bordered w-full"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  />
                  <textarea
                    placeholder="Goal description"
                    className="textarea textarea-bordered w-full"
                    rows="3"
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  />
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  />
                  <select
                    className="select select-bordered w-full"
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                  >
                    <option value="Learning">Learning</option>
                    <option value="Project">Project</option>
                    <option value="Certification">Certification</option>
                    <option value="Career">Career</option>
                  </select>
                </div>
                <div className="modal-action">
                  <button className="btn" onClick={() => setShowAddGoal(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleAddGoal}>Add Goal</button>
                </div>
              </div>
            </div>
          )}

          {/* Goals List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal) => (
              <div key={goal.id} className="bg-white rounded-lg shadow-sm border border-base-200 p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate">{goal.title}</h3>
                    <p className="text-slate-600 text-sm mt-1">{goal.description}</p>
                  </div>
                  <div className={`badge badge-${getStatusColor(goal.status)} badge-outline ml-2`}>
                    {getStatusIcon(goal.status)}
                    <span className="ml-1">{goal.status}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Progress</span>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                  
                  <progress 
                    className="progress progress-primary w-full" 
                    value={goal.progress} 
                    max="100"
                  />
                  
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Due: {new Date(goal.deadline).toLocaleDateString()}
                    </div>
                    <span className="badge badge-outline">{goal.category}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      className="btn btn-sm btn-outline"
                      onClick={() => updateGoalProgress(goal.id, Math.min(goal.progress + 25, 100))}
                    >
                      Update Progress
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline Tab */}
      {activeTab === "timeline" && (
        <div>
          <h2 className="text-xl font-semibold text-slate mb-6">Progress Timeline</h2>
          
          <div className="bg-white rounded-lg shadow-sm border border-base-200 p-6">
            <div className="space-y-6">
              {[...logs, ...goals].sort((a, b) => new Date(b.date || b.deadline) - new Date(a.date || a.deadline)).map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-slate">{item.title}</h4>
                      <span className="text-xs text-slate-500">
                        {new Date(item.date || item.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm">{item.description}</p>
                    {item.skills && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.skills.map((skill) => (
                          <span key={skill} className="badge badge-primary badge-outline badge-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrowthTracker; 