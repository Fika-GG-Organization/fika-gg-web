import { useState, useEffect, useCallback, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { authApi } from "@/features/auth/api/authApi";
import type { LoginRequest, User } from "./auth.types";

async function fetchCurrentUser(): Promise<User | null> {
	try {
		return await authApi.getCurrentUser();
	} catch {
		return null;
	}
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let ignore = false;

		fetchCurrentUser().then((currentUser) => {
			if (!ignore) {
				setUser(currentUser);
				setIsLoading(false);
			}
		});
		return () => {
			ignore = true;
		};
	}, []);

	const updateUser = (changes: Partial<User>) => {
		setUser((prev) => (prev ? { ...prev, ...changes } : prev));
	};

	const refreshUser = useCallback(async () => {
		setUser(await fetchCurrentUser());
	}, []);

	const login = async (request: LoginRequest) => {
		await authApi.login(request);
		await refreshUser();
	};

	const logout = async () => {
		try {
			await authApi.logout();
		} finally {
			setUser(null);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
				isLoading,
				login,
				logout,
				refreshUser,
				updateUser
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
