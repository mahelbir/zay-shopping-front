import axios from "axios";

const httpClient = async (endpoint, method = "GET", body = null) => {
    const headers = {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true"
    }
    const authToken = localStorage.getItem("_auth")
    if (authToken)
        headers["Authorization"] = "Bearer " + authToken
    try {
        const res = await axios.request({
            method,
            baseURL: import.meta.env.VITE_API_URL,
            url: endpoint,
            data: body,
            headers
        })
        if (res.data.status !== 200) {
            throw new Error(res.data.message)
        }
        return res.data.data;
    } catch (e) {
        if (e?.response?.status === 401) {
            localStorage.removeItem("_auth");
            location.reload();
        } else if (e?.response?.status === 403) {
            throw new Error("You do not have permission to access this resource")
        } else if (e?.response?.status) {
            throw {
                message: e.response.data.message,
                response: e.response
            }
        }
        throw e
    }
}

export default httpClient