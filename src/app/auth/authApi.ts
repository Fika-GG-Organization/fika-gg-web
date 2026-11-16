import { apiClient } from '@/shared/api/axiosClient';
import type { LoginRequest, User } from './auth.types';

export const authApi = {
	login: (request: LoginRequest) =>
		apiClient.post('/auth/login', request, { params: { useCookies: true },
	}),

	logout: () => apiClient.post('/auth/logout'),

	getCurrentUser: () =>
	apiClient.get<User>('/user/me').then((response) => response.data),
};