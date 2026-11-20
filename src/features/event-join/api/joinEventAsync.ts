import { apiClient } from "@/shared/api/axiosClient";
import { PATH_EVENT } from "@/shared/routes/constants";

/**
 * Make a request to join event. User must be logged in.
 * @param eventId Identifies the event.
 */
export async function joinEventAsync<R>(
	eventId: number | string,
	abort?: AbortSignal
) {
	const response = apiClient.post<R>(`${PATH_EVENT}/${eventId}/join`, {}, {
		headers: {
			Accept: "application/json",
		},
		signal: abort,
	});
	return response;
}
