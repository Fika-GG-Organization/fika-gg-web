import axios from "axios";
import type { LoginRequest, LoginResponse } from "../../../app/auth/auth.types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
	const response = await axios.post<LoginResponse>(
		`${API_BASE_URL}/auth/login`, 
		credentials
	);
	return response.data;
}

export async function registerUser(credentials: LoginRequest): Promise<void> {
  await axios.post(`${API_BASE_URL}/auth/register`, credentials);
}