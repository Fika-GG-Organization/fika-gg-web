import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/auth/useAuth";
import axios from "axios";
import {
	Container,
	Card,
	CardContent,
	Typography,
	TextField,
	Button,
	Stack,
	Alert,
	Link
} from "@mui/material";
import { loginUser } from "../api/authApi";

export const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const data = await loginUser(email, password);
			login(data.accessToken);
			navigate("/temppage");
		} catch (err) {
			if (axios.isAxiosError(err) && err.response?.status === 401) {
				setError("Invalid email or password.");
			} else {
				setError("An error occurred. Please try again.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Container 
			maxWidth="xs" 
			sx={{py: 6}}
		>
			<Card variant="outlined">
				<CardContent>
					<Typography
						variant="h5"
						component="h2"
					
					>
						Log In
					</Typography>
				</CardContent>
			</Card>
		</Container>
	);
}