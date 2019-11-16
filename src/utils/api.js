import api from './axiosWithAuth'

export function setToken(token){
    return localStorage.setItem('token', token)
}

export const LoginUser = async (credentials) => {
    const res = await api().post('/api/auth/login', credentials)
    return res.data
}

export const SignupUser = async (user) => {
    const res = await api().post('/api/auth/login', register)
    return res.data
}