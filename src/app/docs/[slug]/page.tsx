import { Metadata } from 'next';

type Params = { params: { slug: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = params;
  return {
    title: `${slug} Documentation`,
    description: `Documentation for ${slug}`,
  };
}

export default function DocPage({ params }: Params) {
  const { slug } = params;

  return (
    <div>
      <h1>{slug} Documentation</h1>
    </div>
  );
}