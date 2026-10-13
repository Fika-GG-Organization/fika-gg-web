import { Grid } from "@mui/material";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileGames from "../components/profile/ProfileGames";
import  ProfileEvents from "../components/profile/ProfileEvents";

export default function UserPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-4">User Profile</h1>
            <ProfileCard /> 
            <Grid container spacing={2}>
                <ProfileGames />
                <ProfileEvents />
            </Grid>
        </div>
    )
}