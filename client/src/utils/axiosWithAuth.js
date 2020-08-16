import Axios from 'axios';

const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return Axios.create({
        baseURL: "http://localhost:5000/api",
        headers: {
            Authorization: token
        }
    });
};

export default axiosWithAuth;
