import React, {useState, useEffect} from "react"

import styled from "styled-components"

import axiosWithAuth from "../utils/axiosWithAuth"
import dayjs from "dayjs"

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

const initialLog = {

}

function SleepTable (props) {
    const [sleepLog, setSleepLog] = useState([])
    const [editing, setEditing] = useState(false);
    const [logToEdit, setLogToEdit] = useState({
        id: "",
        dateTimeFrom: "",
        dateTimeTo: "",
        feels: "",
        notes:""
    });
    const [newMood, setNewMood] = useState({})

    const editLog = log => {
        setEditing(true);
        setLogToEdit(log);
      };

    useEffect(()=>{
        axiosWithAuth().get(`/api/users/sleepdata`)
            .then(res=>
               setSleepLog(res.data)
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


    const updateSleepEntry = e =>{
        e.preventDefault()
        console.log(logToEdit)
        axiosWithAuth().put(`/api/users/sleepdata/${logToEdit.id}`, logToEdit)
            .then(res=> {
                console.log(res)
                setSleepLog([...sleepLog.filter(sleep=>sleep.id !== res.data.id), res.data])
                setEditing(false)
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
                        <th>Feeling</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                   
                    
                    {sleepLog.map(log => (
                        <tr key={log.id}>
                            <td>{dayjs(log.dateTimeFrom).format('MM/DD/YYYY')}</td>
                            <td>{(dayjs(log.dateTimeTo).diff(dayjs(log.dateTimeFrom), "hour"))}</td>
                            {/* <td>{log.Sleepscore || 'Not Available'}</td> */}
                            <td>{log.feels}</td>
                            <td>
                                <button onClick={(e) => editLog(log)}>Edit</button>
                                
                                
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
            {editing && (
                        
                        <form onSubmit={updateSleepEntry}>
                            <label>Update Your Mood</label>
                            <input
                                placeholder="Mood"
                                type="text"
                                name="feels"
                                value={logToEdit.feels}
                                onChange={e =>
                                    setLogToEdit({...logToEdit, feels: e.target.value })    
                                }
                            />
                            
                           
                            <button type="submit">Submit</button>
                            <button onClick={()=> setEditing(false)}>Cancel</button>
                        </form>
                        
                    )}
        </SleepTableStyle> 
    )
}

export default SleepTable