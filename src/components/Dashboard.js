import React, { useEffect, useContext, useState } from "react"
import jwt from "jwt-decode"
import { getToken } from "../utils/axiosWithAuth"
import { SleepContext, UserContext } from "../contexts"
import Graph from "./Graph"
import Buttons from "./Buttons"
import SleepModal from "./SleepModal"
import SleepTable from "./SleepTable"
import SleepTime from "./SleepTime"
import styled from "styled-components"
import axiosWithAuth from "../utils/axiosWithAuth"

const Welcome = styled.h1`
    text-align: center;
`

export default function Dashboard() {
  const { user, setUser } = useContext(UserContext)
  const [isAdding, setIsAdding] = useState(false)
  const [sleepLog, setSleepLog] = useState([])

  useEffect(() => {
    setUser(jwt(getToken()))
  }, [setUser])
  console.log(user)

  useEffect(()=>{
    axiosWithAuth().get(`/api/users/sleepdata`)
        .then(res=>
           setSleepLog(res.data)
            )
        .catch(err=>
            console.log(err.response)
            )
  }, [])

  return (
    <SleepContext.Provider value={{sleepLog, setSleepLog}}>
      <div>
        {isAdding && <SleepModal setIsAdding={setIsAdding} userId={user.id}/>}
        {user && <Welcome>Welcome {user.username}</Welcome>}
        <Graph />
        <Buttons isAdding={isAdding} setIsAdding={setIsAdding}/>
        <SleepTime/>
        <SleepTable isAdding={isAdding} setIsAdding={setIsAdding}/>
      </div>
    </SleepContext.Provider>
  )
}
