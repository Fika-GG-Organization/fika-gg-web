import { useState } from "react";
import Button, { type ButtonProps } from "@mui/material/Button";
import Snackbar, { type SnackbarCloseReason } from "@mui/material/Snackbar";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";

const TOAST = "";

interface BackButtonProps extends ButtonProps {
	/** The string that will be copied to clipboard. If not set, button will be disabled. */
	copyText?: string | undefined;
	/** Where an icon should appear, if at all. */
	icon?: "left" | "right" | "none" | undefined;
	/** Set to display text underline. */
	underline?: boolean | undefined;
}

/**
 * Button that copies a string to clipboard.
 */
const CopyButton = ({ copyText, icon = "left", underline, ...props }: BackButtonProps) => {
	const [toastOpen, setToastOpen] = useState<boolean>(false);

	function handleClick() {
		if (isSecureContext && copyText) {
			navigator.clipboard.writeText(copyText);
		}
		setToastOpen(true);
	}

	function handleClose(_event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) {
		if (reason === "clickaway") {
			return;
		}
		setToastOpen(false);
	}

	return (
		<>
			<Button
				{...props}
				aria-label={"Copy to clipboard."}
				disabled={!isSecureContext ? true : false}
				onClick={handleClick}
				startIcon={
					icon === "left" ?
						copyText !== undefined ?
							<LinkIcon />
						:	<LinkOffIcon />
					:	undefined
				}
				endIcon={
					icon === "right" ?
						copyText !== undefined ?
							<LinkIcon />
						:	<LinkOffIcon />
					:	undefined
				}
				sx={
					underline === true ?
						{ textDecorationLine: "underline" }
					:	{ textDecorationLine: "none" }
				}
				variant={props.variant ?? "outlined"}
			>
				{props.children ?? ""}
			</Button>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
				autoHideDuration={6000}
				message={TOAST}
				open={toastOpen}
				onClose={handleClose}
				slotProps={{
					clickAwayListener: {
						onClickAway: (e) => {
							e.preventDefault;
						},
					},
				}}
			/>
		</>
	);
};

export default CopyButton;
