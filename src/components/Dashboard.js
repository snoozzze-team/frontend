import React, { useEffect, useContext, useState } from "react"
import jwt from "jwt-decode"
import { getToken } from "../utils/axiosWithAuth"
import { UserContext } from "../contexts"
import Graph from "./Graph"
import Buttons from "./Buttons"
import SleepModal from "./SleepModal"
import SleepTable from "./SleepTable"
import SleepTime from "./SleepTime"

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
      <Buttons isAdding={isAdding} setIsAdding={setIsAdding}/>
      <SleepTime/>
      <SleepTable isAdding={isAdding} setIsAdding={setIsAdding}/>
    </div>
  )
}
