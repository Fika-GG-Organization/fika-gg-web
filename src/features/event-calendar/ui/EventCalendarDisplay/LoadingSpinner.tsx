import Box from "@mui/material/Box";
import CircularProgress, { type CircularProgressProps } from "@mui/material/CircularProgress";

const LoadingSpinner = ({ ...props }: CircularProgressProps) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				height: "100%",
			}}
		>
			<CircularProgress
				{...props}
				aria-label={props["aria-label"]}
				color={props.color}
				id={props.id}
			/>
		</Box>
	);
};

export default LoadingSpinner;
