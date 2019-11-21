import React, { useState } from "react"
import { SignupUser, LoginUser } from "../utils/api"

export default function Register(props) {
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
      try {
        LoginUser({
          username: account.username,
          password: account.password
        })
        props.history.push("/dashboard")
      } catch (error) {
        const status = error.response && error.response.status
        setError(`${status}: ${error.response}`)
      }
    } catch (error) {
      const status = error.response && error.response.status
      setError(`${status}: ${error.response}`)
    }
  

  return (
    <form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      <br />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={account.email}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={account.username}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={account.password}
        onChange={handleChange}
        required
      />
      <br />
      <button>Sign Up!</button>
    </form>
  )
}
