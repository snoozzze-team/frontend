import React, {useState, useEffect} from "react"

import styled from "styled-components"

import axiosWithAuth from "../utils/axiosWithAuth"

import api from '../utils/axiosWithAuth'

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
        id: 1,
        userId: '4',
        dateTimeFrom: '2019-10-22T23:00',
        dateTimeTo: '2019-10-23T08:00',
        feels: '4',
        notes: 'Slept Great -Taran'
    }])

    const [editing, setEditing] = useState(false);
    const [logToEdit, setLogToEdit] = useState({});
    const [newTime, setNewTime] = useState(0)
    const [newMood, setNewMood] = useState({})

    const editLog = log => {
        setEditing(true);
        setLogToEdit(log);
      };

    useEffect(()=>{
        axiosWithAuth().get(`/api/users/sleepdata`)
            .then(res=>
                console.log(res)
                // setSleepLog(res.data)
                )
            .catch(err=>
                console.log(err.response)
                )
    }, [])


    const deleteSleepEntry = sleepEntry =>{
        axiosWithAuth().delete(`/api/users/sleepdata/${sleepEntry.id}`)
            .then(res=> {
                console.log(res)
                setSleepLog(sleepLog.filter(sleep=>sleep.id !== sleepEntry.id))
            })
            .catch(err=>{
                console.log(err)
            })
    }


    const updateSleepEntry = sleepEntry =>{
        axiosWithAuth().put(`/api/users/sleepdata/${sleepEntry.id}`, sleepEntry)
            .then(res=> {
                console.log(res)
                setSleepLog(sleepLog.filter(sleep=>sleep.id !== sleepEntry.id))
            })
            .catch(err=>{
                console.log(err)
            })
    }

    
    return (
        <SleepTableStyle>
            <h1>Sleep Table</h1>
            <table>
                <tbody>
                    
                    <tr>
                        <th>Date</th>
                        <th>Hours Slept</th>
                        <th>Sleep Score</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                   

                    {sleepLog.map(log => (
                        <tr>
                            <td>{log.feels}</td>
                            <td>{log.dateTimeFrom - log.dateTimeTo}</td>
                            <td>{log.Sleepscore || 'Not Available'}</td>
                            <td>
                                <button>Edit</button>
                                {/* {editing && (
                                    // <form onSubmit={saveEdit}>
                                    //     {/* <input
                                    //         placeholder="time slept"
                                    //         type="text"
                                    //         name="timeSlept"
                                    //         value={}
                                    //         >
                                    //     </input> */}
                                    {/* // </form> */}
                                
                            </td>
                            <td>
                                <span onClick={e=>{
                                    e.stopPropagation();
                                    deleteSleepEntry(log)
                                }}> X </span>
                            </td>
                        </tr>
                    ))}
                
                </tbody>
            </table>
        </SleepTableStyle>
       
    )
}

export default SleepTable