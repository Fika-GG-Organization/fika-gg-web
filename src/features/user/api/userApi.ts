import type { UserResponse } from "../types/UserResponse";
import { apiClient } from "@/shared/api/axiosClient";

export async function getUserbyId(id: string): Promise<UserResponse> {
  const response = await apiClient.get<UserResponse>(`/user/${id}`);
  return response.data;
}

export async function getUserData(): Promise<UserResponse> {
  const response = await apiClient.get<UserResponse>("/user/current");

  return response.data;
}

// sets the gamertag on one of ur games, empty string removes it
export async function updateGamerTagAsync(gameId: number, gamerTag: string): Promise<void> {
  await apiClient.put(`/user/update/game/${gameId}`, { gamerTag });
}

// removes the game from a user's profile, the game persists in the db
export async function removeGameFromUserAsync(gameId: number): Promise<void> {
  await apiClient.delete(`/user/remove/game/${gameId}`);
}