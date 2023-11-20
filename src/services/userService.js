import { httpAxios } from "@/helper/httpHelper";

export async function signUp(user) {
    const resulst = await httpAxios
        .post('/api/users', user)
        .then((response) => response.data)
    return resulst
}

export async function logIn(loginData) {
    const resulst = await httpAxios
        .post('/api/login', loginData)
        .then((response) => response.data)
    return resulst
}