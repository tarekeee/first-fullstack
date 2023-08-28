"use client"
import React from 'react'
import {CiChat1} from "react-icons/ci"
import { useRouter } from 'next/navigation';
export default function Chats() {
  const router = useRouter();
  return (
    <CiChat1 className='h-8 w-8 hover:cursor-pointer' onClick={() =>{router.push("/dashboard/chats")}}/>
  )
}
