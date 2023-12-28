"use client"

import { EyeFilledIcon } from '@/components/icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from '@/components/icons/EyeSlashFilledIcon';
import { MailIcon } from '@/components/icons/MailIcon';
import { Button } from '@nextui-org/button';
import { Input, Link } from '@nextui-org/react';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/services/auth/auth.context';

export default function Login() {
  const router = useRouter();
  const { auth } = useAuthContext();

  const loginUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const errors = await auth?.login(
      formData.get('email')?.toString() || "",
      formData.get('password')?.toString() || ""
    )

    if (errors && errors?.length <= 0) {
      router.push('/dashboard');
    }
  }

  return (
    <div>
      <form onSubmit={loginUser}>
        <div className="px-10 py-10 bg-gray-300 min-w-[550px] flex flex-col gap-5">

          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              labelPlacement="outside"
              color='primary'
              name='email'
              id='email'
              startContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />

          </div>

          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              labelPlacement="outside"
              color='primary'
              name='password'
              id='password'
            />

          </div>

          <div>
          </div>

          <div className="flex w-full flex-col flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <div>
              <Link
                className='text-sm'
                size='sm'
                underline='always'
                href="/auth/register">Not a member? Register</Link>
            </div>
            <Button
              fullWidth
              color='primary'
              type='submit'
            >Login</Button>
          </div>

        </div>
      </form>
    </div>

  )
}