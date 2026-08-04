// Every request-body field that ends up inside a Mongoose query filter must be
// confirmed to be the primitive type the schema expects before it's used —
// Mongoose passes '$'-prefixed keys in a field's value straight through to
// MongoDB as query operators (e.g. {"email": {"$ne": null}} matches any
// non-null email), so an unchecked field lets a client bypass the intended
// filter. These guards close that off at every route that takes user input.

export function validateUsername(username: unknown): string | null {
    if (typeof username !== 'string') return 'Username must be text';
    if (username.length < 3 || username.length > 20) return 'Username must be between 3 and 20 characters';
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) return 'Username can only contain letters, numbers, underscores, and hyphens';
    return null;
}

export function validateEmail(email: unknown): string | null {
    if (typeof email !== 'string') return 'Email must be text';
    if (email.length > 254) return 'Email is too long';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address';
    return null;
}

export function isValidObjectId(value: unknown): value is string {
    return typeof value === 'string' && /^[0-9a-fA-F]{24}$/.test(value);
}

export const SUPPORTED_LANGUAGES = ['python', 'javascript', 'java', 'typescript', 'cpp', 'c', 'csharp', 'rust', 'go'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

export function isValidLanguage(value: unknown): value is SupportedLanguage {
    return typeof value === 'string' && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}
