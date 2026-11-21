import type { LoginRequest, User, UserProfileEdit } from './auth.types';

export interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	login: (request: LoginRequest) => Promise<void>;
	logout: () => Promise<void>;
	refreshUser: () => Promise<void>;
	updateUser: (changes: Partial<User>) => void;
	deleteCurrentUser: () => Promise<void>;
	updateUserProfile: (request: UserProfileEdit) => Promise<void>;
	isAuthenticated: boolean;
}
