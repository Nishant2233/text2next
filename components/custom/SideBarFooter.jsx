import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

function SideBarFooter() {
  const options = [
    {
      name: "Settings",
      icon: Settings
    },
    {
      name: "Help Center",
      icon: HelpCircle
    },
    {
      name: "My Subscription",
      icon: Wallet
    },
    {
      name: "Sign Out",
      icon: LogOut
    }
  ]

  return (
    <div className='p-3  mb-10'>
      {options.map((option, index) => (
        <Button
          key={index}
          variant="ghost"
          className='flex gap-2 items-center w-full justify-start my-2'>
          <option.icon className='h-5 w-5' />
         {option.name}
        </Button>
      ))}
    </div>
  )
}

export default SideBarFooter
