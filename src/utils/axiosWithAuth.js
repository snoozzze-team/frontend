import axios from "axios"

export function getToken(){
    return localStorage.getItem('token')
}

export default function(){
    return axios.create({
        baseURL: "https://sleep-tracker-bw.herokuapp.com",
        headers:{
            Authorization: getToken()
        }
    })
}