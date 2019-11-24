import api from "./axiosWithAuth"

export function setToken(token) {
  return localStorage.setItem("token", token)
}

export const LoginUser = async credentials => {
  const res = await api().post("/api/auth/login", credentials)
  setToken(res.data.token)
  return res.data
}

export const SignupUser = async user => {
  const res = await api().post("/api/auth/register", user)
  return res.data
}

export const AddSleepEntry = async entry => {
  const res = await api().post("/api/users/sleepdata", entry)
  return res.data
}
