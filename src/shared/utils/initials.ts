// "Alex K" -> "AK", no name '?' so the app doesn't crash
export function initials(name: string) {
    if (!name?.trim()) {
        return '?';
    }

    return name.trim().split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
}