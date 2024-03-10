'use client'

import { ChangePassword } from '@/containers/Account/ChangePassword'
import { useAuthContext } from '@/containers/Auth/Auth.context';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const ChangePasswordPage = () => {
  const router = useRouter();

  const { token } = useAuthContext();

  useEffect(() => {
    if (!token) router.replace('/signin');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChangePassword />
  )
}

export default ChangePasswordPage