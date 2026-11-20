import { LABEL_JOIN, LABEL_LEAVE } from "../config/constants";
import Button, { type ButtonProps } from "@mui/material/Button";

export interface JoinButtonProps extends ButtonProps {
  /**
	 * If `true`, clicking the button will activate {@linkcode JoinButtonProps.onLeave}.
	 * If `false` clicking the button will activate {@linkcode JoinButtonProps.onJoin}.
	 * @default false */
	isParticipant: boolean;
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
  loading,
  onJoin,
  onLeave,
  ...props
}: JoinButtonProps) {
  return (
    <Button
      {...props}
      color={isParticipant ? "secondary" : "primary"}
      loading={loading}
      {
        // Toggles API call to join or leave
        ...(isParticipant ? { onClick: onLeave } : { onClick: onJoin })
      }
      variant={isParticipant ? "contained" : "outlined"}
    >
      {isParticipant ? LABEL_LEAVE : LABEL_JOIN}
    </Button>
  );
}
