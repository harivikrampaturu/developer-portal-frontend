// src/app/docs/[slug]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    return {
        title: `${slug} Documentation`,
        description: `Documentation for ${slug}`
    };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return (
        <div>
            <h1>{slug} Documentation</h1>
        </div>
    );
}
