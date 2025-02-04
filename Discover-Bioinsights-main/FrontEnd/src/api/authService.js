// src/api/authService.js

import { setToken } from '../utils/auth';

const API_URL = 'http://localhost:5000/api/auth';

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    setToken(data.token); // Store JWT in localStorage
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error; // Propagate the error for handling in the calling component
  }
};