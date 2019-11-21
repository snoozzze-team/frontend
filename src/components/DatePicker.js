import React, { useState, useEffect } from "react"
import styled from "styled-components"
import DatePicker from "react-date-picker"

const Style = styled.div`

`

export default function TimePicker(props) {
  const [date, setDate] = useState(new Date())
  useEffect(() => {
    props.onClick
      ? props.onClick(date)
      : console.log(
          "TimePicker.js: You need to pass a setting function as `onClick`"
        )
  }, [])

  const handleChange = date => {
    setDate( date )
    console.log(date)
  }

  return (
    <Style>
      <DatePicker onChange={handleChange} value={date} />
    </Style>
  )
}
