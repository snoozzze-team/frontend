import React, { useState } from "react"
import { Route } from 'react-router-dom';

import AuthModal from "./components/AuthModal"
import { UserContext } from "./contexts"
import PureComponent from './components/Graph';
import BTN from './components/Input-Sleep';




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
