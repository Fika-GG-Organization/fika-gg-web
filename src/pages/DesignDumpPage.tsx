import { useState, type ReactNode } from 'react';
import { Box, Divider, Typography, Button, Link, TextField } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import JoinPanel from '@/shared/components/ui/JoinPanel';
import StatusPill from '../shared/components/ui/StatusPill';
import CapacityMeter from '../shared/components/ui/CapacityMeter';
import DateTile from '../shared/components/ui/DateTile';
import GameBanner from '../shared/components/ui/GameBanner';
import AvatarStack from '../shared/components/ui/AvatarStack';
import EmptyState from '../shared/components/ui/EmptyState';
import FilterChips from '../shared/components/ui/FilterChips';
import PageHeader from '../shared/components/ui/PageHeader';
import EventCard from '../shared/components/ui/EventCard';
import EventRow from '../shared/components/ui/EventRow';
import HostCard from '../shared/components/ui/HostCard';
import ParticipantList from '../shared/components/ui/ParticipantList';
import BackupList from '../shared/components/ui/BackupList';
import CalendarToolbar from '../shared/components/ui/CalendarToolbar';
import CalendarLegend from '../shared/components/ui/CalendarLegend';
import CalendarEvent, { type CalendarItem } from '../shared/components/ui/CalendarEvent';
import WeekView from '../shared/components/ui/WeekView';
import MonthView from '../shared/components/ui/MonthView';
import ProfileHeader from '../shared/components/ui/ProfileHeader';
import UserGameList from '../shared/components/ui/UserGameList';
import DangerZone from '../shared/components/ui/DangerZone';
import ConfirmDialog from '../shared/components/ui/ConfirmDialog';
import FormSection from '../shared/components/ui/FormSection';
import NumberStepper from '../shared/components/ui/NumberStepper';
import GamePickerList from '../shared/components/ui/GamePickerList';

// one section per component so its easy to find stuff
function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5" component="h2">{title}</Typography>
            {children}
            <Divider sx={{ mt: 2 }} />
        </Box>
    );
}

// shows one example with the props written under it so u know which version it is
function Example({ label, children }: { label: string; children: ReactNode }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, alignItems: 'flex-start' }}>
            {children}
            <Typography
                component="code"
                sx={{ fontFamily: 'monospace', fontSize: 12, color: 'text.secondary' }}
            >
                {label}
            </Typography>
        </Box>
    );
}

// fake players so we dont need the api
const players = [
    { id: '1', displayName: 'Alex K' },
    { id: '2', displayName: 'Noor H' },
    { id: '3', displayName: 'Jonas E' },
    { id: '4', displayName: 'Mia R' },
];

// fake games for the filter
const games = [
    { value: 'all', label: 'Alla spel' },
    { value: '3498', label: 'Valorant' },
    { value: '3272', label: 'Rocket League' },
    { value: '22509', label: 'Minecraft' },
    { value: '4291', label: 'Counter-Strike 2' },
    { value: '47137', label: 'Fortnite' },
];

// example calendar items for the week of 26 okt 2026
const calendarItems: CalendarItem[] = [
    { id: 1, start: '2026-10-28T16:30:00', title: 'Chill 3v3 efter skolan', timeLabel: '16:30', detail: 'Rocket League · 6/6', shortLabel: 'Rocket League', look: 'full' },
    { id: 2, start: '2026-10-29T19:00:00', title: 'Wingman-träning', timeLabel: '19:00', detail: 'Counter-Strike 2 · 1/4', shortLabel: 'CS2', look: 'mine' },
    { id: 3, start: '2026-10-30T20:00:00', title: 'Fredagsmys 5-stack', timeLabel: '20:00', detail: 'Valorant · 3/5', shortLabel: 'Valorant', look: 'open' },
    { id: 4, start: '2026-10-31T14:00:00', title: 'Byggkväll: slottsservern', timeLabel: '14:00', detail: 'Minecraft · 4/10', shortLabel: 'Minecraft', look: 'mine' },
];

// example games for the picker
const pickerGames = [
    { id: 3272, name: 'Rocket League', subtitle: '2015' },
    { id: 9999, name: 'Rocket Arena', subtitle: '2020' },
    { id: 8888, name: 'Rocketbirds 2', subtitle: '2016' },
];

/**
 * dev only page where we dump every shared component with example data
 * flip the theme in the navbar to check both light and dark
 * not linked anywhere, just go to /design
 */
