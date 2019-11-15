import React, { useState } from "react"

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })

  const onChange = () => {}

  const onSubmit = () => {}

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
