import React, {useState} from "react"

import styled from "styled-components"

import axiosWithAuth from "../utils/axiosWithAuth"

//Styled Components



const SleepTableStyle = styled.div`
  color: #040404;
  width: 1000px;
  text-align: center;
  margin: 0 auto;

  tr {
    border: 3px #040404 solid;
  }
    table {
    width: 100%;
    text-align: center;
    justify-content: center;
    border: 3px #040404 solid;
    
  
  
  th {
    color: #40376E ;
    background-color: #D7D9CE;
  }
}
`


//SleepTable React Component

function SleepTable (props) {
    const [sleepLog, setSleepLog] = useState([{
        userId: '4',
        dateTimeFrom: '2019-10-22T23:00',
        dateTimeTo: '2019-10-23T08:00',
        feels: '4',
        notes: 'Slept Great -Taran'
    }])


    axiosWithAuth().get("/api/users/sleepdata")
        .then(res=>
            console.log(res)
            // setSleepLog(res)
            )
        .catch(err=>
            console.log(err.response)
            )


    
    return (
       
        //TO-DO - Create filter to filter by User ID so that table only shows logs for the logged in User ID
        
        <SleepTableStyle>
            <h1>Sleep Table</h1>
            <table>
                <tbody>
                    
                    <tr>
                        <th>Date</th>
                        <th>Hours Slept</th>
                        <th>Sleep Score</th>
                        <th>Update</th>
                    </tr>
                   

                    {sleepLog.map(log => (
                        <tr>
                            <td>{log.feels}</td>
                            <td>{log.dateTimeFrom - log.dateTimeTo}</td>
                    <td>{log.Sleepscore || 'Not Available'}</td>
                            <td>
                                <button>Edit</button>
                                <span> X </span>
                            </td>
                        </tr>
                    ))}
                
                </tbody>
            </table>
        </SleepTableStyle>
       
    )
}

export default SleepTable