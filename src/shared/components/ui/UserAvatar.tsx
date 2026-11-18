import { Avatar } from '@mui/material';
import { initials } from '@/shared/utils/initials';

type UserAvatarProps = {
    name: string;
    src?: string | null;
    size?: number;
};

/**
 * round avatar with the profile pic, or initials if theres no pic
 * size is in px so it fits wherever, 28 in cards, 36 in lists, 48 for the host
 *
 * used in: event card host line, player list, reserve list, host card
 *
 * @example
 * <UserAvatar name="Alex K" />
 * <UserAvatar name={user.displayName} src={user.avatarUrl} size={48} />
 */
export default function UserAvatar({ name, src, size = 36 }: UserAvatarProps) {
    return (
        <Avatar
            src={src ?? undefined}
            alt=""
            sx={(theme) => ({
                width: size,
                height: size,
                fontSize: size * 0.34,
                fontWeight: 700,
                bgcolor: theme.palette.fika.fill,
                color: 'text.primary',
                border: `1.5px solid ${theme.palette.fika.line}`,
            })}
        >
            {initials(name)}
        </Avatar>
    );
}