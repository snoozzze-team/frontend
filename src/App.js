import React, { useState } from "react"
import { Route } from "react-router-dom"
import PrivateRoute from './components/PrivateRoute'
import AuthModal from "./components/AuthModal"
import { UserContext } from "./contexts"
import PureComponent from "./components/Graph"
import BTN from "./components/Input-Sleep"

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
        <PrivateRoute exact path="/dashboard" component={PureComponent} />
        <PrivateRoute exact path="/dashboard" component={BTN} />
      </div>
    </UserContext.Provider>
  )
}

export default App
