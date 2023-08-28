"use client"
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import React from 'react'

function ProfilePicture() {
  const {data : session} = useSession();
  const src = session?.user?.image;
  return (
    <img src={src} height={60} width={60} className=' mt-auto rounded-full'/>
  )
}

export default ProfilePicture