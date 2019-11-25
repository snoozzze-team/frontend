import React, { useEffect, useContext, useState } from "react"
import jwt from "jwt-decode"
import { getToken } from "../utils/axiosWithAuth"
import { UserContext } from "../contexts"
import Graph from "./Graph"
import Buttons from "./Buttons"
import SleepModal from "./SleepModal"
import SleepTable from "./SleepTable"
import SleepTime from "./SleepTime"
import styled from "styled-components"

const Welcome = styled.h1`
    text-align: center;
`

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
      {user && <Welcome>Welcome {user.username}</Welcome>}
      <Graph />
      <Buttons isAdding={isAdding} setIsAdding={setIsAdding}/>
      <SleepTime/>
      <SleepTable isAdding={isAdding} setIsAdding={setIsAdding}/>
    </div>
  )
}
