import { apiClient } from "shared/api/axiosClient";
import type { GameSearchResult } from "../game.types";

export async function searchGames(query: string): Promise<GameSearchResult[]> {
    const response = await apiClient.get<GameSearchResult[]>("/games/search", {
        params: { query },
    });
    return response.data;
}