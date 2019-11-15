import React, { useState } from "react"
import { LoginUser, setToken } from "../utils/api"

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })
  const [error, setError] = useState()

  const onChange = () => {}

  const onSubmit = async e => {
    e.preventDefault()
    try {
      const data = await LoginUser(credentials)
      setToken(data.token)
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
      <input
        type="text"
        name="username"
        value={credentials.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
      />
      <button>Login</button>
    </form>
  )
}
