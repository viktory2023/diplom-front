import axios from "axios";
import {createCookie} from "react-router-dom";

const config = {
    baseURL: 'http://10.8.1.4:8000',
}

const getClient = () => {
    const headers = {}
    const token = localStorage.getItem("token");
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    return axios.create({
        baseURL: config.baseURL,
        headers: headers,
    })
}

export const checkLogin = async () => {
    const client = getClient();
    try {
        const {status} = await client.get(
          '/auth/me'
        )
        if (status === 200) {
            return true
        }
    } catch (error) {
        console.log(error)
        return false
    }
    return false
}

export const loginUser = async ({email, password}) => {
    const client = getClient();
    try {
        const response = await client.post(
            '/auth/login',
            {
                email: email,
                password: password,
            })
        if (response.status === 200) {
            localStorage.setItem('token', response.data.access_token)
            return true
        }
    } catch (error) {
        console.log(error)
        return false
    }
    return false
}

export const logout = async () => {
    const client = getClient();
    try {
        const {status} =  await client.post(
          '/auth/logout',
        )
        if (status === 200) {
            localStorage.removeItem('token');
            return true
        }
    } catch (error) {
        console.log(error)
        return false
    }
    return false
}

export const getProducts = async () => {
    const client = getClient();
    try {
        const {data, status} = await client.get(
          '/products',
          {
              params: {
                  with_suppliers: true
              }
          }
        )
        if (status === 200) {
            return data
        }
    } catch (error) {
        console.log(error)
        return []
    }
    return []
}

export const getOrders = async () => {
    const client = getClient();
    try {
        const {status, data} = await client.get(
          '/orders',
        )
        if (status === 200) {
            return data
        }
    } catch (error) {
        console.log(error)
        return []
    }
    return []
}

export const getOrderDetails = async (orderId) => {
    const client = getClient();
    try {
        const {status, data} = await client.get(
          `/orders/${orderId}`,
        )
        if (status === 200) {
            return data
        }
    } catch (error) {
        console.log(error)
        return []
    }
    return []
}
