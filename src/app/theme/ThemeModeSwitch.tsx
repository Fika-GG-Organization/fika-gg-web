import { useEffect, useEffectEvent, useRef, useState } from 'react';
import {
    Alert,
    Button,
    IconButton,
    Snackbar,
    Tooltip,
} from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import { useAuth } from '../auth/useAuth';
import { apiClient } from '../../shared/api/axiosClient';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

type ThemePreference = 'light' | 'dark';

interface UserPreference {
    themePreference: ThemePreference;
}

export default function ThemeModeSwitch () {
    const { token } = useAuth();

    return (
        <ThemeModeSwitchContent
            key={token ?? 'guest'}
            token={token}
        />
    );
}

export function ThemeModeSwitchContent({
    token,
}: {
    token: string | null;
})  {
    const { mode, systemMode, setMode } = useColorScheme();

    const [isLoading, setIsLoading] = useState(Boolean(token));
    const [isSaving, setIsSaving] = useState(false);
    const [loadError, setLoadError] = useState('');
    const [saveError, setSaveError] = useState('');

    // identifier for the current account session so that old requests cannot update after logout or account change
    const session = useRef(0);
    const saveInFlight = useRef(false);
    const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const currentMode = mode === 'system' ? systemMode : mode;
    const isDarkMode = currentMode === 'dark';
    const onPreferenceLoaded = useEffectEvent(
        (preference: ThemePreference) => {
            setMode(preference);
        },
    );

    const cancelPendingSave = useEffectEvent(() => {
        if (saveTimer.current !== null) {
            clearTimeout(saveTimer.current);
            saveTimer.current = null;
        }
    });

    useEffect(() => {
        if (!token) {
            return;
        }
        
        const currentSession = ++session.current;
        let ignore = false;

        async function loadPreference() {
            try {
                const { data } = await apiClient.get<UserPreference>(
                    '/users/me/preferences',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        // give up after 5 secs zzz
                        timeout: 5000,
                    },
                );

                if (
                    data.themePreference !== 'light' &&
                    data.themePreference !== 'dark'
                ) {
                    throw new Error('Invalid theme preference');
                }

                if (!ignore && session.current === currentSession) {
                    onPreferenceLoaded(data.themePreference);
                }
            } catch {
                if (!ignore && session.current === currentSession) {
                    setLoadError('Kunde inte hämta ditt sparade tema.');
                }
            } finally {
                if (!ignore && session.current === currentSession) {
                    setIsLoading(false);
                }
            }
        }

        void loadPreference();

        return () => {
            ignore = true;
            session.current = currentSession + 1;
            cancelPendingSave();
        };
    }, [token]);

    async function savePreference(nextMode: ThemePreference) {
        if (!token || saveInFlight.current) {
            return;
        }

        const currentSession = session.current;

        saveInFlight.current = true;
        setIsSaving(true);
        setSaveError('');

        try {
            await apiClient.put(
                '/users/me/preferences/theme',
                { themePreference: nextMode},
            );
        } catch {
            if (session.current === currentSession) {
                setSaveError('Temat bytte här, men kunde inte sparas på ditt konto.');
            };
        } finally {
            if (session.current === currentSession) {
                saveInFlight.current = false;
                setIsSaving(false);
            }
        }
    }

    function changeMode(checked: boolean) {
        if (
            !mode ||
            isLoading ||
            saveInFlight.current
        ) {
            return;
        }

        const nextMode: ThemePreference = checked
            ? 'dark'
            : 'light';

        // apply the appearance immediately.
        setMode(nextMode);
        setSaveError('');

        // replace any save scheduled by an earlier click.
        if (saveTimer.current !== null) {
            clearTimeout(saveTimer.current);
            saveTimer.current = null;
        }

        // guests only save their choice in this browser through MUI.
        if (!token) {
            return;
        }

        const currentSession = session.current;

        saveTimer.current = setTimeout(() => {
            saveTimer.current = null;

            // dont save a selection from an outdated account session.
            if (session.current !== currentSession) {
                return;
            }

            void savePreference(nextMode);
        }, 500);
    }

    const switchLabel = isDarkMode ? 'Byt till ljust läge' : 'Byt till mörkt läge';

    return (
        <>
            {/* if loading the saved theme failed we just say it in the tooltip, switching still works */}
            <Tooltip title={loadError ? `${switchLabel} (${loadError})` : switchLabel}>
                <span>
                    <IconButton
                        aria-label={switchLabel}
                        disabled={!mode || isLoading || isSaving}
                        onClick={() => changeMode(!isDarkMode)}
                        sx={{ color: 'primary.main', width: 44, height: 44 }}
                    >
                        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                </span>
            </Tooltip>

            {/* only saving errors get a popup, and it goes away by itself */}
            <Snackbar
                open={Boolean(saveError)}
                autoHideDuration={6000}
                onClose={() => setSaveError('')}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    severity="warning"
                    variant="filled"
                    action={
                        <Button
                            color="inherit"
                            size="small"
                            disabled={isSaving}
                            onClick={() => void savePreference(isDarkMode ? 'dark' : 'light')}
                        >
                            Försök igen
                        </Button>
                    }
                >
                    {saveError}
                </Alert>
            </Snackbar>
        </>
    );
}