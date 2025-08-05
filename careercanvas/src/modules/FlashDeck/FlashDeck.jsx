import React, { useState } from "react";
import { BookOpen, RotateCcw, CheckCircle, XCircle, Plus, Filter, Shuffle } from "lucide-react";

const FlashDeck = () => {
  const [selectedRole, setSelectedRole] = useState("frontend");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState(new Set());
  const [reviewCards, setReviewCards] = useState(new Set());
  const [showAddCard, setShowAddCard] = useState(false);

  // Mock flashcard data
  const flashcardDecks = {
    frontend: {
      title: "Frontend Development",
      cards: [
        {
          id: 1,
          question: "What is the difference between let, const, and var in JavaScript?",
          answer: "let: block-scoped, can be reassigned; const: block-scoped, cannot be reassigned; var: function-scoped, can be reassigned and hoisted.",
          category: "JavaScript",
          difficulty: "Intermediate"
        },
        {
          id: 2,
          question: "Explain the concept of React Hooks",
          answer: "React Hooks are functions that allow you to use state and other React features in functional components. They start with 'use' and include useState, useEffect, useContext, etc.",
          category: "React",
          difficulty: "Intermediate"
        },
        {
          id: 3,
          question: "What is CSS Grid and how does it differ from Flexbox?",
          answer: "CSS Grid is a 2D layout system for creating grid-based layouts. Flexbox is 1D and focuses on content flow. Grid is better for overall page layouts, while Flexbox is better for component layouts.",
          category: "CSS",
          difficulty: "Advanced"
        },
        {
          id: 4,
          question: "What is the Virtual DOM in React?",
          answer: "The Virtual DOM is a lightweight copy of the actual DOM that React uses to optimize rendering. It allows React to batch updates and only update the real DOM when necessary.",
          category: "React",
          difficulty: "Advanced"
        },
        {
          id: 5,
          question: "How do you handle asynchronous operations in JavaScript?",
          answer: "Using Promises, async/await, or callbacks. Promises provide a cleaner way to handle async operations, while async/await makes async code look synchronous.",
          category: "JavaScript",
          difficulty: "Intermediate"
        }
      ]
    },
    ux: {
      title: "UX Design",
      cards: [
        {
          id: 6,
          question: "What is the difference between UX and UI design?",
          answer: "UX (User Experience) focuses on the overall experience and user journey. UI (User Interface) focuses on the visual design and interactive elements of the interface.",
          category: "Design Principles",
          difficulty: "Beginner"
        },
        {
          id: 7,
          question: "What are the key principles of user-centered design?",
          answer: "1. Understand users and their needs 2. Involve users throughout the design process 3. Test with real users 4. Iterate based on feedback 5. Focus on usability and accessibility.",
          category: "Design Principles",
          difficulty: "Intermediate"
        },
        {
          id: 8,
          question: "What is a user persona and why is it important?",
          answer: "A user persona is a fictional representation of your target user based on research. It helps designers understand user needs, goals, and behaviors to create better user experiences.",
          category: "User Research",
          difficulty: "Intermediate"
        }
      ]
    },
    product: {
      title: "Product Management",
      cards: [
        {
          id: 9,
          question: "What is the difference between a product roadmap and a project plan?",
          answer: "A product roadmap shows the strategic direction and vision over time. A project plan shows specific tasks, timelines, and deliverables for implementation.",
          category: "Strategy",
          difficulty: "Intermediate"
        },
        {
          id: 10,
          question: "How do you prioritize features in a product backlog?",
          answer: "Using frameworks like RICE (Reach, Impact, Confidence, Effort), MoSCoW (Must, Should, Could, Won't), or Value vs Effort matrix to evaluate features objectively.",
          category: "Prioritization",
          difficulty: "Advanced"
        }
      ]
    }
  };

  const currentDeck = flashcardDecks[selectedRole];
  const currentCard = currentDeck?.cards[currentCardIndex];

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    if (currentCardIndex < currentDeck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleShuffle = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const handleMastered = () => {
    setMasteredCards(prev => new Set([...prev, currentCard.id]));
    handleNextCard();
  };

  const handleReviewLater = () => {
    setReviewCards(prev => new Set([...prev, currentCard.id]));
    handleNextCard();
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const getProgress = () => {
    if (!currentDeck) return 0;
    return ((currentCardIndex + 1) / currentDeck.cards.length) * 100;
  };

  const getMasteredCount = () => {
    return masteredCards.size;
  };

  const getReviewCount = () => {
    return reviewCards.size;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate mb-2">FlashDeck</h1>
        <p className="text-slate-600">Learn skills through interactive flashcards</p>
      </div>

      {/* Role Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-base-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-slate mb-4">Select Role</h2>
        <div className="flex flex-wrap gap-3">
          {Object.keys(flashcardDecks).map((role) => (
            <button
              key={role}
              onClick={() => handleRoleChange(role)}
              className={`btn ${selectedRole === role ? 'btn-primary' : 'btn-outline'}`}
            >
              {flashcardDecks[role].title}
            </button>
          ))}
        </div>
      </div>

      {currentDeck && (
        <>
          {/* Progress Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-base-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Progress</p>
                  <p className="text-2xl font-bold text-slate">{Math.round(getProgress())}%</p>
                </div>
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-base-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Cards</p>
                  <p className="text-2xl font-bold text-slate">{currentDeck.cards.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-secondary" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-base-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Mastered</p>
                  <p className="text-2xl font-bold text-success">{getMasteredCount()}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-base-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Review</p>
                  <p className="text-2xl font-bold text-warning">{getReviewCount()}</p>
                </div>
                <RotateCcw className="w-8 h-8 text-warning" />
              </div>
            </div>
          </div>

          {/* Flashcard */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-white rounded-lg shadow-lg border border-base-200 overflow-hidden">
              {/* Card Header */}
              <div className="bg-primary text-primary-content p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{currentDeck.title}</h3>
                    <p className="text-sm opacity-90">
                      Card {currentCardIndex + 1} of {currentDeck.cards.length}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="badge badge-outline badge-sm">{currentCard.category}</span>
                    <span className="badge badge-outline badge-sm">{currentCard.difficulty}</span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8">
                <div 
                  className={`min-h-64 flex items-center justify-center cursor-pointer transition-all duration-500 ${
                    isFlipped ? 'transform rotate-y-180' : ''
                  }`}
                  onClick={handleCardFlip}
                >
                  <div className="text-center">
                    <h4 className="text-xl font-semibold text-slate mb-4">
                      {isFlipped ? 'Answer' : 'Question'}
                    </h4>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {isFlipped ? currentCard.answer : currentCard.question}
                    </p>
                    <p className="text-sm text-slate-500 mt-4">
                      Click to {isFlipped ? 'see question' : 'see answer'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="bg-base-100 p-4 border-t border-base-200">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={handlePreviousCard}
                      disabled={currentCardIndex === 0}
                      className="btn btn-outline btn-sm"
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNextCard}
                      disabled={currentCardIndex === currentDeck.cards.length - 1}
                      className="btn btn-outline btn-sm"
                    >
                      Next
                    </button>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleReviewLater}
                      className="btn btn-warning btn-sm"
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Review Later
                    </button>
                    <button
                      onClick={handleMastered}
                      className="btn btn-success btn-sm"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Mastered
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <progress 
                className="progress progress-primary w-full" 
                value={getProgress()} 
                max="100"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleShuffle}
              className="btn btn-secondary"
            >
              <Shuffle className="w-4 h-4 mr-1" />
              Shuffle Deck
            </button>
            <button
              onClick={() => setShowAddCard(true)}
              className="btn btn-primary"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Card
            </button>
          </div>
        </>
      )}

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Add New Flashcard</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Question"
                className="input input-bordered w-full"
              />
              <textarea
                placeholder="Answer"
                className="textarea textarea-bordered w-full"
                rows="4"
              />
              <select className="select select-bordered w-full">
                <option value="">Select Category</option>
                <option value="JavaScript">JavaScript</option>
                <option value="React">React</option>
                <option value="CSS">CSS</option>
                <option value="Design Principles">Design Principles</option>
                <option value="User Research">User Research</option>
              </select>
              <select className="select select-bordered w-full">
                <option value="">Select Difficulty</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowAddCard(false)}>Cancel</button>
              <button className="btn btn-primary">Add Card</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashDeck; 