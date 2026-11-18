import type { SiteTheme, UserResponse } from "../types/UserResponse";
import { apiClient } from "@/shared/api/axiosClient";

export async function getUserbyId(id: string): Promise<UserResponse> {
  const response = await apiClient.get<UserResponse>(`/user/${id}`);
  return response.data;
}

export async function getUserData(): Promise<UserResponse> {
  const response = await apiClient.get<UserResponse>("/user/current");

  return response.data;
}

export async function addGameToUser(gameId: number): Promise<void> {
  await apiClient.post(`/user/add/game/${gameId}`);
  console.log(`Game with ID ${gameId} added to user.`);
}

export async function getUserTheme(): Promise<SiteTheme> {
    const response = await apiClient.get<SiteTheme>(
        "/api/users/me/preferences"
    );

    return response.data;
}

export async function themeSelect(
    theme: SiteTheme["themePreference"]
): Promise<void> {
    await apiClient.put(
        "/api/users/me/preferences/theme",
        { themePreference: theme }
    );
}
