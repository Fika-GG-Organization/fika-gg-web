import { Box, Link, Stack, Typography } from '@mui/material';
import PageHeader from '@/shared/components/ui/PageHeader';
import TextSection from '@/shared/components/ui/TextSection';

// to do: put the groups real email here
// const CONTACT_EMAIL = 'kontakt@example.com';

/**
 * how to reach us, no form since theres nothing on the backend to send it to
 *
 * used in: /contact
 */
export default function ContactPage() {
    return (
        <Box sx={{ maxWidth: 720, mx: 'auto' }}>
            <PageHeader title="Kontakt" description="Frågor, buggar eller vill du få ditt konto borttaget? Hör av dig." />

            <Stack spacing={4}>
            {/* to do: show this again when we have a real email
                <TextSection title="E-post">
                    <Typography>
                        <Link href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Link>
                    </Typography>
                    <Typography>Vi är studenter, så det kan ta några dagar innan du får svar.</Typography>
                </TextSection>
            */}
                <TextSection title="Hittat en bugg?">
                    <Typography>
                        Skapa gärna en issue på{' '}
                        <Link href="https://github.com/Fika-GG-Organization" target="_blank" rel="noopener">
                            vår GitHub
                        </Link>
                        , det är snabbast.
                    </Typography>
                </TextSection>
            </Stack>
        </Box>
    );
}