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