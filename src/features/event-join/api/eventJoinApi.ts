import { apiClient } from "@/shared/api/axiosClient";
import type { EventJoinResponse } from "../models";

export async function joinEventAsync(abort?: AbortSignal) {
	const response = apiClient.post<EventJoinResponse>("", {}, {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		signal: abort,
	});
	return response;
}
