export type AvatarResponse = {
    avatarUrl: string;
}

export type AvatarUploaderProps = {
    name: string;
    avatarUrl?: string | null;
    onChange: (avatarUrl: string | null ) => void;
}