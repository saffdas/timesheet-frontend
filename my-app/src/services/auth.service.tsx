import axios from "axios";

const API_URL = "http://localhost:9000/auth-service/";

class AuthService {
    login(email: string, password: string) {
        return axios
            .post(API_URL + "login", {email, password})
            .then(response => {
                console.log(response);
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                }
                return response.data;
            });
    }

    logout() {
        localStorage.clear();
    }

    register(email: string, password: string) {
        return axios.post(API_URL + "register", {email, password})
            .then(response => {
                console.log(response);
            });
    }

    getToken() {
        return localStorage.getItem('token');
    }
}

export default new AuthService();