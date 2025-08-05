import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import Logo from "../components/Logo";

const OnboardingQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: "role",
      question: "What best describes your current situation?",
      options: [
        { value: "student", label: "I'm a student", description: "Looking to explore career options" },
        { value: "jobseeker", label: "I'm job hunting", description: "Actively seeking new opportunities" },
        { value: "employed", label: "I have a job", description: "Want to grow in my current role" },
        { value: "career_change", label: "Career changer", description: "Looking to switch industries" }
      ]
    },
    {
      id: "focus",
      question: "What's your primary focus right now?",
      options: [
        { value: "discover", label: "Discover options", description: "Find what careers match my skills" },
        { value: "learn", label: "Learn skills", description: "Build specific skills for my target role" },
        { value: "track", label: "Track progress", description: "Monitor my career development" },
        { value: "practice", label: "Practice interviews", description: "Prepare for job interviews" }
      ]
    }
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const getRecommendedModule = () => {
    const role = answers.role;
    const focus = answers.focus;

    if (role === "student" || role === "jobseeker" || focus === "discover") {
      return { path: "/pathfinder", name: "Pathfinder", description: "Find career paths that match your skills" };
    } else if (role === "employed" || focus === "track") {
      return { path: "/growth-tracker", name: "GrowthTracker", description: "Track your learning and set career goals" };
    } else if (focus === "learn") {
      return { path: "/flash-deck", name: "FlashDeck", description: "Learn skills through interactive flashcards" };
    } else if (focus === "practice") {
      return { path: "/talk-tracks", name: "TalkTracks", description: "Practice interview responses and self-presentation" };
    } else {
      return { path: "/dashboard", name: "Dashboard", description: "Get an overview of all CareerCanvas features" };
    }
  };

  const handleContinue = () => {
    const recommendation = getRecommendedModule();
    navigate(recommendation.path);
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-soft-gray flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Logo />
        </div>

        {/* Quiz Container */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {!showResult ? (
            <>
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-slate-500 mb-2">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-base-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <h2 className="text-2xl font-bold text-slate mb-6">{currentQ.question}</h2>

              {/* Options */}
              <div className="space-y-4">
                {currentQ.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(currentQ.id, option.value)}
                    className="w-full p-4 text-left border border-base-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-slate group-hover:text-primary transition-colors">
                          {option.label}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">{option.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            /* Results */
            <div className="text-center">
              <div className="mb-6">
                <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-slate mb-2">Perfect! Here's your starting point:</h2>
              </div>

              <div className="bg-accent/20 border border-accent rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-slate mb-2">
                  {getRecommendedModule().name}
                </h3>
                <p className="text-slate-600">{getRecommendedModule().description}</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleContinue}
                  className="btn btn-primary btn-lg w-full"
                >
                  Get Started
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="btn btn-outline w-full"
                >
                  Explore All Modules
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingQuiz; 