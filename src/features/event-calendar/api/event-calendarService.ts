import axios from "axios";
import { apiEventClient } from "@/shared/api/axiosClientEvent";
import { ISO_STRING_PATTERN } from "@/shared/config/constants";
import type {
	EventCalendarQueryParams,
	EventCalendarResponse,
} from "../models/event-calendar.types";

export async function getEventsAsync(
	query: EventCalendarQueryParams,
	abort?: AbortSignal,
): Promise<EventCalendarResponse | null> {
	return await apiEventClient
		.get<EventCalendarResponse>("", {
			params: query,
			signal: abort,
		})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			if (axios.isCancel(error)) {
				console.log(`Request was cancelled:`, error.message);
			} else if (axios.isAxiosError(error)) {
				console.error(`AxiosError:`, error.response?.data, error.message);
			} else {
				console.error(`Error: ${error.message ?? "Unknown Error"}`);
			}
			return null;
		});
}
