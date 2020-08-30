import * as axios from 'axios'

const Instance = axios.create({
    baseURL: 'http://localhost:4000/',
    headers: {
        token: localStorage.getItem('token')
    }
})

export const appAPI = {
    signup(data) {
        return Instance.post(`signup`, data)
            .then(res => res.data)
    },
    login(data) {
        return Instance.post(`login`, data)
            .then(res => res.data)
    },
    authMe() {
        return Instance.get(`auth`)
            .then(res => res.data)
    }
}

export const usersAPI = {
    searchForUsers(username) {
        return Instance.get(`users/${username}`)
            .then(res => res.data)
    },
    getSpecificUser(username) {
        return Instance.get(`user/${username}`)
            .then(res => res.data)
    }
}

export const followAPI = {
    follow(username, val) {
        const url = `follow/${username}`
        return val
            ? Instance.post(url)
            : Instance.delete(url)
    }
}