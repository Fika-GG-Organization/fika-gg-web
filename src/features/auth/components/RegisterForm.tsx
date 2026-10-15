import { useState, type SubmitEvent } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../../app/auth/useAuth";
import { registerUser, loginUser } from "../api/authApi";
import axios from "axios";
import {
	Card,
	CardContent,
	Typography,
	TextField,
	Button,
	Stack,
	Alert,
	Link
} from "@mui/material";

export const RegisterForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	
	const { login } = useAuth();
	const navigate = useNavigate();
    
	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");	

		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			setIsLoading(false);
			return;
		}

		setIsLoading(true);

		try {
			await registerUser({ email, password });

			const loginData = await loginUser({ email, password });
			login(loginData.accessToken);
			// Email temporary to simply confirm you are logged in, will be removed later
			navigate("/temp", { state: { email } });

		} catch (err) {
			if (axios.isAxiosError(err))
			{
				setError(err.response?.data?.title || "Registration failed. Please try again.");
			} else {
				setError("An unexpected error occured. Please try again.");
			}
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Card variant="outlined">
			<CardContent sx={{ p: 3 }}>
				<Typography
					variant="h5"
					component="h2"
					gutterBottom
					sx={{ fontWeight: "bold"}}
				>
					Register Account
				</Typography>
				<form onSubmit={handleSubmit}>
					<Stack spacing={2}>
						<TextField
							label="Email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							autoComplete="email"
							fullWidth
							required
							disabled={isLoading}
						/>
						<TextField
							label="Password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="new-password"
							fullWidth
							required
							disabled={isLoading}
						/>
						<TextField
							label="Confirm Password"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							autoComplete="new-password"
							fullWidth
							required
							disabled={isLoading}
						/>
						<Button
							type="submit"
							variant="contained"
							size="large"
							fullWidth
							disabled={isLoading}
						>
							{isLoading ? "Registering..." : "Register"}
						</Button>
					</Stack>
				</form>
				
				{error && (
					<Alert severity="error" sx={{ mb: 2 }}>
						{error}
					</Alert>
        )}

				<Typography 
					variant="body2" 
					sx={{ mt: 2, textAlign: "center" }}
				>
					Already have an account?{" "}
					<Link component={RouterLink} to="/login">
						Log in here
					</Link>
				</Typography>
			</CardContent>
		</Card>
	)
}