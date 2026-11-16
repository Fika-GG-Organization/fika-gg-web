export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	displayName: string;
	email: string;
	password: string;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
}
