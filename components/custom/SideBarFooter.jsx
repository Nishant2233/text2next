import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react'
import React, { useContext } from 'react'
import { Button } from '../ui/button'
import { UserDetailContext } from '@/contex/UserDetailContext'
import { useRouter } from 'next/navigation'
import { useSidebar } from '../ui/sidebar'

function SideBarFooter() {
  const { setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();
  const { setOpen } = useSidebar();

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUserDetail(null);
    setOpen(false);
    router.push('/');
  };

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
      icon: LogOut,
      onClick: handleSignOut
    }
  ]

  return (
    <div className='p-3 mb-10'>
      {options.map((option, index) => (
        <Button
          key={index}
          variant="ghost"
          onClick={option.onClick}
          className='flex gap-2 items-center w-full justify-start my-2'
        >
          <option.icon className='h-5 w-5' />
          {option.name}
        </Button>
      ))}
    </div>
  )
}

export default SideBarFooter
