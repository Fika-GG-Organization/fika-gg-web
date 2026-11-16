import type { LoginRequest, User } from './auth.types';

export interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	login: (request: LoginRequest) => Promise<void>;
	logout: () => Promise<void>;
	refreshUser: () => Promise<void>;
	updateUser: (changes: Partial<User>) => void;
	isAuthenticated: boolean;
}
