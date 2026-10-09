import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
		<Box 
			component="footer"
			sx={{
				textAlign: "center",
			}}
		>
			<Typography
				variant="body2"
			>
				{new Date().getFullYear()} Fika GG. All rights reserved.
			</Typography>
		</Box>
	);
}