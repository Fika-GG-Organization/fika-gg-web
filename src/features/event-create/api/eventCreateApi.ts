import { apiClient } from '@/shared/api/axiosClient';
import type { EventGetResponse } from '@/features/event-get';
import type { EventCreateRequest } from '@/features/event-create/models/event-create.types';

const ROUTE_PATH = 'events/createEvent';

// sends a new event to the api and gets the created event back
export async function createEventAsync(event: EventCreateRequest): Promise<EventGetResponse> {
    const response = await apiClient.post<EventGetResponse>(ROUTE_PATH, event);
    return response.data;
}