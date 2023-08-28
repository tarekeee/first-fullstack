"use client"
import { signOut } from "next-auth/react"
import { CiLogout } from "react-icons/ci"
export default function LogOut() {
  return (
    <CiLogout className="h-8 w-8 hover:cursor-pointer active:bg-gray-200 rounded-full " onClick={() => signOut({redirect: true, callbackUrl:"/"})}/>
  )
}
