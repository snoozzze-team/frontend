import React, { useState, useEffect } from "react"
import jwt from "jwt-decode"
import { getToken } from "../utils/axiosWithAuth"
import Graph from "./Graph"
import Buttons from "./Input-Sleep"

export default function Dashboard() {
  const [user, setUser] = useState()

  useEffect(() => {
    setUser(jwt(getToken()))
  }, [])
  console.log(user)

  return (
    <div>
        { user && <h1>Welcome {user.username}</h1>}
      <Graph />
      <Buttons />
    </div>
  )
}
