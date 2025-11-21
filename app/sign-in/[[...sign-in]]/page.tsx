import { SignIn } from '@clerk/nextjs'
import React from 'react'

const page = () => {
    return (
        <main className='flex flex-col justify-center items-center'>
            <SignIn />
        </main>
    )
}

export default page