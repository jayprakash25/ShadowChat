'use client';

import React from 'react'
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth'
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


const Navbar = () => {

    const {data: session} = useSession()

    const user: User = session?.user

  return (
    // <nav className='p-4 md:p-6 shadow-md'>
    //     <div className='flex flex-col md:flex-row justify-between items-center'>
    //     <a href='#' className='font-semibold'>Shadow Chat</a>
    //     {
    //         session ? (
    //             <>
    //             <span className='font-semibold'>Welcome, {user.username || user.email}</span>
    //             <Button className='w-full md:w-auto' onClick={() => {signOut()}}>Log-Out</Button>
    //             </>
    //         ) : (
    //             <Link href={'/signin'}><Button className='w-full md:w-auto'>LogIn</Button></Link>
    //         )
    //     }</div>
        
    // </nav>
    <header className="bg-background sticky top-0 z-40 dark:bg-muted flex items-center justify-between h-16 px-4 md:px-6 border-b border-input dark:border-muted">
      <Link
        href={`${user ? "/" : "/signin"}`}
        className="flex items-center gap-2 text-lg font-semibold"
        prefetch={false}
      >
        <span className="text-lg font-semibold">Shadow Chat</span>
      </Link>

      {session ? (
        <>
          
          <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.name?.charAt(0)} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href='/profile'>
                <DropdownMenuItem>My Account</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    signOut();
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      ) : (
        <Link href="/signin" prefetch={false}>
          <Button>Login</Button>
        </Link>
      )}
    </header>
)
}

export default Navbar