import React from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"

export default function AuthModal({ isLogin, ...props }) {
  const Style = styled.div`
    position: fixed;
    top: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background: rgb(0, 0, 0, 0.5);

    > div {
      border-radius: 5px;
      background: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50%;
      min-width: 300px;
      margin: 20% auto;
      padding-bottom: 3rem;
    }
    a {
      :first-child {
        border-top-left-radius: 5px;
        button {
          border-top-left-radius: 5px;
        }
      }
      :last-child {
        border-top-right-radius: 5px;
        button {
            border-top-right-radius: 5px;
          }
      }
      }
    }
    div button {
      border: none;
      background-color: lightgray;
      color: black;
      :disabled {
        background-color: white;
        border-color: black;
        color: black;
        border-bottom: none;
        :first-child {
          border-top-left-radius: 5px;
        }
        :last-child {
          border-top-right-radius: 5px;
        }
      }
    }
    > div {
      display: flex;
      flex-direction: column;
      > div {
        width: 100%;
        button {
          width: 50%;
          padding: 1rem;
        }
      }
      form {
        input,
        button {
          box-sizing: border-box;
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem;
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
