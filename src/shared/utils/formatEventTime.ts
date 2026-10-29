// turns two iso strings into "fre 30 okt · 20:00–23:00"
export function formatEventTime(start: string, end: string): string {
    const s = new Date(start);
    const e = new Date(end);

    // sv-SE adds dots after short names like "okt." so we strip them
    const day = s
        .toLocaleDateString('sv-SE', { weekday: 'short', day: 'numeric', month: 'short' })
        .replace(/\./g, '');

    const time = (d: Date) => d.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });

    return `${day} · ${time(s)}–${time(e)}`;
}