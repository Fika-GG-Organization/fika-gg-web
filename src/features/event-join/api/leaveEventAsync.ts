import { apiClient } from "@/shared/api/axiosClient";
import { PATH_EVENT } from "@/shared/routes/constants";

/**
 * Make a request to leave event. User must be logged in.
 * @param eventId Identifies the event.
 */
export async function leaveEventAsync<R>(
	eventId: number | string,
	abort?: AbortSignal
) {
  const response = apiClient.delete<R>(`${PATH_EVENT}/${eventId}/leave`, {
    headers: {
      Accept: "application/json",
    },
    signal: abort,
  });
  return response;
}
