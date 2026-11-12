import { apiClient } from "@/shared/api/axiosClient";
import type { EventGetResponse } from "../models";

const ROUTE_PATH = "events/getById";

export async function getEventByIdAsync(
	id: string,
	abort?: AbortSignal,
): Promise<EventGetResponse> {
	const response = await apiClient.get<EventGetResponse>(`${ROUTE_PATH}/${id}`, {
		headers: {
			Accept: "application/json",
		},
		signal: abort,
	});
	return response.data;
}
