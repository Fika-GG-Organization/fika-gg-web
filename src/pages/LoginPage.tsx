import { Container } from "@mui/material";
import { LoginForm } from "../features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <Container 
			maxWidth="xs" 
			sx={{py: 6}}
		>
      <LoginForm />
    </Container>
  );
}