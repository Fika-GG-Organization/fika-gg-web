import { Grid } from "@mui/material";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileGames from "../components/profile/ProfileGames";
import ProfileEvents from "../components/profile/ProfileEvents";
import EarlierEvents from "@/components/profile/EarlierEvents";
import { getUserData } from "@/features/user/api/userApi";
import { useEffect } from "react";

export default function UserPage() {
  useEffect(() => {
    async function fetchUser() {
      try {
        await getUserData();
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    }

    fetchUser();

  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">User Profile</h1>
      <ProfileCard />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ProfileGames />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <ProfileEvents />
            </Grid>
            <Grid size={12}>
              <EarlierEvents />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
