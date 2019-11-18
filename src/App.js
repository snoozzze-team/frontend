import React, { useState } from "react"
import AuthModal from "./components/AuthModal"
import { UserContext } from "./contexts"

function App() {
  const [user, setUser] = useState()
  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <AuthModal />
      </div>
    </UserContext.Provider>
  )
}

export default App
