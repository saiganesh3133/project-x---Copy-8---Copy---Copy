import axios from './axios'

export const subscriptions = {
  create: (data) => axios.post('/api/subscriptions/', data),
  cancel: () => axios.post('/api/subscriptions/cancel/'),
  getCurrentPlan: () => axios.get('/api/subscriptions/current/'),
} 