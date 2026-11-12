import { apiClient } from '@/shared/api/axiosClient';
import type { AvatarResponse } from '../types/avatar.types';

export async function uploadAvatar(file: File): Promise<AvatarResponse> {
  const formData = new FormData();
	formData.append('file', file);

	const { data } = await apiClient.put<AvatarResponse>('/users/me/avatar', formData)
	
	return data;
}

export async function deleteAvatar(): Promise<void> {
	await apiClient.delete('/users/me/avatar');
}