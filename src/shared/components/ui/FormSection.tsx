import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

type FormSectionProps = {
    title: string;
    description?: string;
    children: ReactNode;
};

/**
 * box that groups fields in a form, like "1. Spel" and "2. Info" on skapa event
 * its a real fieldset so screen readers say the title when u tab into it
 *
 * @example
 * <FormSection title="1. Spel">
 *     <TextField label="Sök spel" />
 * </FormSection>
 */
export default function FormSection({ title, description, children }: FormSectionProps) {
    return (
        <Box
            component="fieldset"
            sx={(theme) => ({
                m: 0,
                p: 3,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
                bgcolor: 'background.paper',
                border: `1.5px solid ${theme.palette.fika.line}`,
                borderRadius: '12px',
            })}
        >
            <Typography component="legend" sx={{ px: 1, fontSize: 18, fontWeight: 700 }}>
                {title}
            </Typography>
            {description && <Typography sx={{ color: 'text.secondary', mt: -1.5 }}>{description}</Typography>}
            {children}
        </Box>
    );
}