export default function DesignDumpPage() {
    const [game, setGame] = useState('all');
    const [mobileGame, setMobileGame] = useState('all');
    const [calendarView, setCalendarView] = useState<'week' | 'month'>('week');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [maxPlayers, setMaxPlayers] = useState(5);
    const [pickedGame, setPickedGame] = useState<string | number | null>(3272);
    const [pickedTile, setPickedTile] = useState<string | number | null>(null);

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 5, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Typography variant="h3" component="h1">Design dump</Typography>

            <Section title="StatusPill">
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    <Example label='status="open"'>
                        <StatusPill status="open" label="2 platser kvar" />
                    </Example>
                    <Example label='status="full"'>
                        <StatusPill status="full" label="Fullt · bli reserv" />
                    </Example>
                    <Example label='status="joined"'>
                        <StatusPill status="joined" label="Med" />
                    </Example>
                    <Example label='status="backup"'>
                        <StatusPill status="backup" label="Reserv nr 1" />
                    </Example>
                    <Example label='status="host"'>
                        <StatusPill status="host" label="Värd" />
                    </Example>
                </Box>
            </Section>

            <Section title="CapacityMeter">
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 300 }}>
                    <Example label="joined={3} max={5}">
                        <Box sx={{ width: 300 }}>
                            <CapacityMeter joined={3} max={5} />
                        </Box>
                    </Example>
                    <Example label="joined={6} max={6} (full)">
                        <Box sx={{ width: 300 }}>
                            <CapacityMeter joined={6} max={6} />
                        </Box>
                    </Example>
                    <Example label='joined={4} max={5} size="large"'>
                        <Box sx={{ width: 300 }}>
                            <CapacityMeter joined={4} max={5} size="large" />
                        </Box>
                    </Example>
                </Box>
            </Section>

            <Section title="DateTile">
                <Box sx={{ display: 'flex', gap: 3 }}>
                    <Example label='size="medium" (default)'>
                        <DateTile date="2026-10-16T20:00:00" />
                    </Example>
                    <Example label='size="small", date={new Date()}'>
                        <DateTile date={new Date()} size="small" />
                    </Example>
                </Box>
            </Section>

            <Section title="GameBanner">
                <Box sx={{ display: 'grid', gap: 3, maxWidth: 400 }}>
                    <Example label='variant="card" (default), no cover'>
                        <Box sx={{ width: 400 }}>
                            <GameBanner name="Valorant" />
                        </Box>
                    </Example>
                    <Example label='variant="detail"'>
                        <Box sx={{ width: 400 }}>
                            <GameBanner name="Valorant" variant="detail" />
                        </Box>
                    </Example>
                    <Example label="coverUrl is a dead link → falls back">
                        <Box sx={{ width: 400 }}>
                            <GameBanner name="Broken link" coverUrl="https://example.com/nope.jpg" />
                        </Box>
                    </Example>
                    <Example label='variant="thumb"'>
                        <GameBanner name="Minecraft" variant="thumb" />
                    </Example>
                </Box>
            </Section>

            <Section title="AvatarStack">
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Example label="4 players, max={5}">
                        <AvatarStack players={players} max={5} />
                    </Example>
                    <Example label='4 players, max={5} size="large"'>
                        <AvatarStack players={players} max={5} size="large" />
                    </Example>
                    <Example label='4 players, max={50} size="small" → +N'>
                        <AvatarStack players={players} max={50} size="small" />
                    </Example>
                    <Example label="0 players, max={4}">
                        <AvatarStack players={[]} max={4} />
                    </Example>
                </Box>
            </Section>

            <Section title="EmptyState">
                <Box sx={{ display: 'grid', gap: 3, maxWidth: 600 }}>
                    <Example label="title + description + action">
                        <Box sx={{ width: 600 }}>
                            <EmptyState
                                title="Inga event för det här spelet än"
                                description="Bli först med att skapa ett!"
                                action={{ label: 'Skapa ett event', to: '/design' }}
                            />
                        </Box>
                    </Example>
                    <Example label="only title">
                        <Box sx={{ width: 600 }}>
                            <EmptyState title="Inget här än" />
                        </Box>
                    </Example>
                </Box>
            </Section>

            <Section title="FilterChips">
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Example label="wrap (default)">
                        <FilterChips label="Filtrera på spel" options={games} selected={game} onChange={setGame} />
                    </Example>
                    <Example label="scroll, in a 360px box (mobile)">
                        <Box sx={{ width: 360 }}>
                            <FilterChips label="Filtrera på spel" options={games} selected={mobileGame} onChange={setMobileGame} scroll />
                        </Box>
                    </Example>
                </Box>
            </Section>

            <Section title="PageHeader">
                <Box sx={{ display: 'grid', gap: 3 }}>
                    <Example label="title + description">
                        <Box sx={{ width: 700 }}>
                            <PageHeader title="Upptäck event" description="Kommande spelkvällar du kan joina direkt." />
                        </Box>
                    </Example>
                    <Example label="title + actions">
                        <Box sx={{ width: 700 }}>
                            <PageHeader title="Mina event" actions={<Button variant="contained">Skapa event</Button>} />
                        </Box>
                    </Example>
                </Box>
            </Section>

            <Section title="EventCard">
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 3 }}>
                    <Example label='status="open", with href'>
                        <Box sx={{ width: '100%' }}>
                            <EventCard
                                title="Fredagsmys 5-stack"
                                gameName="Valorant"
                                timeLabel="fre 30 okt · 20:00–23:00"
                                hostName="Alex K"
                                joined={3}
                                max={5}
                                status="open"
                                statusLabel="2 platser kvar"
                                href="/design"
                            />
                        </Box>
                    </Example>
                    <Example label='status="full"'>
                        <Box sx={{ width: '100%' }}>
                            <EventCard
                                title="Chill 3v3 efter skolan"
                                gameName="Rocket League"
                                timeLabel="ons 28 okt · 16:30–18:00"
                                hostName="Sam L"
                                joined={6}
                                max={6}
                                status="full"
                                statusLabel="Fullt · bli reserv"
                                href="/design"
                            />
                        </Box>
                    </Example>
                    <Example label='status="host", no href (preview)'>
                        <Box sx={{ width: '100%' }}>
                            <EventCard
                                title="Ett väldigt långt eventnamn som går över två rader"
                                gameName="Counter-Strike 2"
                                timeLabel="tor 29 okt · 19:00–21:00"
                                hostName="Du"
                                joined={1}
                                max={4}
                                status="host"
                                statusLabel="Värd"
                            />
                        </Box>
                    </Example>
                </Box>
            </Section>

            <Section title="EventRow">
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 760 }}>
                    <Example label="status + action">
                        <Box sx={{ width: 760 }}>
                            <EventRow
                                date="2026-10-30T20:00:00"
                                title="Fredagsmys 5-stack"
                                subtitle="Valorant · 20:00–23:00 · 3/5"
                                href="/design"
                                status="joined"
                                statusLabel="Med"
                                action={<Button variant="outlined" sx={{ color: 'text.primary' }}>Hoppa av</Button>}
                            />
                        </Box>
                    </Example>
                    <Example label="no pill, no action, no href (past event)">
                        <Box sx={{ width: 760 }}>
                            <EventRow
                                date="2026-10-10T19:00:00"
                                title="Ranked-grind på lördag"
                                subtitle="Valorant · värd: Mia R"
                            />
                        </Box>
                    </Example>
                    <Example label="in a 360px box (mobile)">
                        <Box sx={{ width: 360 }}>
                            <EventRow
                                date="2026-10-29T19:00:00"
                                title="Wingman-träning"
                                subtitle="Counter-Strike 2 · 19:00–21:00 · 1/4"
                                href="/design"
                                status="host"
                                statusLabel="Värd"
                                action={<Button variant="outlined" sx={{ color: 'text.primary' }}>Ändra</Button>}
                            />
                        </Box>
                    </Example>
                </Box>
            </Section>

            <Section title="HostCard">
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    <Example label="default label">
                        <Box sx={{ width: 320 }}><HostCard name="Alex K" /></Box>
                    </Example>
                    <Example label='label="Skapad av"'>
                        <Box sx={{ width: 320 }}><HostCard name="Noor H" label="Skapad av" /></Box>
                    </Example>
                </Box>
            </Section>

            <Section title="ParticipantList">
                <Box sx={{ display: 'grid', gap: 3, maxWidth: 600 }}>
                    <Example label="3 players, max={5}">
                        <Box sx={{ width: 600 }}>
                            <ParticipantList
                                players={[
                                    { id: '1', name: 'Alex K', note: 'Värd' },
                                    { id: '2', name: 'Noor H', gamerTag: 'noorh#4410' },
                                    { id: '3', name: 'Jonas E', gamerTag: 'jonnyE#1337' },
                                ]}
                                max={5}
                            />
                        </Box>
                    </Example>
                    <Example label="2 players, max={20} → capped empty rows">
                        <Box sx={{ width: 600 }}>
                            <ParticipantList
                                players={[
                                    { id: '1', name: 'Noor H', note: 'Värd' },
                                    { id: '2', name: 'Mia R', gamerTag: 'miar#0202' },
                                ]}
                                max={20}
                            />
                        </Box>
                    </Example>
                </Box>
            </Section>

            <Section title="BackupList">
                <Box sx={{ display: 'grid', gap: 3, maxWidth: 600 }}>
                    <Example label="2 people">
                        <Box sx={{ width: 600 }}>
                            <BackupList people={[{ id: '1', name: 'Ida W' }, { id: '2', name: 'Ella S' }]} />
                        </Box>
                    </Example>
                    <Example label="empty list → renders nothing">
                        <Box sx={{ width: 600, minHeight: 20 }}>
                            <BackupList people={[]} />
                        </Box>
                    </Example>
                </Box>
            </Section>

            <Section title="JoinPanel">
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
                    <Example label="open">
                        <Box sx={{ width: 320 }}>
                            <JoinPanel headline="2 platser kvar" joined={3} max={5} message="Du kan hoppa av när som helst innan det börjar.">
                                <Button variant="contained" size="large">Joina</Button>
                                <Button variant="outlined" startIcon={<LinkIcon />} sx={{ color: 'text.primary' }}>Kopiera inbjudningslänk</Button>
                            </JoinPanel>
                        </Box>
                    </Example>

                    <Example label="full">
                        <Box sx={{ width: 320 }}>
                            <JoinPanel headline="Fullt" joined={6} max={6} message="Om någon hoppar av får första reserven platsen.">
                                <Button variant="contained" size="large">Bli reserv</Button>
                            </JoinPanel>
                        </Box>
                    </Example>

                    <Example label="joined">
                        <Box sx={{ width: 320 }}>
                            <JoinPanel headline="1 plats kvar" joined={4} max={5} message="Du är med.">
                                <Button variant="outlined" size="large" sx={{ color: 'text.primary' }}>Hoppa av</Button>
                            </JoinPanel>
                        </Box>
                    </Example>

                    <Example label="backup">
                        <Box sx={{ width: 320 }}>
                            <JoinPanel headline="Fullt" joined={6} max={6} message="Du är nr 3 på reservlistan.">
                                <Button variant="outlined" size="large" sx={{ color: 'text.primary' }}>Lämna reservlistan</Button>
                            </JoinPanel>
                        </Box>
                    </Example>

                    <Example label="time conflict (message with a link)">
                        <Box sx={{ width: 320 }}>
                            <JoinPanel
                                headline="2 platser kvar"
                                joined={3}
                                max={5}
                                message={
                                    <>
                                        Du är redan med i <Link href="/design">Sen lobby: customs</Link> (fre 30 okt, 19:30–21:30), som krockar med det här.
                                    </>
                                }
                            >
                                <Button variant="contained" size="large" disabled>Krockar med ett annat event</Button>
                            </JoinPanel>
                        </Box>
                    </Example>

                    <Example label="host">
                        <Box sx={{ width: 320 }}>
                            <JoinPanel headline="3 platser kvar" joined={1} max={4} message="Du är värd för det här eventet.">
                                <Button variant="contained" size="large">Ändra event</Button>
                                <Button variant="outlined" size="large" sx={{ color: 'text.primary' }}>Ställ in event</Button>
                            </JoinPanel>
                        </Box>
                    </Example>
                </Box>
            </Section>

            <Section title="CalendarEvent">
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    <Example label='look="mine"'>
                        <Box sx={{ width: 160 }}><CalendarEvent title="Wingman-träning" timeLabel="19:00" detail="CS2 · 1/4" look="mine" /></Box>
                    </Example>
                    <Example label='look="open"'>
                        <Box sx={{ width: 160 }}><CalendarEvent title="Fredagsmys 5-stack" timeLabel="20:00" detail="Valorant · 3/5" look="open" /></Box>
                    </Example>
                    <Example label='look="full"'>
                        <Box sx={{ width: 160 }}><CalendarEvent title="Chill 3v3" timeLabel="16:30" detail="Rocket League · 6/6" look="full" /></Box>
                    </Example>
                    <Example label='compact'>
                        <Box sx={{ width: 120 }}><CalendarEvent title="Fredagsmys 5-stack" timeLabel="20:00" shortLabel="Valorant" look="open" compact /></Box>
                    </Example>
                </Box>
            </Section>

            <Section title="CalendarToolbar + WeekView / MonthView + CalendarLegend">
                <Example label="toolbar switches the view below (arrows do nothing in the demo)">
                    <CalendarToolbar
                        label={calendarView === 'week' ? '26 okt – 1 nov 2026' : 'oktober 2026'}
                        view={calendarView}
                        onViewChange={setCalendarView}
                        onPrev={() => {}}
                        onNext={() => {}}
                        onToday={() => {}}
                    />
                </Example>
                <Box sx={{ width: '100%' }}>
                    {calendarView === 'week' ? (
                        <WeekView weekStart={new Date('2026-10-26T00:00:00')} items={calendarItems} />
                    ) : (
                        <MonthView month={new Date('2026-10-01T00:00:00')} items={calendarItems} />
                    )}
                    <CalendarLegend />
                </Box>
            </Section>

            <Section title="ProfileHeader">
                <Example label="name + subtitle + stats + action">
                    <Box sx={{ width: 760 }}>
                        <ProfileHeader
                            name="Alex K"
                            subtitle="Medlem sedan sep 2026"
                            stats={[
                                { label: 'event', value: 12 },
                                { label: 'som värd', value: 4 },
                                { label: 'spel', value: 3 },
                            ]}
                            action={<Button variant="outlined" sx={{ color: 'text.primary' }}>Redigera profil</Button>}
                        />
                    </Box>
                </Example>
            </Section>

            <Section title="UserGameList">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    <Example label="with onAdd + onEdit (own profile)">
                        <Box sx={{ width: 380 }}>
                            <UserGameList
                                games={[
                                    { id: 1, name: 'Valorant', gamerTag: 'alexk#EUW' },
                                    { id: 2, name: 'Rocket League', gamerTag: 'AlexK_RL' },
                                    { id: 3, name: 'Minecraft' },
                                ]}
                                onAdd={() => {}}
                                onEdit={() => {}}
                            />
                        </Box>
                    </Example>
                    <Example label="read only (someone elses profile)">
                        <Box sx={{ width: 380 }}>
                            <UserGameList title="Spel" games={[{ id: 1, name: 'Valorant', gamerTag: 'noorh#4410' }]} />
                        </Box>
                    </Example>
                    <Example label="empty">
                        <Box sx={{ width: 380 }}>
                            <UserGameList games={[]} onAdd={() => {}} />
                        </Box>
                    </Example>
                </Box>
            </Section>

            <Section title="DangerZone + ConfirmDialog">
                <Example label="click the button to open the dialog">
                    <Box sx={{ width: 600 }}>
                        <DangerZone title="Radera konto" description="Ditt konto, dina spel och gamertags raderas för alltid.">
                            <Button variant="outlined" onClick={() => setConfirmOpen(true)}>Radera mitt konto</Button>
                        </DangerZone>
                    </Box>
                </Example>
                <ConfirmDialog
                    open={confirmOpen}
                    title="Vill du radera ditt konto?"
                    description="Det går inte att ångra."
                    confirmLabel="Radera för alltid"
                    cancelLabel="Behåll mitt konto"
                    checkboxLabel="Jag fattar att det inte går att ångra"
                    onConfirm={() => setConfirmOpen(false)}
                    onClose={() => setConfirmOpen(false)}
                />
            </Section>

            <Section title="FormSection + NumberStepper">
                <Example label="FormSection with a TextField and a NumberStepper inside">
                    <Box sx={{ width: 600 }}>
                        <FormSection title="3. Tid & spelare">
                            <TextField label="Namn på eventet" />
                            <NumberStepper
                                label="Max antal spelare (med dig)"
                                value={maxPlayers}
                                onChange={setMaxPlayers}
                                min={2}
                                max={50}
                                decreaseLabel="Färre spelare"
                                increaseLabel="Fler spelare"
                                helperText="De som joinar när det är fullt hamnar på reservlistan."
                            />
                        </FormSection>
                    </Box>
                </Example>
            </Section>

            <Section title="GamePickerList">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    <Example label='variant="list" (add game dialog)'>
                        <Box sx={{ width: 420 }}>
                            <GamePickerList label="Sökresultat" games={pickerGames} selectedId={pickedGame} onSelect={setPickedGame} />
                        </Box>
                    </Example>
                    <Example label='variant="tiles" (skapa event)'>
                        <Box sx={{ width: 420 }}>
                            <GamePickerList label="Välj spel" games={pickerGames} selectedId={pickedTile} onSelect={setPickedTile} variant="tiles" />
                        </Box>
                    </Example>
                    <Example label="empty">
                        <Box sx={{ width: 420 }}>
                            <GamePickerList label="Sökresultat" games={[]} selectedId={null} onSelect={() => {}} />
                        </Box>
                    </Example>
                </Box>
            </Section>
        </Box>
    );
}