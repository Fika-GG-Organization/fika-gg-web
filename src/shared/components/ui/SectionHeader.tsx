import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Typography } from '@mui/material';

type Props = {
  title: string;
  link?: {label: string; to: string};
  meta?: string;
}

export default function SectionHeader({ title, link, meta }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: 2,
        mb: 2
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontSize: 22,
          fontWeight: 700
        }}
      >
        {title}
      </Typography>

      {meta && <Typography sx={{ color: 'text.secondary' }}>{meta}</Typography>}

      {link && (
        <Link
          component={RouterLink}
          to={link.to}
          sx={{
            color: 'text.primary',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {link.label}
        </Link>
      )}
    </Box>
  );
}
