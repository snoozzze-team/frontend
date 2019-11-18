import React, { useState } from "react"
import styled from "styled-components"
import Login from "./Login"
import Register from "./Register"

export default function AuthModal() {
  const Style = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    div > button {
      border: 1px solid gray;
      background-color: lightgray;
      color: darkgray;
      :disabled {
        background-color: white;
        border-color: black;
        color: black;
      }
    }
    > div {
      width: 300px;
      margin: 30% auto;
      display: flex;
      flex-direction: column;
      > div {
        button {
          width: 50%;
        }
      }
      form {
        input,
        button {
          box-sizing: border-box;
          width: 100%;
        }
        button {
          background-color: white;
          border: 1px solid black;
          color: black;
        }
      }
    }
  `

  const [isSignup, setIsSignup] = useState(false)
  return (
    <Style>
      <div>
        <div>
          <button
            onClick={() => setIsSignup(false)}
            disabled={isSignup === false}
          >
            Login
          </button>
          <button
            onClick={() => setIsSignup(true)}
            disabled={isSignup === true}
          >
            Signup
          </button>
        </div>
        {isSignup ? <Register /> : <Login />}
      </div>
    </Style>
  )
}