import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface HeaderProps {
	title: string;
	subtitle?: string | undefined;
}

const Header = (props: HeaderProps) => {
	return (
		<Box
			component="header"
			sx={{ width: "100%", display: "flex", flexDirection: "column", justifyItems: "left" }}
		>
			<Typography variant="h1" align="left">
				{props.title}
			</Typography>
			<Typography variant="subtitle1" align="left">
				{props.subtitle}
			</Typography>
		</Box>
	);
};

export default Header;
