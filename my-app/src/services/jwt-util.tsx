import axios from "axios";

const API_URL = "http://localhost:9000/auth-service/token/";

class JwtUtil {
    resolveToken() {
        axios.get(API_URL + "resolve")
            .then(response => console.log(response.data))
            .catch(error => console.log(error.response));
    }
}

export default new JwtUtil();