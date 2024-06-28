import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

// Axios interceptor to refresh token on 401 Unauthorized responses
makeRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        const response = await makeRequest.post("/auth/refresh");
        const newAccessToken = response.data.accessToken;

        // Update the original request with the new access token and retry it
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return makeRequest(originalRequest);
      } catch (err) {
        // Handle refresh token failure (e.g., redirect to login page)
        console.error("Failed to refresh token:", err);
        // Example: Redirect to login page
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
