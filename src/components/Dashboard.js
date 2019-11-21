import React, { useState, useEffect, useContext } from "react"
import jwt from "jwt-decode"
import { getToken } from "../utils/axiosWithAuth"
import { UserContext} from '../contexts'
import Graph from "./Graph"
import Buttons from "./Input-Sleep"
import SleepModal from './SleepModal'

export default function Dashboard() {
  const {user, setUser} = useContext(UserContext)

  useEffect(() => {
    setUser(jwt(getToken()))
  }, [])
  console.log(user)

  return (
    <div>
        { user && <h1>Welcome {user.username}</h1>}
      <Graph />
      <Buttons />
      <SleepModal/>
    </div>
  )
}
