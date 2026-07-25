'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

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
    const href = from === 'problems' ? '/problems' : '/';
    const label = from === 'problems' ? '← Back to Problems' : '← Back to DuelAI';

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
    const suffix = from === 'problems' ? '?from=problems' : '';

    return (
        <div style={style}>
            <Link href={`/privacy${suffix}`} style={linkStyle}>Privacy Policy</Link>
            <Link href={`/terms${suffix}`} style={linkStyle}>Terms of Service</Link>
        </div>
    );
}
