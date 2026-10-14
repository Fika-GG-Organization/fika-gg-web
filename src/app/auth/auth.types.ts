export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	tokenType: string;
	accessToken: string;
	expiresIn: number;
	refreshToken: string;
}

// For later use

// export interface User {
//   id: string;
//   email: string;
//   displayName: string;
//   avatarUrl?: string;
// }