import { styled } from "@mui/material";
import Box, { type BoxProps } from "@mui/material/Box";

const StyledBox = styled(Box)(({ theme }) => ({
	borderStyle: "solid",
	borderWidth: 1,
	borderColor: theme.palette.divider,
	borderRadius: theme.shape.borderRadius,

	overflowX: "auto",
	overflowY: "auto",
	scrollbarWidth: "thin",
	scrollbarGutter: "auto",

	height: "55vh",
	width: "100%",
}));

/**
 * Wraps around the calendar display, styling border, and providing scrolling functionality.
 */
const DisplayWrapper = ({children, ...props}: BoxProps) => {
	return (
		<StyledBox {...props}>
			{children}
		</StyledBox>
	);
}

export default DisplayWrapper;