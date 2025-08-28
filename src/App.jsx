import React, { useState } from 'react'
import Hero from './components/Hero'
import AboutUS from './components/AboutUS'
import Debate from './components/Debate'
import Scrabble from './components/Scrabble'
import MUN from './components/MUN'
import Speech from './components/Speech'
import JoinUs from './components/JoinUs'
import Slogan from './components/Slogan'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Add a small delay before showing content for smooth transition
    setTimeout(() => {
      setContentVisible(true);
    }, 100);
  };

  return (
    <main>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <div 
        className={`transition-all duration-1000 ease-out ${
          contentVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
      >
        <Hero isLoading={isLoading} />
        <AboutUS />
        <Debate />
        <Scrabble />
        <MUN />
        <Speech />
        <JoinUs />
        <Slogan />
        <Footer />
      </div>
    </main>
  )
}

export default App
