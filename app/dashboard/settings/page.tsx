import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const Settings = () => {
  return (
    <div className="flex h-full items-center justify-center">
        <UserProfile />
    </div>
  )
}

export default Settings