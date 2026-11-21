import { apiClient } from '@/shared/api/axiosClient';
import type { LoginRequest, RegisterRequest, User, UserProfileEdit } from '@/app/auth/auth.types';

export const authApi = {
	register: (request: RegisterRequest) =>
		apiClient.post('/user/register', request),

	login: (request: LoginRequest) =>
		apiClient.post('/auth/login', request, { params: { useCookies: true } }),

	logout: () => apiClient.post('/auth/logout'),

	getCurrentUser: () =>
		apiClient.get<User>('/user/me').then((response) => response.data),

	deleteCurrentUser: () => 
		apiClient.delete('/user/delete'),

	updateUserProfile: (request: UserProfileEdit) => 
		apiClient.put("/user/UpdateProfile", request)
};
