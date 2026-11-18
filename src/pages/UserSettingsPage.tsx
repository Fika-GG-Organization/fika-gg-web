import {
    Typography, 
    Container, 
    Switch, 
    FormControlLabel, 
    CircularProgress, 
    Box, 
    Alert, 
    Dialog, 
    DialogTitle,
    DialogContent, 
    DialogContentText,
    DialogActions, 
    Button} from "@mui/material"
import PageHeader from "@/shared/components/ui/PageHeader"
import AvatarUploader from "@/features/avatar/components/AvatarUploader"    
import { type UserResponse } from "@/features/user/types/UserResponse"
import { getUserData } from "@/features/user/api/userApi"
import { useEffect, useState } from "react"
import { useAuth } from "@/app/auth/useAuth"
import { themeSelect, getUserTheme } from "@/features/user/api/userApi"

export default function UserSettingsPage(){

    const [user, setUser] = useState<UserResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [displayName, setDisplayName] = useState("");
    const [darkmode, setDarkmode] = useState(false);
    const { deleteCurrentUser } = useAuth();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    
    useEffect(() => {
        let cancelled = false

        async function loadUser(){
            try{
                const data = await getUserData();
                if(!cancelled) return;
                setUser(data);
                setDisplayName(data.displayName);

            }
            catch{
                if(!cancelled) setError("Failed to load user profile")
            }
            finally{
                if(!cancelled) setLoading(false)
            }
        };

        loadUser();

        return() =>{
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        async function loadTheme() {
            try {
                const selectedTheme = await getUserTheme();

                setDarkmode(
                    selectedTheme.themePreference === "dark"
                );
            } catch {
                setDarkmode(false);
            }
        }

        loadTheme();
    }, []);

    async function handleThemeChange(event: React.ChangeEvent<HTMLInputElement>)
        {
        const newDarkmode = event.target.checked;

        setDarkmode(newDarkmode);
        try {
            await themeSelect(newDarkmode ? "dark" : "light");
        }
        catch {
        setDarkmode(!newDarkmode);
        setError("Failed to save theme preference");
        }

    }

    async function handleDeleteAccount() {
        setDeleting(true);
        setDeleteError(null);

        try {
            await deleteCurrentUser();

            // Account deleted and authentication state cleared.
            // Your authentication guard should now redirect the user.
        } catch {
            setDeleteError("Failed to delete your account. Please try again.");
        } finally {
        setDeleting(false);
        }
    }

    if (loading){
        return (
            <Container>
                <Box>
                    <CircularProgress/>
                </Box>
            </Container>
        )
    }
    if(error || !user){
        <Container>
            <Alert severity="error">{error}</Alert>
        </Container>
    }

    return(
        <Container>
            <PageHeader 
                title="Settings"
                description="You can edit your profile and preferences here"
            />

            {/* avatar uploader + Display name edit trext box, email edit textbox*/}
            <Container>
                <AvatarUploader/>
            </Container>

            {/*Darkmode toggle container*/}
            <Container>
                <FormControlLabel
                    control={
                        <Switch
                            checked={darkmode}
                            onChange={handleThemeChange}
                        />
                    }
                    label="Enable Darkmode"
                />

            </Container>

            {/* Delete account container */}
            <Container>
                <Typography variant="h6">
                    DeleteAccount
                </Typography>

                <Typography variant="body2" color="textSecondary">
                    Permanently delete your account and associated data.
                    This action is permanent.
                </Typography>

                <Button variant="contained" color="error" onClick={() => setDeleteDialogOpen(true)}>
                    Delete Account
                </Button>

                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => {
                        if(!deleting){
                            setDeleteDialogOpen(false);
                            setDeleteError(null);
                        }
                    }}>
                    <DialogTitle>
                        Delete your account permanently?
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete your account? This action is permanent.
                        </DialogContentText>

                        {deleteError && (
                            <Alert severity="error" sx={{mt: 2}}>
                                {deleteError}
                            </Alert>
                        )}
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleDeleteAccount} color="error" variant="contained" disabled={deleting}>
                            {deleting ? (
                                <CircularProgress size={22} color="inherit" />
                                ) : (
                                "Delete permanently"
                            )}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Container>
    )
}