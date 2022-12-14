import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function RedirectToHomoePage(): any {
  const { push } = useRouter();

  useEffect(() => {
    push('/home');
  }, []);

  return [];
}
