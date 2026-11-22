import type { NoticeResponse } from "../types/notice.types";
import { apiClient } from "@/shared/api/axiosClient";

export async function getNotices(unreadOnly = false): Promise<NoticeResponse[]>{
    const response = await apiClient.get<NoticeResponse[]>("/notices", {
        params: {unreadOnly}
    });
    console.log(response.status, response.headers["content-type"], response.data)
    return response.data;
}

export async function getUnreadNoticeCount(): Promise<number>{
    const response = await apiClient.get<number>("/notices/unread-count");
    return response.data;
}

export async function markNoticeAsViewed(noticeId: number): Promise<void>{
    await apiClient.patch(`/notices/${noticeId}/viewed`)
}

export async function markAllNoticesAsViewed(): Promise<void>{
    await apiClient.patch("/notices/viewed");
}

export async function deleteNotice(noticeId: number): Promise<void>{
    await apiClient.delete(`/notices/${noticeId}`)
}
