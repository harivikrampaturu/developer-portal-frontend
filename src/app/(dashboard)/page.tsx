
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import HomeClient from './HomeClient';

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt-dev');

  if (!token) {
    redirect('/auth/login');
  }

  return <HomeClient />;
}
