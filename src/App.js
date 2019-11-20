import React, { useState } from "react"
import AuthModal from "./components/AuthModal"
import { UserContext } from "./contexts"



import { Route } from 'react-router-dom';
import PureComponent from './Component/Graph';
import BTN from './Component/Input-Sleep';
function App() {
  const [user, setUser] = useState()
  return (

    <UserContext.Provider value={user}>
      <div className="App">
        <AuthModal />
        <Route exact path="/dashboard" component={PureComponent}/>
      <Route exact path="/dashboard" component={BTN}/>
      </div>
    </UserContext.Provider>
  )
}

export default App
