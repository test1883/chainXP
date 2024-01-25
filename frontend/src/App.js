import React, { useEffect, useState, FC } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import Navbar from './components/Navbar/Navbar'
import GameTab from './components/Main/Games/GameTab/GameTab'
import Settings from './views/Settings'



// Css files
import './assets/vendor/simple-datatables/style.css'
import './assets/vendor/remixicon/remixicon.css'
import './assets/vendor/quill/quill.bubble.css'
import './assets/vendor/quill/quill.snow.css'
import './assets/vendor/boxicons/css/boxicons.min.css'
import './assets/vendor/bootstrap-icons/bootstrap-icons.css'
import './assets/vendor/bootstrap/css/bootstrap.min.css'
import './assets/css/style.css'

// importing web3 instance




const App: React.FC = () => {
  
  return (
    <div className="">
      <Router>
        <Navbar />
        {/* <GameTab /> */}
        <main id="main" className="main">
          <section className="section dashboard">
            <div className="row">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/settings" element={<Settings />} />

              </Routes>
            </div>
          </section>
        </main>
       
      </Router>
    </div>
  )
}

export default App
