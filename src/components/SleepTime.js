import React, { useState, useEffect } from "react"
import axios from "../utils/axiosWithAuth"
import dayjs from "dayjs"
import styled from "styled-components"


const Style = styled.div`
  width: 900px;
  // height: 200px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  box-sizing: content-box;
  margin: 0 auto;
  margin-top: 20px;
  border: solid #fff13a 4px;
  background: #40376e;
  padding: 10px;
  border-radius: 50px;
  font-size: 2rem;
  color: #D7D9CE;
`


export default function SleepTime() {
  const [hasEnoughEntries, setHasEnoughEntries] = useState(false)
  const [optimal, setOptimal] = useState("more")
  const [sleepData, setSleepData] = useState()
  let data = []

  useEffect(() => {
    axios()
      .get("/api/users/sleepdata")
      .then(res => {
        setSleepData(res.data)
      })
  }, [])

  useEffect(() => {
    sleepData && sleepData.length > 2 && setHasEnoughEntries(true)

    sleepData &&
      sleepData.map(entry => {
        data.push(
          dayjs(entry.dateTimeTo).diff(dayjs(entry.dateTimeFrom), "hour")
        )
      })
    setOptimal(
      data.length > 0 &&
        data.reduce((prev, curr) => {
          return (curr += prev)
        }) / data.length
    )
  }, [sleepData])

  return (
    <Style>
      {!hasEnoughEntries && <p>Doesn't have enough entries!</p>}
      {hasEnoughEntries && (
        <p>{`Your optimal sleep time is ${optimal} hours`}</p>
      )}
    </Style>
  )
}
