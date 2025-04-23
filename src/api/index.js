import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
})

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refresh_token')
        const response = await axios.post(`${API_URL}/users/login/refresh/`, {
          refresh: refreshToken,
        })

        const { access } = response.data
        localStorage.setItem('access_token', access)

        originalRequest.headers.Authorization = `Bearer ${access}`
        return api(originalRequest)
      } catch (error) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)

// Auth API
export const auth = {
  login: (credentials) => api.post('/users/login/', credentials),
  register: (userData) => api.post('/users/register/', userData),
  logout: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  },
  getProfile: () => api.get('/users/profile/'),
  updateProfile: (data) => api.patch('/users/profile/', data),
}

// Courses API
export const courses = {
  getAll: () => api.get('/videos/'),
  getById: (id) => api.get(`/videos/${id}/`),
  enroll: (courseId) => api.post(`/videos/${courseId}/enroll/`),
  review: (courseId, data) => api.post(`/videos/${courseId}/review/`, data),
}

// Videos API
export const videos = {
  getByCourse: (courseId) => api.get(`/videos/courses/${courseId}/videos/`),
  getStreamUrl: (courseId, videoId) => api.get(`/videos/courses/${courseId}/videos/${videoId}/stream/`),
}

// Subscription API
export const subscription = {
  createRazorpayOrder: (data) => api.post('/subscriptions/create-razorpay-order/', data),
  verifyRazorpayPayment: (data) => api.post('/subscriptions/verify-razorpay-payment/', data),
  getStatus: () => api.get('/subscriptions/status/'),
}

export default api 