"use client"
import Navigation from './components/Navigation'
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function layout({children}) {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
    console.log(session);
  }, [session]);
  return (
    <div className='h-[100vh] w-[100vw] flex'>
        <Navigation/>
        {children}
    </div>
  )
}
