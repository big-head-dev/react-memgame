import React, { useState } from 'react'

import MemoryGame1 from './features/memory1/MemoryGame'
import MemoryGame2 from './features/memory2/MemoryGame'
import MemoryGame3 from './features/memory3/MemoryGame'

function App() {
  const [selectedTab, setSelectedTab] = useState(0)

  const handleTabClick = (tabNum) => {
    setSelectedTab(tabNum)
  }

  return (
    <>
      <div>
        <ul>
          <li>
            <button onClick={() => handleTabClick(0)}>Memory Game #1 (all in one component)</button>
          </li>
          <li>
            <button onClick={() => handleTabClick(1)}>Memory Game #2 (components)</button>
          </li>
          <li>
            <button onClick={() => handleTabClick(2)}>Memory Game #3 (animation)</button>
          </li>
        </ul>
      </div>
      <div>
        <div className="tab" style={{ display: selectedTab == 0 ? 'block' : 'none' }}>
          <MemoryGame1 />
        </div>
        <div className="tab" style={{ display: selectedTab == 1 ? 'block' : 'none' }}>
          <MemoryGame2 />
        </div>
        <div className="tab" style={{ display: selectedTab == 2 ? 'block' : 'none' }}>
          <MemoryGame3 />
        </div>
      </div>
    </>
  )
}

export default App
