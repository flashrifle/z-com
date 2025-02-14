'use client';

import { useRouter } from 'next/navigation';
import Main from '@/app/(beforeLogin)/_component/Main';
import { useSession } from 'next-auth/react';

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session?.user) {
    router.replace('/home');
    return null;
  }

  router.replace('/i/flow/login');
  return <Main />;
}

// router.push
// localhost:3000 -> localhost:3000/login -> localhost:3000/i/flow/login

// router.replace
// localhost:3000 -> localhost:3000/login -> localhost:3000/i/flow/login

// push 는 히스토리가 남아 redirect 된 이전 페이지로 가려고 하고
// replace 는 히스토리가 남지않아 redirect 된 페이지로 가지않음 상황에 맞게 잘 사용하자.
