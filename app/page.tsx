import { Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      <div className='flex justify-between p-2'>
        <div>
          
        </div>

        <div className='flex gap-3'>
          <Link href="/auth/login">
            <Button radius="full" className="bg-secondary text-white">
              Login
            </Button>
          </Link>



          <Link href="/auth/register">
            <Button radius="full" className="bg-primary">
              Register
            </Button>
          </Link>
        </div>


      </div>
      <div className='flex items-center justify-center p-24 h-fit grow'>
        <div className=' flex justify-center items-center p-6 h-44 w-[30%] text-5xl'>
          IncubatorQ
        </div>
      </div>

    </main>
  )
}
