import React, { useState } from "react";
import { MessageSquare, Edit, Save, Copy, ThumbsUp, ThumbsDown, Plus, Mic, Play } from "lucide-react";

const TalkTracks = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [userResponses, setUserResponses] = useState({});
  const [showAddResponse, setShowAddResponse] = useState(false);
  const [activeTab, setActiveTab] = useState("templates");

  // Mock template data
  const templates = [
    {
      id: "tell-me-about-yourself",
      title: "Tell me about yourself",
      category: "Introduction",
      template: "I'm a [role] with [X] years of experience in [industry/field]. I specialize in [key skill 1] and [key skill 2], and I'm passionate about [relevant interest]. In my current role at [company], I [key achievement]. I'm excited about this opportunity because [connection to role/company].",
      tips: [
        "Keep it under 2 minutes",
        "Focus on relevant experience",
        "Connect to the role you're applying for",
        "Show enthusiasm and personality"
      ],
      examples: [
        "I'm a frontend developer with 3 years of experience building user-friendly web applications. I specialize in React and TypeScript, and I'm passionate about creating accessible, performant interfaces. In my current role at TechCorp, I led the redesign of our customer portal, improving user engagement by 40%. I'm excited about this opportunity because I want to work on products that impact millions of users."
      ]
    },
    {
      id: "why-should-we-hire-you",
      title: "Why should we hire you?",
      category: "Value Proposition",
      template: "You should hire me because I bring [unique skill/experience] that directly addresses [company need/challenge]. My experience in [specific area] has taught me [key insight], and I've consistently delivered [specific results] in similar situations. I'm also [personal quality] and [team quality], which I believe aligns well with your company culture.",
      tips: [
        "Research the company's challenges",
        "Provide specific examples",
        "Show confidence without arrogance",
        "Connect your strengths to their needs"
      ],
      examples: [
        "You should hire me because I bring a unique combination of technical expertise and user empathy that directly addresses your need to improve customer satisfaction. My experience in UX design has taught me that the best solutions come from understanding user pain points, and I've consistently delivered 25% improvements in user engagement metrics. I'm also collaborative and data-driven, which I believe aligns well with your culture of evidence-based decision making."
      ]
    },
    {
      id: "cold-email",
      title: "Cold Email to Hiring Manager",
      category: "Networking",
      template: "Subject: [Specific connection/interest] - [Your name]\n\nHi [Name],\n\nI hope this email finds you well. I came across [specific project/achievement] at [company] and was impressed by [specific detail].\n\nI'm a [your role] with experience in [relevant skills], and I'm particularly interested in [specific aspect of their work].\n\nI'd love to learn more about [specific opportunity/insight] and see if there might be a way to contribute to your team.\n\nWould you be open to a brief conversation?\n\nBest regards,\n[Your name]",
      tips: [
        "Keep it concise and specific",
        "Show you've done your research",
        "Make a clear, reasonable ask",
        "Follow up if no response"
      ],
      examples: [
        "Subject: React Performance Optimization - Sarah Chen\n\nHi Alex,\n\nI hope this email finds you well. I came across your team's work on the new mobile app and was impressed by the 60% improvement in load times you achieved.\n\nI'm a frontend developer with experience in React optimization, and I'm particularly interested in your approach to code splitting and lazy loading.\n\nI'd love to learn more about your technical challenges and see if there might be a way to contribute to your team.\n\nWould you be open to a brief conversation?\n\nBest regards,\nSarah Chen"
      ]
    },
    {
      id: "strengths-weaknesses",
      title: "What are your strengths and weaknesses?",
      category: "Self-Assessment",
      template: "My greatest strength is [specific skill] - I've demonstrated this through [concrete example]. I'm also [second strength] which helps me [specific benefit].\n\nAs for weaknesses, I used to struggle with [weakness], but I've been working on it by [specific action]. I've seen improvement in [measurable result], and I continue to [ongoing effort].",
      tips: [
        "Choose relevant strengths",
        "Show growth mindset for weaknesses",
        "Provide specific examples",
        "Keep it balanced"
      ],
      examples: [
        "My greatest strength is problem-solving - I've demonstrated this through leading the debugging of a critical production issue that was affecting 10,000 users. I'm also highly organized which helps me manage multiple projects effectively.\n\nAs for weaknesses, I used to struggle with public speaking, but I've been working on it by joining Toastmasters and volunteering for presentations. I've seen improvement in my confidence and delivery, and I continue to practice regularly."
      ]
    }
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setActiveTab("practice");
  };

  const handleResponseChange = (templateId, response) => {
    setUserResponses(prev => ({
      ...prev,
      [templateId]: response
    }));
  };

  const handleSaveResponse = (templateId) => {
    // This would typically save to user's profile
    alert("Response saved to your profile!");
  };

  const handleCopyResponse = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const getFeedback = (response, template) => {
    // Mock AI feedback
    const feedback = {
      score: Math.floor(Math.random() * 30) + 70, // 70-100
      suggestions: [
        "Consider adding more specific examples",
        "Your tone is professional and confident",
        "Try to connect more directly to the role requirements"
      ],
      strengths: [
        "Clear structure",
        "Good length",
        "Professional tone"
      ]
    };
    return feedback;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate mb-2">TalkTracks</h1>
        <p className="text-slate-600">Practice interview responses and self-presentation</p>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-boxed mb-6">
        <button 
          className={`tab ${activeTab === "templates" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("templates")}
        >
          Templates
        </button>
        <button 
          className={`tab ${activeTab === "practice" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("practice")}
        >
          Practice
        </button>
        <button 
          className={`tab ${activeTab === "saved" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("saved")}
        >
          Saved Responses
        </button>
      </div>

      {/* Templates Tab */}
      {activeTab === "templates" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow-sm border border-base-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate">{template.title}</h3>
                  <span className="badge badge-outline text-xs">{template.category}</span>
                </div>
                <button
                  onClick={() => handleTemplateSelect(template)}
                  className="btn btn-primary btn-sm"
                >
                  Practice
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate mb-2">Template</h4>
                  <div className="bg-base-100 p-3 rounded text-sm text-slate-600 font-mono">
                    {template.template}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate mb-2">Tips</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {template.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate mb-2">Example</h4>
                  <div className="bg-accent/10 p-3 rounded text-sm text-slate-600">
                    {template.examples[0]}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Practice Tab */}
      {activeTab === "practice" && selectedTemplate && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-base-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate">{selectedTemplate.title}</h2>
              <button
                onClick={() => setActiveTab("templates")}
                className="btn btn-outline btn-sm"
              >
                Back to Templates
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Template Reference */}
              <div>
                <h3 className="font-medium text-slate mb-3">Template Reference</h3>
                <div className="bg-base-100 p-4 rounded text-sm text-slate-600 font-mono mb-4">
                  {selectedTemplate.template}
                </div>
                
                <h4 className="font-medium text-slate mb-2">Tips</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  {selectedTemplate.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Practice Area */}
              <div>
                <h3 className="font-medium text-slate mb-3">Your Response</h3>
                <textarea
                  className="textarea textarea-bordered w-full h-48"
                  placeholder="Write your response here..."
                  value={userResponses[selectedTemplate.id] || ""}
                  onChange={(e) => handleResponseChange(selectedTemplate.id, e.target.value)}
                />
                
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleSaveResponse(selectedTemplate.id)}
                    className="btn btn-primary btn-sm"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Save Response
                  </button>
                  <button
                    onClick={() => handleCopyResponse(userResponses[selectedTemplate.id] || "")}
                    className="btn btn-outline btn-sm"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </button>
                </div>
                
                {/* AI Feedback */}
                {userResponses[selectedTemplate.id] && (
                  <div className="mt-6 p-4 bg-base-100 rounded">
                    <h4 className="font-medium text-slate mb-3">AI Feedback</h4>
                    {(() => {
                      const feedback = getFeedback(userResponses[selectedTemplate.id], selectedTemplate);
                      return (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600">Score:</span>
                            <div className="badge badge-primary">{feedback.score}/100</div>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-success mb-1">Strengths</h5>
                            <ul className="text-sm text-slate-600 space-y-1">
                              {feedback.strengths.map((strength, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <ThumbsUp className="w-3 h-3 text-success" />
                                  {strength}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-warning mb-1">Suggestions</h5>
                            <ul className="text-sm text-slate-600 space-y-1">
                              {feedback.suggestions.map((suggestion, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <ThumbsDown className="w-3 h-3 text-warning" />
                                  {suggestion}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Saved Responses Tab */}
      {activeTab === "saved" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate">Saved Responses</h2>
            <button
              onClick={() => setShowAddResponse(true)}
              className="btn btn-primary btn-sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Response
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-base-200 p-6 text-center">
            <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate mb-2">No saved responses yet</h3>
            <p className="text-slate-600">Practice with templates and save your responses to build your personal library.</p>
          </div>
        </div>
      )}

      {/* Add Response Modal */}
      {showAddResponse && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Add Custom Response</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Response title"
                className="input input-bordered w-full"
              />
              <select className="select select-bordered w-full">
                <option value="">Select Category</option>
                <option value="Introduction">Introduction</option>
                <option value="Value Proposition">Value Proposition</option>
                <option value="Networking">Networking</option>
                <option value="Self-Assessment">Self-Assessment</option>
              </select>
              <textarea
                placeholder="Your response"
                className="textarea textarea-bordered w-full"
                rows="6"
              />
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowAddResponse(false)}>Cancel</button>
              <button className="btn btn-primary">Save Response</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TalkTracks; 