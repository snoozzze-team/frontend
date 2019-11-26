import React from 'react'
import styled from 'styled-components'
import TimePicker from "./TimePicker"
import Mood from "./Mood"
import zzz from "../assets/zzz.gif"

const SubStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
  }
  > button {
    width: 50%;
  }
`

const Snooze = styled.div`
  background-image: url(${zzz});
  background-size: cover;
  height: 10rem;
  width: 10rem;
`

export function StartSleep({ setSleepState }) {
  return (
    <SubStyle>
      <h3>Rate how you felt during the day.</h3>
      <Mood name="duringDay" />
      <h3>Rate how you feel right now.</h3>
      <Mood name="beforeSleep" />
      <TimePicker starting />
      <button onClick={() => setSleepState("sleeping")}>Start Sleep</button>
    </SubStyle>
  )
}

export function Asleep({ setSleepState }) {
  return (
    <SubStyle>
      <Snooze />
      <button onClick={() => setSleepState("wakeup")}>Wake Up</button>
    </SubStyle>
  )
}

export function WakeUp({ saveEntry }) {
  return (
    <SubStyle>
      <h3>Rate how well you slept.</h3>
      <Mood name="afterSleep" />
      <TimePicker />
      <button onClick={saveEntry}>Save Sleep Entry</button>
    </SubStyle>
  )
}

