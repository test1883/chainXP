import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Navbar from "./components/Navbar/Navbar";
import GameTab from "./components/Main/Games/GameTab/GameTab";
import Settings from "./views/Settings";
import Quests from "./views/Quests";
import Games from "./components/Main/Games/Games";

// Css files
import "./assets/vendor/simple-datatables/style.css";
import "./assets/vendor/remixicon/remixicon.css";
import "./assets/vendor/quill/quill.bubble.css";
import "./assets/vendor/quill/quill.snow.css";
import "./assets/vendor/boxicons/css/boxicons.min.css";
import "./assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "./assets/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/css/style.css";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './config/config.js'

const queryClient = new QueryClient()

const App = () => {
  return (
    
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="">
          <Router>
            <Navbar />
            <GameTab />
            <main id="main" className="main">
              <section className="section dashboard">
                <div className="row">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/quests" element={<Quests />} />
                  </Routes>
                </div>
              </section>
            </main>
          </Router>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
