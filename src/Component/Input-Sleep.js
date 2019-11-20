import React, {  useEffect, useState } from "react";

import axios from "axios";

import styled from 'styled-components';




const WrapperDiv = styled.div`
width: 900px;
// height: 200px;
display: flex;
justify-content: center;
flex-direction:row;
box-sizing: content-box;
margin:0 auto;
margin-top: 20px;
border: solid #fff13a 4px;
background: #40376e;
padding: 10px;
border-radius: 50px;
`;

const Button = styled.button`
color: #fff13a;
  background: #00272B;
  width: 300px;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #fff13a;
  border-radius: 10px;
 
`;




function BTN(props) {
    return (
        <WrapperDiv>
    <div className="view">
    <Button onClick={goSleep}>Going to Sleep</Button>
    <Button onClick={wakingUp}>Getting Up</Button>
  </div>
  </WrapperDiv>
);

function goSleep() {
  props.history.push('/goToSleep')
}
function wakingUp() {
    props.history.push('/wakingUp')
  }
}

  export default BTN


