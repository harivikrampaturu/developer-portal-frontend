import { Metadata } from 'next';

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.slug} Documentation`,
    description: `Documentation for ${params.slug}`,
  }
}

export default function DocPage({ params }: Props) {
  return (
    <div>
      <h1>{params.slug} Documentation</h1>
    </div>
  )
} 