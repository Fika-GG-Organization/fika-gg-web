import { useRef, useState, type ChangeEvent } from 'react';
import { 
	Box, 
	Button, 
	CircularProgress, 
	Typography, 
	Link 
} from '@mui/material';
import UserAvatar from 'shared/components/ui/UserAvatar';
import { type AvatarUploaderProps } from '../types/avatar.types';
import { uploadAvatar, deleteAvatar } from '../api/avatarApi';

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function AvatarUploader({ name, avatarUrl, onChange }: AvatarUploaderProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];

		if (!file)
		{
			return;
		}
	
		if (!ALLOWED_TYPES.includes(file.type)) 
		{
			setError('Endast JPEG, PNG och WEBP är tillåtna filtyper.');
			return;
		}

		if (file.size > MAX_FILE_BYTES)
		{
			setError('Bilden får vara max 5MB.');
			return;
		}

		setError(null);
		setIsBusy(true);

		try
		{
			const { avatarUrl: newUrl } = await uploadAvatar(file);
			onChange(newUrl);
		}
		catch
		{
			setError('Något gick fel vid uppladdning av bilden.');
		} finally {
			setIsBusy(false);
		}
	}
		
	async function handleDelete() {
		setError(null);
		setIsBusy(true);
		try {
			await deleteAvatar();
			onChange(null);
		} catch {
			setError('Något gick fel vid borttagning av bilden.');
		} finally {
			setIsBusy(false);
		}
	}

	return (
		<Box>
			<Box sx={{ 
				display: 'flex',
				alignItems: 'center',
				gap: 2.5,
				flexWrap: 'wrap',
			}}>
				<Box sx={{ positon: 'relative' }}>
					<UserAvatar
						name={name}
						src={avatarUrl}
						size={80}
					/>
						<CircularProgress
							size={80}
							thickness={2}
							sx={{
								position: 'absolute',
								inset: 0
							}}
						/>
				</Box>

				<Button
					variant="outlined"
					onClick={() => inputRef.current?.click()}
					disabled={isBusy}
				>
					{avatarUrl ? 'Laddar upp...' : 'Ladda upp profilbild'}
				</Button>

				{avatarUrl && (
					<Link
						component="button"
						type="button"
						onClick={handleDelete}
						disabled={isBusy}
					>
						Ta bort
					</Link>
				)}
				
				<input
					type="file"
					ref={inputRef}
					accept="image/jpeg, image/png, image/webp"
					hidden
					onChange={handleFileChange}
				/>
			</Box>

			{error && (
				<Typography
					role="alert"
					sx={{ 
						color: 'error.main', 
						fontSize: 14,
						mt: 1 
					}}
				>
					{error}
				</Typography>
			)}
		</Box>
	)
}