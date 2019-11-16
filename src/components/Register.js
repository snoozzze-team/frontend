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
    setAccount({ ...account, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await SignupUser(account)
      if (res.status === 200) {
        try {
          const data = await LoginUser({
            usernmae: account.username,
            password: account.password
          })
          setToken(data.token)
        } catch (error) {
          const status = error.response && error.response.status
          setError(`${status}: ${error.response}`)
        }
      }
    } catch (error) {
      const status = error.response && error.response.status
      setError(`${status}: ${error.response}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}<br/>
      <input
        type="email"
        name="Email"
        placeholder="email"
        value={account.email}
        onChange={handleChange}
      /><br/>
      <input
        type="text"
        name="Username"
        placeholder="username"
        value={account.username}
        onChange={handleChange}
      /><br/>
      <input
        type="password"
        name="Password"
        placeholder="password"
        value={account.password}
        onChange={handleChange}
      /><br/>
      <button>Sign Up!</button>
    </form>
  )
}
