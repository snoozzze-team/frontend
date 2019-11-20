import React, { PureComponent, useEffect, useState } from "react";

import axios from "axios";
import styled from 'styled-components';



import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, } from 'recharts';

 
  const WrapperDiv = styled.div`
      width: 900px;
      height: 500px;
      display: flex;
      justify-content: center;
      flex-direction:column;
      box-sizing: content-box;
      margin: 0 auto;
      border: solid #fff13a 4px;
      background: #40376e;
      padding: 10px;
      border-radius: 50px;
`;

const StyledHeading = styled.h2`
      font-size: 42px;
      color: #d7d9ce;
      text-align: center;
`;

const data = [
  {
    name: '1 Day', Hour: 1,
  },
  {
    name: '2 Day', Hour: 3,
  },
  {
    name: '3 Day', Hour: 4,
  },
  {
    name: '4 Day', Hour: 12,
  },
  {
    name: '5 Day', Hour: 8,
  },
  { 
    name: '6 Day', Hour: 2,
  },
  {
    name: '7 Day', Hour: 3,
  }, 
 
];





export default class Example extends PureComponent {

    
  render() {
    return (
      <div className='body'>
      <WrapperDiv>
        <StyledHeading>Sleeping Tracker</StyledHeading>
          <LineChart
            width={900}
            height={400}
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid stroke="#D7D9CE" strokeDasharray="1 1 " />
              <XAxis stroke="#FFF13A" dataKey="name" >
                </XAxis>
              <YAxis stroke="#FFF13A"/>
              <Tooltip />
              <Legend  />
              <Line type="monotone"  dataKey="Hour" stroke="yellow"  />
          </LineChart>
          </WrapperDiv>
          </div>
    );
  }
}
