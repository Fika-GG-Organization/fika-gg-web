import { useState, type SubmitEvent } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../../app/auth/useAuth";
import { loginUser } from "../api/authApi";
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

export const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const data = await loginUser({email, password});
			login(data.accessToken);
			// Email temporary to simply confirm you are logged in, will be removed later
			navigate("/temp", { state: { email } });
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
		<Card variant="outlined">
			<CardContent sx={{ p: 3 }}>
				<Typography
					variant="h5"
					component="h2"
					gutterBottom
					sx={{ fontWeight: "bold"}}
				>
					Log In
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
								autoComplete="current-password"
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
                {isLoading ? "Logging in..." : "Log In"}
              </Button>
						</Stack>
					</form>

					<Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            Don't have an account?{" "}
            <Link component={RouterLink} to="/register">
              Register here
            </Link>
          </Typography>

				{error && (
					<Alert severity="error" sx={{ mb: 2 }}>
						{error}
					</Alert>
				)}
			</CardContent>
		</Card>
	);
}