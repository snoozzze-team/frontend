import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { SleepContext } from "../contexts"
import { AddSleepEntry } from "../utils/api"
import {StartSleep, Asleep, WakeUp} from './SleepState'

const Style = styled.div`
  position: fixed;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.5);
  > div {
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    min-width: 300px;
    margin: 20% auto;
    padding-bottom: 3rem ;
    border-radius: 5px;
    > h1 {
      cursor: pointer;
      align-self: flex-end;
      margin-top: 2rem;
      margin-right: 3rem;
    }
    > div {
      display: flex;
      align-items: center;
    }
    > button {
      width: 50%;
    }
  }
`

export default function SleepModal(props) {
  const [sleepState, setSleepState] = useState("goingtosleep")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [start, setStart] = useState()
  const [end, setEnd] = useState()
  const [mood, setMood] = useState({
    duringDay: "",
    beforeSleep: "",
    afterSleep: ""
  })
  const [sleepEntry, setSleepEntry] = useState({
    userId: props.userId,
    dateTimeFrom: "",
    dateTimeTo: "",
    feels: "",
    notes: "placeholder"
  })

  useEffect(() => {
    setSleepEntry(entry => ({
      ...entry,
      feels: Math.round(
        (mood.duringDay + mood.beforeSleep + mood.afterSleep) / 3
      )
    }))
  }, [mood])

  useEffect(() => {
    setSleepEntry(entry => ({
      ...entry,
      dateTimeFrom: start
    }))
  }, [start])

  useEffect(() => {
    setSleepEntry(entry => ({
      ...entry,
      dateTimeTo: end
    }))
  }, [end])

  const saveEntry = async () => {
    setLoading(true)
    try {
      await AddSleepEntry(sleepEntry)
      setLoading(false)
      props.setIsAdding(false)
    } catch (error) {
      setLoading(false)
      setError(error.response)
    }
  }
  return (
    <SleepContext.Provider
      value={{ start, setStart, end, setEnd, mood, setMood }}
    >
      <Style>
        <div>
          <h1 onClick={() => props.setIsAdding(false)}>X</h1>
          {error && <div>{error}</div>}
          {loading && <div>Loading...</div>}
          {!loading && sleepState === "goingtosleep" && (
            <StartSleep setSleepState={setSleepState} />
          )}
          {!loading && sleepState === "sleeping" && (
            <Asleep setSleepState={setSleepState} />
          )}
          {!loading && sleepState === "wakeup" && (
            <WakeUp saveEntry={saveEntry} />
          )}
        </div>
      </Style>
    </SleepContext.Provider>
  )
}
