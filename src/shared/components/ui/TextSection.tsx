import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

type TextSectionProps = {
    title: string;
    children: ReactNode;
};

/**
 * a heading with some text under it, for the plain text pages
 * put Typography or lists inside, it just handles the spacing and color
 *
 * used in: om oss, integritet, kontakt
 *
 * @example
 * <TextSection title="Vad vi sparar">
 *     <Typography>Din e-post och ditt visningsnamn.</Typography>
 * </TextSection>
 */
export default function TextSection({ title, children }: TextSectionProps) {
    return (
        <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography variant="h2" sx={{ fontSize: 22, fontWeight: 700 }}>
                {title}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, color: 'text.secondary', lineHeight: 1.7 }}>
                {children}
            </Box>
        </Box>
    );
}