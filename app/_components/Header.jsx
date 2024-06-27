"use client";
import React, { useEffect, useState, useCallback } from 'react';
import Image from "next/image";
import { Button } from '/components/ui/button';
import { useSession, useUser, useDescope } from '@descope/nextjs-sdk/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "/components/ui/dropdown-menu";
import Link from 'next/link';

function Header() {
  const { isAuthenticated, isSessionLoading, sessionToken } = useSession();
  const { user, isUserLoading } = useUser();
  const sdk = useDescope();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!isSessionLoading && !isUserLoading) {
      setLoggedIn(isAuthenticated);
    }
  }, [isAuthenticated, isSessionLoading, isUserLoading, sessionToken, user]);

  const handleLoginButtonClick = () => {
    // Open the auth page in the same window and handle the login callback
    window.location.href = '/auth';
  };

  const handleLogout = useCallback(() => {
    sdk.logout().then(() => {
      setLoggedIn(false); // Update state after logout
    });
  }, [sdk]);

  if (isSessionLoading || isUserLoading) {
    return <p></p>;
  }

  return (
    <div className="p-5 shadow-sm flex justify-between">
      <div className="flex items-center gap-8">
        <Image src='/logo.svg' alt='logo' width={150} height={90} />
        <div className="md:flex items-center gap-6 hidden">
          <Link href={'/'} className='hover:scale-105 hover:text-primary cursor-pointer'>Home</Link>
          <Link href={'/'} className='hover:scale-105 hover:text-primary cursor-pointer'>Services</Link> {/* Update this line */}
          <Link href={'/'} className='hover:scale-105 hover:text-primary cursor-pointer'>About Us</Link>
        </div>
      </div>
      <div>
        {loggedIn ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image
                  src={user.picture}
                  alt='user'
                  width={40}
                  height={40}
                  className='rounded-full'
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={'/mybooking'}>My Booking</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button onClick={handleLoginButtonClick}>Login / Sign Up</Button>
        )}
      </div>
    </div>
  );
}

export default Header;
