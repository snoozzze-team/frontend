import React, { useState } from "react"
import Login from "./Login"
import Register from "./Register"

export default function AuthModal() {
  const [isSignup, setIsSignup] = useState(false)
  return (
    <div className="App">
      
      <button onClick={() => setIsSignup(false)} disabled={isSignup === false}>
        Login
      </button>
      <button onClick={() => setIsSignup(true)} disabled={isSignup === true}>
        Signup
      </button>
      {isSignup ? <Register /> : <Login />}
    </div>
  )
}
