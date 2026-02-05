/// <reference types="vite/client" />

import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

// Configuration interface
interface ApiClientConfig extends AxiosRequestConfig {
  baseURL: string;
}

// Default config
const defaultConfig: ApiClientConfig = {
  baseURL: import.meta.env.BACKEND_PORT,
  headers: {
    'Content-Type': 'application/json'
  }
};

// Create and export the typed axios instance
export const apiClient: AxiosInstance = axios.create(defaultConfig);