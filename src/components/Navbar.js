import React from "react"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import Logo from "../assets/zzz-sleep-symbol.png"

const Style = styled.nav`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background: #00272b;
  border-bottom: 1px solid #40376e;
  .logo {
    font-size: 0.8rem;
    vertical-align: middle;
    font-family: "Varela Round", sans-serif;
    color: #d7d9ce;
    align-self: center;
    padding-left: 1rem;
    img {
      height: 1.5rem;
      vertical-align: middle;
    }
  }
  div {
    display: flex;
    button {
      margin: 1rem;
      padding: 0.5rem;
      border-radius: 5px;
      border: none;
      align-self: center;
      background-color: #fff13a;
    }
  }
`

function Navbar(props) {
  const handleClick = () => {
    localStorage.removeItem("token")
    props.history.push("/")
  }

  return (
    <Style>
      <div className="logo">
        <h1>
          Snoo
          <img src={Logo} alt="Logo" />e
        </h1>
      </div>
      <div>
        {localStorage.getItem("token") && (
          <button onClick={handleClick}>Logout</button>
        )}
      </div>
    </Style>
  )
}

export default withRouter(Navbar)
