import { Container, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import { useAuth } from "app/auth/useAuth";
import PageHeader from "shared/components/ui/PageHeader";

export default function NotFoundPage() {
	const { isAuthenticated } = useAuth();

	const homePath = isAuthenticated ? "/temp" : "/";
	
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", py: 8 }}>
      <Box sx={{ mb: 2 }}>
        <ErrorIcon sx={{ fontSize: 54, color: "text.secondary" }}/>
      </Box>
      <PageHeader
        title="404"
        description="The page you are looking for doesn't exist or has been moved."
        centered={true}
        actions = {
          <Button
            variant="contained"
            component={RouterLink}
            to={homePath}
            size="large"
          >
            Back to Homepage
          </Button>
        }
      >
      </PageHeader>
    </Container>
  );
}