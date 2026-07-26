'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const ORIGINS: Record<string, { href: string; label: string }> = {
    problems: { href: '/problems', label: '← Back to Problems' },
    rules: { href: '/rules', label: '← Back to Rules' }
};

function useFromParam() {
    const searchParams = useSearchParams();
    return searchParams.get('from');
}

interface BackLinkProps {
    className?: string;
    style?: React.CSSProperties;
}

export function BackLink({ className, style }: BackLinkProps) {
    const from = useFromParam();
    const origin = from ? ORIGINS[from] : undefined;
    const href = origin?.href ?? '/';
    const label = origin?.label ?? '← Back to CodeDuel';

    return (
        <Link href={href} className={className} style={style}>
            {label}
        </Link>
    );
}

interface FooterLegalLinksProps {
    style?: React.CSSProperties;
    linkStyle?: React.CSSProperties;
}

export function FooterLegalLinks({ style, linkStyle }: FooterLegalLinksProps) {
    const from = useFromParam();
    const suffix = from && ORIGINS[from] ? `?from=${from}` : '';

    return (
        <div style={style}>
            <Link href={`/privacy${suffix}`} style={linkStyle}>Privacy Policy</Link>
            <Link href={`/terms${suffix}`} style={linkStyle}>Terms of Service</Link>
        </div>
    );
}
