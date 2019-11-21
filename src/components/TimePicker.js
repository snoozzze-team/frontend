import React, { useState, useEffect } from "react"
import styled from "styled-components"
import dayjs from "dayjs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons"

const Style = styled.div`
  display: flex;
  align-items: center;
  > div {
    display: flex;
    flex-direction: column;
    max-width: 3rem;
  }
`

export default function TimePicker({ onClick }) {
  const currentTime = dayjs()
  const [time, setTime] = useState({
    hour: dayjs(currentTime).format("h"),
    minute: dayjs(currentTime).format("mm"),
    meridiem: dayjs(currentTime).format("a")
  })
  useEffect(() => {
    onClick
      ? onClick(time)
      : console.log(
          "TimePicker.js: You need to pass a setting function as `onClick`"
        )
    // eslint-disable-next-line
  }, [])

  const handleChange = e => {
    setTime({ ...time, [e.target.name]: e.target.value })
  }

  const incrementTime = part => {
    const incrementedTime = parseInt(time[part]) + 1

    if (part === "hour" && incrementedTime <= 12) {
      setTime({ ...time, [part]: `${incrementedTime}` })
    } else if (part === "minute" && incrementedTime <= 59) {
      setTime({
        ...time,
        [part]:
          incrementedTime < 10 ? `0${incrementedTime}` : `${incrementedTime}`
      })
    } else if (part === "meridiem") {
      setTime({ ...time, [part]: time[part] === "am" ? "pm" : "am" })
    }
  }

  const decrementTime = part => {
    const decrementedTime = parseInt(time[part]) - 1
    console.log(decrementedTime)

    if (part === "hour" && decrementedTime !== 0) {
      setTime({ ...time, [part]: `${decrementedTime}` })
    }
    if (part === "minute" && decrementedTime !== -1) {
      setTime({
        ...time,
        [part]:
          decrementedTime < 10 ? `0${decrementedTime}` : `${decrementedTime}`
      })
    }
  }

  return (
    <Style>
      <div>
        <button onClick={() => incrementTime("hour")}>
          <FontAwesomeIcon color="gray" icon={faChevronUp} />
        </button>
        <input
          type="number"
          name="hour"
          min="1"
          max="12"
          onChange={handleChange}
          value={time.hour}
        />
        <button onClick={() => decrementTime("hour")}>
          <FontAwesomeIcon color="gray" icon={faChevronDown} />
        </button>
      </div>
      :
      <div>
        <button onClick={() => incrementTime("minute")}>
          <FontAwesomeIcon color="gray" icon={faChevronUp} />
        </button>
        <input
          type="number"
          name="minute"
          min="00"
          max="59"
          onChange={handleChange}
          value={time.minute}
        />
        <button onClick={() => decrementTime("minute")}>
          <FontAwesomeIcon color="gray" icon={faChevronDown} />
        </button>
      </div>
      <span name="meridiem" onClick={() => incrementTime("meridiem")}>
        {time.meridiem}
      </span>
    </Style>
  )
}
