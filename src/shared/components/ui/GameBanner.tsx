import { useState } from 'react';
import { Box, Typography } from '@mui/material';

type GameBannerProps = {
    name: string;
    coverUrl?: string | null;
    variant?: 'card' | 'detail' | 'thumb';
    // stretch to fill whatever box its in instead of using the fixed size
    fill?: boolean;
};
const heights = { card: 140, detail: 240, thumb: 56 };

/**
 * game cover at the top of cards and the event page
 * if theres no cover or the image link is broken it shows the striped placeholder with the game name instead
 * detail gets the thin lingon line on top, thumb is the small square one in lists
 * fill makes it stretch to whatever box its in, like the tiles in GamePickerList
 *
 * @example
 * <GameBanner name="Valorant" coverUrl={game.coverUrl} />
 * <GameBanner name="Valorant" coverUrl={game.coverUrl} variant="detail" />
 * <GameBanner name="Minecraft" variant="thumb" fill />
 */
export default function GameBanner({ name, coverUrl, variant = 'card', fill = false }: GameBannerProps) {
    const [isBroken, setIsBroken] = useState(false);
    const showImage = Boolean(coverUrl) && !isBroken;
    const isDetail = variant === 'detail';
    const isThumb = variant === 'thumb';

    return (
        <Box
            sx={(theme) => ({
                position: 'relative',
                height: fill ? '100%' : heights[variant],
                width: fill ? '100%' : isThumb ? 72 : '100%',
                flexShrink: 0,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: theme.palette.fika.cover,
                borderRadius: fill ? 0 : isDetail ? '16px' : isThumb ? '8px' : 0,
                border: !fill && (isDetail || isThumb) ? `1.5px solid ${theme.palette.fika.line}` : 'none',
                borderBottom: `1.5px solid ${theme.palette.fika.line}`,
                borderTop: isDetail ? `4px solid ${theme.palette.primary.main}` : undefined,
            })}
        >
            {showImage ? (
                <Box
                    component="img"
                    src={coverUrl ?? undefined}
                    alt=""
                    onError={() => setIsBroken(true)}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            ) : (
                !isThumb && (
                    <Typography
                        sx={{ fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'text.secondary' }}
                    >
                        {name}
                    </Typography>
                )
            )}
        </Box>
    )
}