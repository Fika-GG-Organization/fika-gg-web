import { apiClient } from "@/shared/api/axiosClient";

const ROUTE_PATH = "events/deleteEvent";

export async function deleteEventAsync(eventId: number | string): Promise<void> {
  await apiClient.delete(`${ROUTE_PATH}/${eventId}`, {
    headers: {
      Accept: "application/json",
    },
  });
}
