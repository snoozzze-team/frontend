import React, { useState } from "react"
import { SignupUser, LoginUser, setToken } from "../utils/api"

export default function Register() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    email: ""
  })

  const [error, setError] = useState()

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const data = await SignupUser(credentials)
      setToken(data.token)
    } catch (error) {
      const status = error.response && error.response.status
      setError(`${status}: ${error.response}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      <input
        type="email"
        name="email"
        value={account.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="username"
        value={account.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={account.password}
        onChange={handleChange}
      />
      <button>Sign Up!</button>
    </form>
  )
}
