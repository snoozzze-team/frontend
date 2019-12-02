import React, { useState } from "react"
import { LoginUser } from "../utils/api"

export default function Login(props) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })
  const [error, setError] = useState()

  const handleChange = (e) => {
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await LoginUser(credentials)
      props.history.push("/")
    } catch (error) {
      const status = error.response && error.response.status
      switch (status) {
        case 401:
          setError("Incorrect email and/or password!")
          break
        default:
          setError(error.response)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
        {error && <div>{error}</div>}<br/>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={credentials.username}
        onChange={handleChange}
        required
      /><br/>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        required
      /><br/>
      <button>Login</button>
    </form>
  )
}
