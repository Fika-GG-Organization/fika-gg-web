import { Container } from "@mui/material";
import { RegisterForm } from "../features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <Container 
			maxWidth="xs" 
			sx={{py: 6}}
		>
      <RegisterForm />
    </Container>
  );
}