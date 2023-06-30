import axios from "axios";

const instance1 = axios.create({
    baseURL: "http://localhost:5000/api"
});

const instance2 = axios.create({
    baseURL: "http://localhost:8000"
});

// Interceptor cho instance1
instance1.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

instance1.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Interceptor cho instance2
instance2.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

instance2.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export { instance1, instance2 };
