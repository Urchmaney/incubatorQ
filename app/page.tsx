import { Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      <div className='flex justify-end gap-3 p-2'>

        <Link href="/auth/login">
          <Button radius="full" className="">
            Login
          </Button>
        </Link>



        <Link href="/auth/register">
          <Button radius="full" className="">
            Register
          </Button>
        </Link>

      </div>
      <div className='flex items-center justify-center p-24 h-fit grow'>
        <div className=' flex justify-center items-center p-6 bg-neutral-300 h-44 w-[30%] text-lg'>
          IncubatorQ
        </div>
      </div>

    </main>
  )
}
