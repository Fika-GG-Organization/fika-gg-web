import {
  ERROR_JOIN_PANEL,
  DESCRIPTION_NO_OPEN_SLOTS,
  DESCRIPTION_ONE_OPEN_SLOT,
  DESCRIPTION_OPEN_SLOTS,
} from "../config/constants";

/** Helper function for setting `JoinPanel.headline`. */
export function formatJoinPanelHeadline(
  participantCount: number | undefined,
  maxPlayers: number | undefined,
): string {
  if (!participantCount || !maxPlayers) {
    return ERROR_JOIN_PANEL;
  }

  const slotsLeft = maxPlayers - participantCount;

  if (slotsLeft <= 0) {
		// Because users can still join a full event, we check for 'less than zero' because
		// we want to avoid situations where the description reads: '-5 platser kvar'.
    return DESCRIPTION_NO_OPEN_SLOTS;
  } else if (slotsLeft === 1) {
    return `${slotsLeft} ${DESCRIPTION_ONE_OPEN_SLOT}`;
  } else {
    return `${slotsLeft} ${DESCRIPTION_OPEN_SLOTS}`;
  }
}
