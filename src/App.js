import React from "react";


import { Route } from 'react-router-dom';
import PureComponent from './Component/Graph';
import BTN from './Component/Input-Sleep';
function App() {
  return (
    <div className="App">
      <Route exact path="/dashboard" component={PureComponent}/>
      <Route exact path="/dashboard" component={BTN}/>
    </div>
  )
}

export default App
