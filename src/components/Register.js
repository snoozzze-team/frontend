import React, { useState } from "react"

export default function Register() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    email: ""
  })

  const onChange = () => {}

  const onSubmit = () => {}

  return (
    <form onSubmit={handleSubmit}>
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
