import React, {useState , useContext} from "react"

import styled from "styled-components"

import axiosWithAuth from "../utils/axiosWithAuth"
import dayjs from "dayjs"

import {SleepContext, UserContext} from "../contexts/index"

//Styled Components

const Style = styled.div`
  width: 900px;
 
  justify-content: center;
  flex-direction: row;
  box-sizing: content-box;
  margin: 0 auto;
  margin-top: 20px;
  border: solid #fff13a 4px;
  background: #40376e;
  padding: 10px;
  border-radius: 50px;
  
  color: #D7D9CE;
`

const Toggle = styled.button`
  color: #fff13a;
  background: #00272b;
  
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #fff13a;
  border-radius: 10px;
`


const SleepTableStyle = styled.div`
  color: #040404;
  width: 850px;
  text-align: center;
  margin: 0 auto;
  border-radius: 50px;
  
    h1 {
        color: #D7D9CE;
        white-space: nowrap;
    }

    tr {
        border: 3px #040404 solid;
        
    }
    td {
        border: 3px #040404 solid;
    }
    table {
    width: 100%;
    text-align: center;
    justify-content: center;
    border: 3px #040404 solid;
    border-collapse: collapse;
    }
    th {
        color: #40376E ;
        background-color: #D7D9CE;
        border: 3px #040404 solid;
    }

    form {
        margin: 30px 0;
    }

`

const TableHeader = styled.div`
    display:flex;
    justify-content: center
    h1 {
        padding-left: 38%
    }
`


//SleepTable React Component


function SleepTable (props) {
    // const [sleepLog, setSleepLog] = useState([])
    const [editing, setEditing] = useState(false);
    const [logToEdit, setLogToEdit] = useState({
        id: "",
        dateTimeFrom: "",
        dateTimeTo: "",
        feels: "",
        notes:""
    });

    const {sleepLog, setSleepLog} = useContext(SleepContext)
  
    const editLog = log => {
        setEditing(true);
        setLogToEdit(log);
      };

    // useEffect(()=>{
    //     axiosWithAuth().get(`/api/users/sleepdata`)
    //         .then(res=>
    //            setSleepLog(res.data)
    //             )
    //         .catch(err=>
    //             console.log(err.response)
    //             )
    // }, [])


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
        <Style>
            <SleepTableStyle>
                <TableHeader>
                    <h1>Sleep Table</h1>
                    <h1 onClick={() => props.setIsAdding(!props.isAdding)}>
                        +
                    </h1>
                </TableHeader>
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
                                <td>{log.feels}</td>
                                <td>
                                    <Toggle onClick={(e) => editLog(log)}>Edit</Toggle>
                                    
                                    
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
        </Style>
    )
}

export default SleepTable