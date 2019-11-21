import React, { useState, useEffect } from "react"
import styled from "styled-components"
import DatePicker from "react-date-picker"

const Style = styled.div`

`

export default function TimePicker(props) {
  const [date, setDate] = useState(new Date())
  useEffect(() => {
    
  }, [])

  const handleChange = date => {
    setDate( date )
    props.onClick
      ? props.onClick(date)
      : console.log(
          "TimePicker.js: You need to pass a setting function as `onClick`"
        )
    console.log(date)
  }

  return (
    <Style>
      <DatePicker onChange={handleChange} value={date} />
    </Style>
  )
}
