import React from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"

export default function AuthModal({ isLogin, ...props }) {
  const Style = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    div button {
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

  return (
    <Style>
      <div>
        <div>
          <NavLink to="/">
            <button disabled={isLogin}>Login</button>
          </NavLink>
          <NavLink to="/signup">
            <button disabled={!isLogin}>Signup</button>
          </NavLink>
        </div>
        {!isLogin ? <Register {...props} /> : <Login {...props} />}
      </div>
    </Style>
  )
}
