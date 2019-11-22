import React, { useState, useEffect } from "react"
import axios from "../utils/axiosWithAuth"
import dayjs from "dayjs"

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
    <div>
      {!hasEnoughEntries && <p>Doesn't have enough entries!</p>}
      {hasEnoughEntries && (
        <p>{`Your optimal sleep time is ${optimal} hours`}</p>
      )}
    </div>
  )
}
