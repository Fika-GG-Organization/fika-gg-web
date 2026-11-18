import { Box, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PageHeader from '@/shared/components/ui/PageHeader';
import TextSection from '@/shared/components/ui/TextSection';

/**
 * what data we save and why, needed for gdpr (#6)
 * keep this in sync with what the api actually stores
 *
 * used in: /privacy
 */
export default function PrivacyPage() {
    return (
        <Box sx={{ maxWidth: 720, mx: 'auto' }}>
            <PageHeader title="Integritet" description="Vad vi sparar om dig, varför, och vad du kan göra åt det." />

            <Stack spacing={4}>
                <TextSection title="Vad vi sparar">
                    <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                        <li>E-post och lösenord (lösenordet sparas krypterat, vi kan aldrig se det)</li>
                        <li>Visningsnamn och profilbild om du laddar upp en</li>
                        <li>Vilka spel du lagt till och dina gamertags</li>
                        <li>Event du skapat eller joinat</li>
                        <li>Om du valt ljust eller mörkt tema</li>
                    </Box>
                </TextSection>

                <TextSection title="Varför">
                    <Typography>
                        Bara för att sidan ska fungera: så att du kan logga in, skapa och joina event, och så att
                        andra ser vem som är med. Vi säljer ingen data och visar ingen reklam.
                    </Typography>
                </TextSection>

                <TextSection title="Vad andra kan se">
                    <Typography>
                        Eventsidor är publika. Alla med länken kan se eventet och visningsnamn och profilbild för
                        värden och spelarna. Din e-post visas aldrig för andra.
                    </Typography>
                </TextSection>

                <TextSection title="Andra tjänster vi använder">
                    <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                        <li>
                            <strong>Cloudinary</strong> lagrar profilbilder som du laddar upp.
                        </li>
                        <li>
                            <strong>RAWG</strong> ger oss speldata. När du söker efter ett spel skickar vår server
                            söktexten till RAWG, men inget om dig.
                        </li>
                    </Box>
                </TextSection>

                <TextSection title="Cookies">
                    <Typography>
                        Vi använder bara en cookie som håller dig inloggad. Den behövs för att sidan ska fungera,
                        så vi frågar inte om lov för den. Inga cookies för spårning eller reklam.
                    </Typography>
                </TextSection>

                <TextSection title="Hur länge">
                    <Typography>Vi sparar dina uppgifter så länge du har ett konto.</Typography>
                </TextSection>

                <TextSection title="Dina rättigheter">
                    <Typography>
                        Enligt GDPR har du rätt att få se vad vi sparar om dig, rätta fel och få dina uppgifter
                        borttagna. Det går inte att radera kontot själv på sidan än, så{' '}
                        <Link component={RouterLink} to="/contact">kontakta oss</Link> så tar vi bort det åt dig.
                    </Typography>
                </TextSection>

                <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                    {/* to do: change the date when the text changes */}
                    Senast uppdaterad 17 november 2026. fika.gg är ett skolprojekt.
                </Typography>
            </Stack>
        </Box>
    );
}