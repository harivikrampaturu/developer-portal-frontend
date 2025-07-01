import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Authentication - Developer Portal',
    description: 'Sign in to your developer portal account',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
