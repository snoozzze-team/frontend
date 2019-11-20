import React, { useState, useEffect } from "react"
import styled from "styled-components"

const Style = styled.div`
  display: flex;
  margin: 1rem;
  height: 64px;
  > div {
    margin: 0.5rem;
    display: flex;
    align-items: center;
  }
`

export default function TimePicker(props) {
  const [isAM, setIsAM] = useState()
  const [hours, setHours] = useState()
  const [minutes, setMinutes] = useState()
  useEffect(() => {
    props.onClick
      ? props.onClick(`${hours}:${minutes}${isAM ? "AM" : "PM"}`)
      : console.log(
          "TimePicker.js: You need to pass a setting function as `onClick`"
        )
  }, [isAM, hours, minutes])

  return (
    <Style>
      <input type="number" value={hours} onChange={}/>
      <input type="number" value={minutes} onChange={}/>
      <p onClick={}>{isAM ? "AM" : "PM"}</p>
    </Style>
  )
}
