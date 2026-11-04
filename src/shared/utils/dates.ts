// all the date stuff the calendar needs, weeks start on monday like in sweden

export function startOfDay(d: Date): Date {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
}

export function addDays(d: Date, days: number): Date {
    const x = new Date(d);
    x.setDate(x.getDate() + days);
    return x;
}

// getDay() says sunday is 0, this shifts it so monday is 0 and sunday is 6
export function startOfWeek(d: Date): Date {
    const x = startOfDay(d);
    const offset = (x.getDay() + 6) % 7;
    return addDays(x, -offset);
}

export function startOfMonth(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function addMonths(d: Date, months: number): Date {
    return new Date(d.getFullYear(), d.getMonth() + months, 1);
}

export function isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

// the 42 days (6 weeks) shown in month view, starts on the monday before the 1st
export function monthGrid(d: Date): Date[] {
    const first = startOfWeek(startOfMonth(d));
    return Array.from({ length: 42 }, (_, i) => addDays(first, i));
}