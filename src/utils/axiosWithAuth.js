import axios from "axios"

export function getToken() {
  return localStorage.getItem("token")
}

export default function() {
  return axios.create({
    baseURL: "https://snoozzze-api.herokuapp.com",
    headers: {
      Authorization: getToken(),
      "Content-Type": "application/json"
    }
  })
}
