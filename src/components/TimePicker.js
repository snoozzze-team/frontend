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
    span {
      cursor: pointer;
    }
  }
`

export default function TimePicker({ starting }) {
  const { setStart, setEnd } = useContext(SleepContext)
  const [date, setDate] = useState(new Date())

  const [time, setTime] = useState({
    hour: dayjs().format("hh"),
    minute: dayjs().format("mm"),
    meridiem: dayjs().format("A")
  })
  useEffect(() => {
    const yearMonthDay = dayjs(date).format("YYYY-MM-DD")
    const twentyfourhours =
      time.meridiem === "AM"
        ? time.hour + ":" + time.minute
        : parseInt(time.hour) + 12 + ":" + time.minute
    const completeDate = `${yearMonthDay}T${twentyfourhours}`
    starting ? setStart(completeDate) : setEnd(completeDate)
    // eslint-disable-next-line
  }, [time, date])

  const handleDateChange = date => {
    setDate(date)
  }

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
    }
  }

  const decrementTime = part => {
    const decrementedTime = parseInt(time[part]) - 1
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
        <span
          name="meridiem"
          onClick={() =>
            setTime({ ...time, meridiem: time.meridiem === "AM" ? "PM" : "AM" })
          }
        >
          {time.meridiem}
        </span>
      </div>
    </Style>
  )
}
