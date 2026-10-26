import { styled } from "@mui/material";
import Box, { type BoxProps } from "@mui/material/Box";

const StyledBox = styled(Box)(({ theme }) => ({
	borderStyle: "solid",
	borderWidth: 1,
	borderColor: theme.palette.grey.A400,
	borderRadius: theme.shape.borderRadius,

	overflowX: "auto",
	overflowY: "auto",
	scrollbarWidth: "thin",
	scrollbarGutter: "auto",

	height: "55vh",
	width: "100%",
}));

const DataDisplayWrapper = (props: BoxProps) => {
	return <StyledBox>{props.children}</StyledBox>;
};

export default DataDisplayWrapper;
