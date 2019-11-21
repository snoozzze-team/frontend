import React, { useState, useEffect } from "react"
import styled from "styled-components"
import DatePicker from "./DatePicker"
import TimePicker from "./TimePicker"
import Mood from "./Mood"
import zzz from "../assets/zzz.gif"

const Snooze = styled.div`
  background-image: url(${zzz});
  background-size: cover;
  height: 10rem;
  width: 10rem;
`

function StartSleep({ setSleepState }) {
  return (
    <div>
      <h3>How did you feel during the day?</h3>
      <Mood />

      <DatePicker />
      <TimePicker />
      <button onClick={() => setSleepState("sleeping")}>Start Sleep</button>
    </div>
  )
}

function Asleep({ setSleepState }) {
  return (
    <div>
      <Snooze />
      <button onClick={() => setSleepState("wakeup")}>Wake Up</button>
    </div>
  )
}

function WakeUp() {
  return (
    <div>
      <h3>Did you sleep well?</h3>
      <Mood />
      <DatePicker />
      <TimePicker />
      <button>Save Sleep Entry</button>
    </div>
  )
}

export default function SleepModal() {
  //startSleep is set to true when the 'start sleep' button is clicked
  const [sleepState, setSleepState] = useState("goingtosleep")
  //when startSleep is true, this modal will show the current sleep duration
  //endSleep is set to true when the 'end sleep' button is clicked
  //when endSleep is true,
  const [mood, setMood] = useState({
    duringDay: "",
    beforeSleep: "",
    afterSleep: ""
  })
  const [sleepEntry, setSleepEntry] = useState({
    dateTimeFrom: "",
    dateTimeTo: "",
    feels: "",
    notes: ""
  })

  return (
    <div>
      {sleepState === "goingtosleep" && <StartSleep setSleepState={setSleepState} />}
      {sleepState === "sleeping" && <Asleep setSleepState={setSleepState} />}
      {sleepState === "wakeup" && <WakeUp />}
    </div>
  )
}
