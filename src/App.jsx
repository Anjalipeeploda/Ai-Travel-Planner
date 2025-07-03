import './App.css'
import React, { useState } from 'react';
import Hero from './components/custom/Hero';

function App() {
  const [count,setCount] =useState(0)
  return (
  <>
      {/* Hero */}
      <Hero/>
      
    </>
  
  )
}

export default App;

