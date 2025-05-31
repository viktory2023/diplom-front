import axios from "axios";

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

export const getProducts = async (title = null) => {
    const client = getClient();
    const params = {
        with_suppliers: true
    }
    if (title) {
        params.title = title
    }
    try {
        const {data, status} = await client.get(
          '/products',
          {
              params: params
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

export const getSuppliers = async () => {
    const client = getClient();
    try {
        const {status, data} = await client.get(
          '/suppliers',
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

export const getFullOrder = async (orderId) => {
    const client = getClient();
    try {
        const response = await client.get(
          `/orders/${orderId}`,
        )
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.log(error)
        return null
    }
    return null
}

export const createOrder = async (supplierId) => {
    const client = getClient();
    try {
        const response = await client.post(
          '/orders',
          {
              supplier_id: supplierId,
          }
        )
        if (response.status === 200) {
            return await getFullOrder(response.data.id)
        }
    } catch (error) {
        console.log(error)
        return null
    }
    return null
}

export const addProducts = async (orderId, productAmountsList) => {
    const client = getClient();
    try {
        const response = await client.post(
          `/orders/${orderId}/products`,
          productAmountsList
        )
        if (response.status === 200) {
            console.log(response.data)
            return response.data
        }
    } catch (error) {
        console.log(error)
        return null
    }
    return null
}
export const deleteProducts = async (orderId, productIdsList) => {
    const client = getClient();
    try {
        const response = await client.delete(
          `/orders/${orderId}/products/`,
          productIdsList
        )
        if (response.status === 200) {
            console.log(response.data)
            return response.data
        }
    } catch (error) {
        console.log(error)
        return null
    }
    return null
}
