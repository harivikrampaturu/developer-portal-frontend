import ClientLayout from './layout.client';
import { Metadata } from 'next';
import { metadata as MainMetadata } from './metadata';

export const metadata: Metadata = MainMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}