import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import dayjs from "dayjs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import DatePicker from "react-date-picker"
import { SleepContext } from "../contexts"

const Style = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  padding: 1rem;
  .time {
    display: flex;
    align-items: center;
    > div {
      display: flex;
      flex-direction: column;
    }
    input {
      max-width: 2rem;
    }
  }
`

export default function TimePicker({ starting }) {
  const { setStart, setEnd } = useContext(SleepContext)
  const [date, setDate] = useState(new Date())

  const [time, setTime] = useState({
    hour: dayjs().format("HH"),
    minute: dayjs().format("mm"),
    meridiem: dayjs().format("A"),
    "12hour": dayjs().format("hh")
  })

  useEffect(() => {
    const yearMonthDay = dayjs(date).format("YYYY-MM-DD")
    const twentyfourhours = `${time.hour}:${time.minute}`
    const completeDate = `${yearMonthDay}T${twentyfourhours}`
    console.log(completeDate)
    starting ? setStart(completeDate) : setEnd(completeDate)
    // eslint-disable-next-line
  }, [time, date])

  useEffect(() => {
    if (time.hour >= 12) {
      setTime(currentTime => {
        return { ...currentTime, "12hour": "12", meridiem: "PM" }
      })
      if (time.hour > 12) {
        setTime(currentTime => {
          return {
            ...time,
            "12hour": `${
              time.hour - 12 < 10
                ? `0${parseInt(time.hour) - 12}`
                : `${parseInt(time.hour) - 12}`
            }`,
            meridiem: "PM"
          }
        })
      }
    } else if (time.hour < 12) {
      if (time.hour === "00") {
        setTime(currentTime => {
          return { ...currentTime, "12hour": "12", meridiem: "AM" }
        })
      } else {
        setTime(currentTime => {
          return { ...currentTime, "12hour": time.hour, meridiem: "AM" }
        })
      }
    }
    // eslint-disable-next-line
  }, [time.hour])

  const handleDateChange = date => {
    setDate(date)
  }

  const handleChange = e => {
    setTime({ ...time, [e.target.name]: e.target.value })
  }

  const incrementTime = part => {
    const incrementedTime = parseInt(time[part]) + 1

    if (part === "hour") {
      if (incrementedTime <= 23) {
        if (incrementedTime < 10) {
          setTime({ ...time, [part]: `0${incrementedTime}` })
        } else {
          setTime({ ...time, [part]: incrementedTime })
        }
      } else {
        setTime({ ...time, [part]: "00" })
      }
    }
    if (part === "minute") {
      if (incrementedTime <= 59) {
        if (incrementedTime < 10) {
          setTime({ ...time, [part]: `0${incrementedTime}` })
        } else {
          setTime({ ...time, [part]: incrementedTime })
        }
      } else {
        setTime({
          ...time,
          [part]: "00",
          hour:
            time.hour < 23
              ? time.hour < 10
                ? `0${parseInt(time.hour) + 1}`
                : `${parseInt(time.hour) + 1}`
              : `00`
        })
      }
    }
  }

  const decrementTime = part => {
    const decrementedTime = parseInt(time[part]) - 1
    if (part === "hour") {
      if (decrementedTime >= 0) {
        if (decrementedTime < 10) {
          setTime({ ...time, [part]: `0${decrementedTime}` })
        } else {
          setTime({ ...time, [part]: decrementedTime })
        }
      } else {
        setTime({ ...time, [part]: "23" })
      }
    }

    if (part === "minute") {
      if (decrementedTime > 0) {
        if (decrementedTime < 10) {
          setTime({ ...time, [part]: `0${decrementedTime}` })
        } else {
          setTime({ ...time, [part]: decrementedTime })
        }
      } else {
        setTime({
          ...time,
          [part]: "59",
          hour:
            time.hour > 0
              ? time.hour < 10
                ? `0${parseInt(time.hour) - 1}`
                : `${parseInt(time.hour) - 1}`
              : `23`
        })
      }
    }
  }

  return (
    <Style>
      <div className="date">
        <DatePicker onChange={handleDateChange} value={date} />
      </div>
      <div className="time">
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
            value={time["12hour"]}
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
        <span name="meridiem">{time.meridiem}</span>
      </div>
    </Style>
  )
}
