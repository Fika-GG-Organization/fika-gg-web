import { apiClient } from "@/shared/api/axiosClient";
import type { EventCalendarQueryParams, EventCalendarResponse } from "../models";

/**
 * Asynchronously makes a request to the server to get every events between two dates.
 * @param query
 * @param abort
 * @returns A {@linkcode EventCalendarResponse} array.
 */
export async function getEventsAsync(
	query: EventCalendarQueryParams,
	abort?: AbortSignal,
): Promise<EventCalendarResponse> {
	const response = await apiClient
		.get<EventCalendarResponse>("events/getCalendar", {
			params: {
				startTime: query["start-time"].toISOString(),
				endTime: query["end-time"].toISOString(),
			},
			headers: {
				Accept: "application/json",
			},
			signal: abort,
		});
	return response.data;
}
