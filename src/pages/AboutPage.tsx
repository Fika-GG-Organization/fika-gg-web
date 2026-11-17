import { Box, Link, Stack, Typography } from '@mui/material';
import PageHeader from '@/shared/components/ui/PageHeader';
import TextSection from '@/shared/components/ui/TextSection';

// github names, swap for real names if the group wants that
const team = ['iskall94', 'GitUser4179', 'krixtin', 'GaKa00', 'blubeatbee', 'FrusTrick'];

/**
 * what fika.gg is and who made it
 *
 * used in: /about
 */
export default function AboutPage() {
    return (
        <Box sx={{ maxWidth: 720, mx: 'auto' }}>
            <PageHeader title="Om oss" description="Varför fika.gg finns och vilka som byggt det." />

            <Stack spacing={4}>
                <TextSection title="Vad är fika.gg?">
                    <Typography>
                        fika.gg är en kalender för spelkvällar. Du lägger upp ett event, väljer spel och tid, och
                        andra kan joina. Blir det fullt hamnar nästa person på reservlistan.
                    </Typography>
                </TextSection>

                <TextSection title="Varför?">
                    <Typography>
                        Det är svårt att få ihop folk att spela med. Planer i Discord drunknar i chatten och
                        internationella LFG-sidor är fulla av folk i fel tidszon. Vi ville ha ett enkelt ställe
                        för svenska studenter och unga vuxna som vill hitta sällskap till en spelkväll.
                    </Typography>
                </TextSection>

                <TextSection title="Vilka är vi?">
                    <Typography>
                        Vi är sex studenter på Chas Academy som byggt fika.gg som vårt slutprojekt i
                        .NET-utbildningen.
                    </Typography>
                    <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                        {team.map((name) => (
                            <li key={name}>
                                <Link href={`https://github.com/${name}`} target="_blank" rel="noopener">
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </Box>
                </TextSection>
            </Stack>
        </Box>
    );
}