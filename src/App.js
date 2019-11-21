import React, { useState } from "react"
import { Route } from "react-router-dom"
import { UserContext } from "./contexts"
import PrivateRoute from './components/PrivateRoute'
import AuthModal from "./components/AuthModal"
import Dashboard from "./components/Dashboard"

function App() {
  const [userId, setUserId] = useState()
  return (
    <UserContext.Provider value={(userId, setUserId)}>
      <div className="App">
        <Route
          exact
          path="/"
          render={props => <AuthModal {...props} isLogin/>}
        />
        <Route
          exact
          path="/signup"
          render={props => <AuthModal {...props} />}
        />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </div>
    </UserContext.Provider>
  )
}

export default App
