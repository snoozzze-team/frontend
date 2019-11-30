import React, { useState } from "react"
import { Route } from "react-router-dom"
import { UserContext } from "./contexts"
import PrivateRoute from './components/PrivateRoute'
import AuthModal from "./components/AuthModal"
import Dashboard from "./components/Dashboard"
import Navbar from './components/Navbar'

function App() {
  const [user, setUser] = useState()
  return (
    <UserContext.Provider value={{user, setUser}}>
      <div className="App">
        <Navbar/>
        <Route
          exact
          path="/login"
          render={props => <AuthModal {...props} isLogin/>}
        />
        <Route
          exact
          path="/signup"
          render={props => <AuthModal {...props} />}
        />
        <PrivateRoute exact path="/" component={Dashboard} />
      </div>
    </UserContext.Provider>
  )
}

export default App
