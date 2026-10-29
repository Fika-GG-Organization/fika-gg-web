import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

type PageHeaderProps = {
    title: string;
    description?: string;
    actions?: ReactNode;
};

/**
 * big title at the top of a page, with an optional line under it.
 * actions is for stuff on the right side like buttons, it drops under the title on small screens.
 *
 * used in: upptäck, kalender, mina event, skapa event, kontoinställningar.
 *
 * @example
 * <PageHeader title="Upptäck event" description="Kommande spelkvällar du kan joina direkt." />
 * <PageHeader title="Kalender" actions={<CalendarToolbar ... />} />
 */
export default function PageHeader({ title, description, actions }: PageHeaderProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: 2,
                mb: 3,
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 36 }, letterSpacing: '-0.01em' }}>
                    {title}
                </Typography>
                {description && (
                    <Typography sx={{ color: 'text.secondary' }}>{description}</Typography>
                )}
            </Box>

            {actions && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
                    {actions}
                </Box>
            )}
        </Box>
    );
}