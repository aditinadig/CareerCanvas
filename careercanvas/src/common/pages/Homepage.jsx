import React from 'react';

const Homepage = () => {
  return (
    <div className="min-h-screen px-6 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-ultra-violet mb-2">Welcome to CareerCanvas</h1>
        <p className="text-lg text-slate-700">
          Discover your path. Track your growth. Build your future.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Pathfinder */}
        <div className="card bg-white shadow-md p-6 border border-base-300">
          <h2 className="text-xl font-semibold text-powderviolet mb-2">Pathfinder</h2>
          <p className="mb-4 text-sm text-slate-600">
            Get career recommendations based on your skills.
          </p>
          <button className="btn btn-primary">Find Roles</button>
        </div>

        {/* RouteMap */}
        <div className="card bg-white shadow-md p-6 border border-base-300">
          <h2 className="text-xl font-semibold text-powderviolet mb-2">RouteMap</h2>
          <p className="mb-4 text-sm text-slate-600">
            Explore how your current role leads to future opportunities.
          </p>
          <button className="btn btn-secondary">View Map</button>
        </div>

        {/* GrowthTracker */}
        <div className="card bg-white shadow-md p-6 border border-base-300">
          <h2 className="text-xl font-semibold text-powderviolet mb-2">GrowthTracker</h2>
          <p className="mb-4 text-sm text-slate-600">
            Log your learning and set career goals.
          </p>
          <button className="btn btn-accent text-slate hover:brightness-90">Get Started</button>
        </div>

        {/* FlashDeck */}
        <div className="card bg-white shadow-md p-6 border border-base-300">
          <h2 className="text-xl font-semibold text-powderviolet mb-2">FlashDeck</h2>
          <p className="mb-4 text-sm text-slate-600">
            Practice skill-specific flashcards for your dream role.
          </p>
          <button className="btn bg-pear text-slate hover:brightness-90">View Deck</button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;