import React from 'react'
import ProfilePicture from './ProfilePicture'
import LogOut from './LogOut'
import People from './People'
import Chats from './Chats'

function Navigation() {
  return (
    <div className='h-full gap-4 w-20 border-r-2 bg-gray-50 flex flex-col items-center p-4'>
      <Chats />
      <People/>
      <LogOut />
      <ProfilePicture/>
    </div>
  )
}

export default Navigation