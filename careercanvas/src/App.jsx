import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./common/components/Layout";
import OnboardingQuiz from "./common/pages/OnboardingQuiz";
import Pathfinder from "./modules/Pathfinder/Pathfinder";
import RouteMap from "./modules/RouteMap/RouteMap";
import GrowthTracker from "./modules/GrowthTracker/GrowthTracker";
import FlashDeck from "./modules/FlashDeck/FlashDeck";
import TalkTracks from "./modules/TalkTracks/TalkTracks";
import Dashboard from "./common/pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-soft-gray">
        <Routes>
          <Route path="/" element={<OnboardingQuiz />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/pathfinder" element={<Layout><Pathfinder /></Layout>} />
          <Route path="/routemap" element={<Layout><RouteMap /></Layout>} />
          <Route path="/growth-tracker" element={<Layout><GrowthTracker /></Layout>} />
          <Route path="/flash-deck" element={<Layout><FlashDeck /></Layout>} />
          <Route path="/talk-tracks" element={<Layout><TalkTracks /></Layout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

