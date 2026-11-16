import { useNavigate } from "react-router-dom";
import Button, { type ButtonProps } from "@mui/material/Button";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

const LABEL_BACK_BUTTON = "Tillbaka";

interface BackButtonProps extends ButtonProps {
	/** Where an icon should appear, if at all. To override default icons, use {@linkcode ButtonProps.startIcon} for left-side and {@linkcode ButtonProps.endIcon} for right-side respectively. */
	icon?: "left" | "right" | "none" | undefined;
	/** Override default navigation behaviour. */
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
	/** Set to display text underline. */
	underline?: boolean | undefined;
}

/**
 * Return button for navigating user to previous page or location in history.
 */
const BackButton = ({ icon, onClick, underline, ...props }: BackButtonProps) => {
	const nav = useNavigate();

	return (
		<Button
			{...props}
			aria-label={"Go back"}
			aria-roledescription={"Navigates user to previous location in history."}
			onClick={onClick ?? (() => nav(-1))}
			role={"link"}
			startIcon={icon === "left" ? (props.startIcon ?? <ChevronLeft />) : undefined}
			endIcon={icon === "right" ? (props.endIcon ?? <ChevronRight />) : undefined}
			sx={
				underline === true ?
					{ textDecorationLine: "underline" }
				:	{ textDecorationLine: "none" }
			}
			variant={props.variant ?? "text"}
		>
			{props.children ?? LABEL_BACK_BUTTON}
		</Button>
	);
};

export default BackButton;
