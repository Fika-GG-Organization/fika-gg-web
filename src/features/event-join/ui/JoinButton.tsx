import { LABEL_JOIN, LABEL_JOIN_AS_BACKUP, LABEL_LEAVE } from "../config/constants";
import Button, { type ButtonProps } from "@mui/material/Button";

export interface JoinButtonProps extends ButtonProps {
  /**
   * If `true`, clicking the button will activate {@linkcode JoinButtonProps.onLeave}.
   * If `false` clicking the button will activate {@linkcode JoinButtonProps.onJoin}.
   * @default false */
  isParticipant: boolean;
  /** If event has reached participant limit. */
  isFull: boolean;
  /**
   * Callback function that you must create. The user should join the event when activated.
   */
  onJoin: () => Promise<void>;
  /**
   * Callback function that you must create. The user should leave the event when activated.
   */
  onLeave: () => Promise<void>;
  loading: boolean;
}

/**
 * Button for joining or leaving event, depending on {@linkcode isParticipant}.
 *
 * Note that it does not contain any business logic and must be supplied on your own.
 */
export default function JoinButton({
  isParticipant = false,
  isFull,
  loading,
  onJoin,
  onLeave,
  ...props
}: JoinButtonProps) {
  return (
    <Button
      {...props}
      color={isParticipant ? "info" : "primary"}
      loading={loading}
      {
        // Toggles API call to join or leave
        ...(isParticipant ? { onClick: onLeave } : { onClick: onJoin })
      }
      variant={isParticipant ? "outlined" : "contained"}
    >
      {isParticipant ? LABEL_LEAVE : isFull ? LABEL_JOIN_AS_BACKUP : LABEL_JOIN}
    </Button>
  );
}
