import React from 'react'
import {AiOutlinePlus} from "react-icons/ai"
import createConvo from '../lib/createConvo'
export default function Header({setActive}) {
  return (
    <div className='w-full mb-2 h-16 border-b-2 flex items-center p-3 pt-5 text-3xl font-semibold'>Chats 
    <AiOutlinePlus  onClick={(e) => setActive((prev) => !prev)} className=' hover:cursor-pointer ml-auto w-6 h-6 box-content p-0.5 border-2'/>
    </div>
  )
}
