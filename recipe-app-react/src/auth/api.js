import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // Your Spring Boot backend URL

    // This is the crucial part for HttpOnly cookies.
    // It tells axios to send cookies automatically with every request.
    withCredentials: true,
});

/*
  OPTIONAL: You can add interceptors to handle global errors.
  For example, if an API call returns a 401 Unauthorized (because the cookie expired),
  you could automatically redirect the user to the login page.
*/
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized errors, e.g., redirect to login
            // This logic is best handled in the AuthContext to avoid circular dependencies.
            console.error("Unauthorized request. The session may have expired.");
        }
        return Promise.reject(error);
    }
);

export default api;