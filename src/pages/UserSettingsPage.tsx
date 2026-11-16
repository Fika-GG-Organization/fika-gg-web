import {box, Grid, Typgography, Container, TextField, switch, FormControlLabel, CircularProgress, Box, Alert} from "@mui/material"
import PageHeader from "@/shared/components/ui/PageHeader"
import UserAvatar from "@/shared/components/ui/UserAvatar"
import AvatarUploader from "@/features/avatar/components/AvatarUploader"    
import { type UserResponse } from "@/features/user/types/UserResponse"
import { getUserData } from "@/features/user/api/userApi"
import { useEffect, useState } from "react"
import { Label } from "@mui/icons-material"

const TEXT_DARKMODE_SWITCH_LABEL = "Enable Darkmode"

export default function UserSettingsPage(){

    const [user, setUser] = useState<UserResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [displayName, setDisplayName] = useState("");
    const [darkmode, setDarkmode] = useState(false);
    
    useEffect(() => {
        let cancelled = false

        async function loadUser(){
            try{
                const data = await getUserData();
                if(!cancelled) return;
                setUser(data);
                setDisplayName(data.DisplayName);
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
                <UserAvatar
                    name={displayName} src={user?.AvatarUrl}
                />
            </Container>

            {/*Darkmode toggle container*/}
            <Container>
                <FormControlLabel control={<switch/>} label={TEXT_DARKMODE_SWITCH_LABEL}/>

            </Container>

            {/*Logout container*/}
            <Container>

            </Container>

            {/* Delete account container */}
            <Container>

            </Container>
        </Container>
    )
}