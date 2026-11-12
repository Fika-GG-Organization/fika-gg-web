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

/**
 * Turns two dates into a string formatted like so: `"fre 30 okt · 20:00–23:00"`.
 * @param start Represents an event's start date & time.
 * @param end Represents an event's end date & time.
 * @returns A formatted string.
 */
export function formatEventTime2(start: Date, end: Date): string {
	return `${formatLocaleDate(start)} · ${formatLocaleTime(start)}–${formatLocaleTime(end)}`;
}

/** Turns time into formatted string. Example: `"12:30"`. */
export function formatLocaleTime(d: Date, local?: Intl.LocalesArgument): string {
	return new Date(d).toLocaleTimeString(local ?? "sv-SE", { hour: "2-digit", minute: "2-digit" });
}

/** Turns date into formatted string. Example: `"tor 30 okt"` */
export function formatLocaleDate(d: Date, local?: Intl.LocalesArgument): string {
	return new Date(d)
		.toLocaleDateString(local ?? "sv-SE", { month: "short", weekday: "short", day: "2-digit" })
		.replace(/\./g, "");
}
