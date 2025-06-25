// src/app/docs/[slug]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `${params.slug} Documentation`,
    description: `Documentation for ${params.slug}`,
  };
}

export default function DocPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div>
      <h1>{params.slug} Documentation</h1>
    </div>
  );
}
