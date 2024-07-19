'use client';

import React from 'react'
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth'
import { Button } from './ui/button';

const Navbar = () => {

    const {data: session} = useSession()

    const user: User = session?.user

  return (
    <nav className='p-4 md:p-6 shadow-md'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
        <a href='#' className='font-semibold'>Shadow Chat</a>
        {
            session ? (
                <>
                <span className='font-semibold'>Welcome, {user.username || user.email}</span>
                <Button className='w-full md:w-auto' onClick={() => {signOut()}}>Log-Out</Button>
                </>
            ) : (
                <Link href={'/signin'}><Button className='w-full md:w-auto'>LogIn</Button></Link>
            )
        }</div>
        
    </nav>
)
}

export default Navbar