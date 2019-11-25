import React from "react"

import styled from "styled-components"


const Style = styled.div`
  width: 900px;
  // height: 200px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  box-sizing: content-box;
  margin: 0 auto;
  margin-top: 20px;
  border: solid #fff13a 4px;
  background: #40376e;
  padding: 10px;
  border-radius: 50px;
`

const Toggle = styled.button`
  color: #fff13a;
  background: #00272b;
  width: 300px;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #fff13a;
  border-radius: 10px;
`

function Button(props) {
  return (
    <Style>
      <div className="view">
        <Toggle onClick={() => props.setIsAdding(!props.isAdding)}>
          Start a Sleep Entry!
        </Toggle>
      </div>
    </Style>
  )
}

export default Button
