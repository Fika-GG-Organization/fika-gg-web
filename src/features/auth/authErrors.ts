// identity sends english error codes, this turns them into swedish
const messages: Record<string, string> = {
    DuplicateUserName: 'Det finns redan ett konto med den e-posten.',
    DuplicateEmail: 'Det finns redan ett konto med den e-posten.',
    InvalidEmail: 'E-postadressen ser inte rätt ut.',
    PasswordTooShort: 'Lösenordet måste vara minst 6 tecken.',
    PasswordRequiresUpper: 'Lösenordet behöver en stor bokstav (A-Z).',
    PasswordRequiresLower: 'Lösenordet behöver en liten bokstav (a-z).',
    PasswordRequiresDigit: 'Lösenordet behöver en siffra (0-9).',
    PasswordRequiresNonAlphanumeric: 'Lösenordet behöver ett specialtecken, t.ex. ! eller ?',
};

const fallback = 'Kunde inte skapa kontot. Testa igen.';

// takes the error body from the api and gives back one sentence or more
export function registerErrorMessage(data: unknown): string {
    const errors = (data as { errors?: Record<string, string[]> } | undefined)?.errors;

    if (!errors) {
        return fallback;
    }

    // new Set removes duplicates, identity sends both DuplicateUserName and DuplicateEmail
    const lines = [...new Set(Object.keys(errors).map((code) => messages[code]).filter(Boolean))];

    return lines.length > 0 ? lines.join(' ') : fallback;
}