import React, { useState, useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMeh, faSmile, faLaugh } from "@fortawesome/free-regular-svg-icons"
import { faPoop } from "@fortawesome/free-solid-svg-icons"
import { SleepContext } from "../contexts"
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

export default function Mood(props) {
  const [isSelected, setIsSelected] = useState()
  const { mood, setMood } = useContext(SleepContext)
  
  const handleClick = rating => {
    setMood({ ...mood, [props.name]: rating })
    setIsSelected(rating)
  }

  return (
    <Style>
      <div onClick={() => handleClick(0)}>
        <FontAwesomeIcon
          size={isSelected === 0 ? "3x" : "2x"}
          color="brown"
          icon={faPoop}
        />
      </div>
      <div onClick={() => handleClick(1)}>
        <FontAwesomeIcon
          size={isSelected === 1 ? "3x" : "2x"}
          color="gray"
          icon={faMeh}
        />
      </div>
      <div onClick={() => handleClick(2)}>
        <FontAwesomeIcon
          size={isSelected === 2 ? "3x" : "2x"}
          color="orange"
          icon={faSmile}
        />
      </div>
      <div onClick={() => handleClick(3)}>
        <FontAwesomeIcon
          size={isSelected === 3 ? "3x" : "2x"}
          color="green"
          icon={faLaugh}
        />
      </div>
    </Style>
  )
}
