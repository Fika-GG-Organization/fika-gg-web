import {
    Typography,
    Container,
    CircularProgress,
    Box,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Stack,
    Button,
    Divider,
    TextField,
} from "@mui/material";

import AvatarUploader from "@/features/avatar/components/AvatarUploader";
import { type UserResponse } from "@/features/user/types/UserResponse";
import { getUserData } from "@/features/user/api/userApi";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/auth/useAuth";
import type { UserProfileEdit } from "@/app/auth/auth.types";
import ThemeModeSwitch from "@/app/theme/ThemeModeSwitch";

export default function UserSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [user, setUser] = useState<UserResponse | null>(null);

    const {
        deleteCurrentUser,
        updateUserProfile,
        user: authUser,
    } = useAuth();

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState<string | null>(null);

    const emailValue = email ?? authUser?.email ?? "";

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [savingProfile, setSavingProfile] = useState(false);
    const [profileError, setProfileError] = useState<string | null>(null);
    const [profileSuccess, setProfileSuccess] = useState(false);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    // Load user information
    useEffect(() => {
        let cancelled = false;

        async function loadUser() {
            try {
                const data = await getUserData();

                if (cancelled) return;

                setUser(data);
                setDisplayName(data.displayName);
            } catch {
                if (!cancelled) {
                    setError("Failed to load user profile");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadUser();

        return () => {
            cancelled = true;
        };
    }, []);

    // Delete account
    async function handleDeleteAccount() {
        setDeleting(true);
        setDeleteError(null);

        try {
            await deleteCurrentUser();
        } catch {
            setDeleteError(
                "Failed to delete your account. Please try again."
            );
        } finally {
            setDeleting(false);
        }
    }

    // Update profile
    async function handleUserProfileUpdate() {
        setProfileError(null);
        setProfileSuccess(false);

        const trimmedName = displayName.trim();
        const trimmedEmail = emailValue.trim();

        const request: UserProfileEdit = {};

        if (trimmedName && trimmedName !== user?.displayName) {
            request.DisplayName = trimmedName;
        }

        if (trimmedEmail && trimmedEmail !== authUser?.email) {
            request.Email = trimmedEmail;
        }

        const changingPassword = newPassword.length > 0;
        const changingEmail = request.Email !== undefined;

        if (changingPassword && newPassword !== confirmPassword) {
            setProfileError("Passwords do not match.");
            return;
        }

        if (changingPassword) {
            request.NewPassword = newPassword;
        }

        if (changingEmail || changingPassword) {
            if (!currentPassword) {
                setProfileError(
                    "Enter your current password to change email or password."
                );
                return;
            }

            request.CurrentPassword = currentPassword;
        }

        if (Object.keys(request).length === 0) {
            setProfileError("No changes to save.");
            return;
        }

        setSavingProfile(true);

        try {
            await updateUserProfile(request);

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            setProfileSuccess(true);
        } catch {
            setProfileError(
                "Failed to update profile. Check your information and try again."
            );
        } finally {
            setSavingProfile(false);
        }
    }

    // Loading state
    if (loading) {
        return (
            <Container sx={{ py: 8, textAlign: "center" }}>
                <CircularProgress />
            </Container>
        );
    }

    // Error state
    if (error || !user) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="error">
                    {error ?? "Could not load user profile."}
                </Alert>
            </Container>
        );
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "background.default",
                color: "text.primary",
                py: { xs: 3, md: 5 },
            }}
        >
            <Container
                maxWidth={false}
                sx={{
                    maxWidth: 800,
                    px: { xs: 2, md: 3 },
                }}
            >
                {/* Back link */}
                <Button
                    onClick={() => window.history.back()}
                    sx={{
                        color: "text.primary",
                        textDecoration: "underline",
                        textTransform: "none",
                        px: 0,
                        mb: 3,
                        "&:hover": {
                            backgroundColor: "transparent",
                        },
                    }}
                >
                    ‹ Tillbaka till profilen
                </Button>

                {/* Page title */}
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 800,
                        mb: 3,
                    }}
                >
                    Kontoinställningar
                </Typography>

                {/* PROFILE CARD */}
                <Box
                    sx={{
                        bgcolor: "background.paper",
                        border: (theme) =>
                            `1.5px solid ${theme.palette.fika.line}`,
                        borderRadius: 3,
                        p: { xs: 2.5, md: 3 },
                        mb: 3,
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, mb: 2 }}
                    >
                        Välkommen {authUser?.displayName}!
                    </Typography>

                    {/* Avatar */}
                    <Box sx={{ mb: 3 }}>
                        <AvatarUploader />
                    </Box>
                    

                    {/* Profile fields */}
                    <Stack spacing={2}>
                        <TextField
                            label="Visningsnamn"
                            value={displayName}
                            onChange={(e) =>
                                setDisplayName(e.target.value)
                            }
                            fullWidth
                            size="small"
                            sx={fieldStyles}
                        />

                        <TextField
                            label="E-post"
                            type="email"
                            value={emailValue}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            size="small"
                            sx={fieldStyles}
                        />

                        <Divider sx={{ my: 1 }} />

                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Ändra lösenord
                        </Typography>

                        <TextField
                            label="Nuvarande lösenord"
                            type="password"
                            value={currentPassword}
                            onChange={(e) =>
                                setCurrentPassword(e.target.value)
                            }
                            fullWidth
                            size="small"
                            autoComplete="current-password"
                            sx={fieldStyles}
                        />

                        <TextField
                            label="Nytt lösenord"
                            type="password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.target.value)
                            }
                            fullWidth
                            size="small"
                            autoComplete="new-password"
                            sx={fieldStyles}
                        />

                        <TextField
                            label="Bekräfta nytt lösenord"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            fullWidth
                            size="small"
                            autoComplete="new-password"
                            error={
                                confirmPassword.length > 0 &&
                                newPassword !== confirmPassword
                            }
                            helperText={
                                confirmPassword.length > 0 &&
                                newPassword !== confirmPassword
                                    ? "Lösenorden matchar inte."
                                    : ""
                            }
                            sx={fieldStyles}
                        />

                        {profileError && (
                            <Alert severity="error">
                                {profileError}
                            </Alert>
                        )}

                        {profileSuccess && (
                            <Alert severity="success">
                                Profilen har uppdaterats!
                            </Alert>
                        )}

                        <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleUserProfileUpdate}
                                disabled={savingProfile}
                            >
                                {savingProfile ? (
                                    <CircularProgress
                                        size={22}
                                        color="inherit"
                                    />
                                ) : (
                                    "Spara"
                                )}
                            </Button>
                        </Box>
                    </Stack>
                </Box>

                {/* LOGIN CARD */}
                <Box
                    sx={{
                        bgcolor: "background.paper",
                        border: (theme) =>
                            `1.5px solid ${theme.palette.fika.line}`,
                        borderRadius: 3,
                        p: { xs: 2.5, md: 3 },
                        mb: 3,
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                Tema
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Välj vilket tema hemsidan ska ha för din profil.
                            </Typography>
                        </Box>

                        <ThemeModeSwitch/>
                    </Stack>
                </Box>

                {/* DELETE ACCOUNT CARD */}
                <Box
                    sx={{
                        bgcolor: "background.default",
                        border: (theme) =>
                            `1.5px dashed ${theme.palette.error.main}`,
                        borderRadius: 3,
                        p: { xs: 2.5, md: 3 },
                    }}
                >
                    <Typography
                        variant="h6"
                        color="error.main"
                        sx={{ fontWeight: 700, mb: 1 }}
                    >
                        Radera konto
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            maxWidth: 560,
                            lineHeight: 1.7,
                            mb: 1.5,
                        }}
                    >
                        Ditt konto, dina spel och gamertags raderas för
                        alltid, och du tas bort från alla event. Event
                        där du är värd ställs in. Det går inte att ångra.
                    </Typography>

                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setDeleteDialogOpen(true)}
                    >
                        Radera mitt konto
                    </Button>
                </Box>

                {/* DELETE CONFIRMATION DIALOG */}
                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => {
                        if (!deleting) {
                            setDeleteDialogOpen(false);
                            setDeleteError(null);
                        }
                    }}
                >
                    <DialogTitle>
                        Radera ditt konto permanent?
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Är du säker på att du vill radera ditt konto?
                            Den här åtgärden går inte att ångra.
                        </DialogContentText>

                        {deleteError && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {deleteError}
                            </Alert>
                        )}
                    </DialogContent>

                    <DialogActions>
                        <Button
                            onClick={() => setDeleteDialogOpen(false)}
                            disabled={deleting}
                        >
                            Avbryt
                        </Button>

                        <Button
                            onClick={handleDeleteAccount}
                            color="error"
                            variant="contained"
                            disabled={deleting}
                        >
                            {deleting ? (
                                <CircularProgress
                                    size={22}
                                    color="inherit"
                                />
                            ) : (
                                "Radera permanent"
                            )}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
}

// Theme-aware input styling
const fieldStyles = {
    "& .MuiOutlinedInput-root": {
        borderRadius: 2,
        bgcolor: "background.paper",

        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "fika.fieldLine",
        },

        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "text.secondary",
        },

        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
        },
    },

    "& .MuiInputLabel-root": {
        color: "text.secondary",
    },

    "& .MuiInputBase-input": {
        color: "text.primary",
    },
};