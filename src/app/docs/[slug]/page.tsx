import { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  return {
    title: `${slug} Documentation`,
    description: `Documentation for ${slug}`,
  };
}

export default function DocPage({ params }: Props) {
  const { slug } = params;

  return (
    <div>
      <h1>{slug} Documentation</h1>
    </div>
  );
}