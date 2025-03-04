'use server';

import { redirect } from 'next/navigation';
import { signIn } from '@/auth';

export default async (prevState: any, formData: FormData) => {
  if (!formData.get('id') || !(formData.get('id') as string)?.trim()) {
    return { message: 'no_id' };
  }
  if (!formData.get('name') || !(formData.get('name') as string)?.trim()) {
    return { message: 'no_name' };
  }
  if (!formData.get('password') || !(formData.get('password') as string)?.trim()) {
    return { message: 'no_password' };
  }
  if (!formData.get('image')) {
    return { message: 'no Image' };
  }
  formData.set('nickname', formData.get('name') as string);
  let shouldRedirect = false;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    console.log(response.status);
    if (response.status === 403) {
      return { message: 'user_exists' };
    } else if (response.status === 400) {
      return {
        message: (await response.json()).data[0],
        id: formData.get('id'),
        nickname: formData.get('nickname'),
        password: formData.get('password'),
        image: formData.get('image'),
      };
    }
    console.log(await response.json());
    shouldRedirect = true;
    await signIn('credentials', {
      username: formData.get('id'),
      password: formData.get('password'),
      redirect: false,
    });
  } catch (err) {
    console.log(err);
    return;
  }

  if (shouldRedirect) {
    redirect('/home'); // try catch 안에서 사용 X
  }
  return { message: null };
};
