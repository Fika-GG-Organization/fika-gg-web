import type { EventGetResponse } from "../models";
import type { ListPlayer } from "@/shared/components/ui/ParticipantList";
import {
  LABEL_PARTICIPANT_HOST,
  LABEL_PARTICIPANT_BACKUP,
  LABEL_PARTICIPANT_JOINED,
  PLACEHOLDER_LABEL,
} from "../config/constants";

/** Helper function for setting `ParticipantList.players`. */
export function formatParticipantList(data: EventGetResponse | undefined): ListPlayer[] {
  if (!data) {
    return [];
  }
  return data.players.map((p) => {
    let note = PLACEHOLDER_LABEL;
    if (data.host.id === p.userId) {
      note = LABEL_PARTICIPANT_HOST;
    } else if (p.status === 0) {
      note = LABEL_PARTICIPANT_JOINED;
    } else if (p.status === 1) {
      note = LABEL_PARTICIPANT_BACKUP;
    }
    return {
      id: p.userId,
      name: p.displayName,
      avatarUrl: p.avatarUrl,
      note: note,
    };
  });
}
