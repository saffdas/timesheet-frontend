import axios from "axios";

const API_URL = "http://localhost:9000/auth-service/token/";

class JwtUtil {
    resolveToken() {
        axios.get(API_URL + "resolve")
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .catch(error => {
                console.log(error.response);
                return error.data;
            });
    }
}

export default new JwtUtil();