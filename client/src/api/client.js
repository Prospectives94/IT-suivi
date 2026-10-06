import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

// Tickets
export const getTickets       = (params) => api.get('/tickets', { params });
export const getMyTickets     = (email)  => api.get('/tickets/my', { params: { email } });
export const getTicket        = (id)     => api.get(`/tickets/${id}`);
export const createTicket     = (data)   => api.post('/tickets', data);
export const updateStatus     = (id, status)   => api.patch(`/tickets/${id}/status`, { status });
export const updatePriority   = (id, priority) => api.patch(`/tickets/${id}/priority`, { priority });
export const addComment       = (id, data)     => api.post(`/tickets/${id}/comments`, data);

// Analytics
export const getAnalytics = () => api.get('/analytics');

// Auth
export const login     = (password) => api.post('/auth/login', { password });
export const techLogin = (password) => api.post('/auth/tech', { password });
