export const API_BASE_URL = import.meta.env.VITE_API_URL;
export const PIPE_API_KEY = import.meta.env.VITE_PIPE_API_KEY;

export const AUTH_ENDPOINT = `${API_BASE_URL}/v1/auth`;
export const USER_ENDPOINT = `${API_BASE_URL}/v1/users`;
export const REVIEW_ENDPOINT = `${API_BASE_URL}/v1/reviews`;