import React, { useEffect, useContext, useState } from "react"
import jwt from "jwt-decode"
import { getToken } from "../utils/axiosWithAuth"
import { UserContext } from "../contexts"
import Graph from "./Graph"
import Buttons from "./Input-Sleep"
import SleepModal from './SleepModal'
import SleepTable from './SleepTable'

export default function Dashboard() {
  const { user, setUser } = useContext(UserContext)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    setUser(jwt(getToken()))
  }, [setUser])
  console.log(user)

  return (
    <div>
      {isAdding && <SleepModal setIsAdding={setIsAdding} userId={user.id}/>}
      {user && <h1>Welcome {user.username}</h1>}
      <Graph />
      <Buttons />
      <SleepTable/>
      <SleepModal/>
    </div>
  )
}
