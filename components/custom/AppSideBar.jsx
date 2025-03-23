import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
import Image from 'next/image';
import { Button } from '../ui/button';
import { MessageCircleCode, X } from 'lucide-react';
import WorkspaceHistory from './WorkspaceHistory';
import SideBarFooter from './SideBarFooter';
import { useSidebar } from '../ui/sidebar';

function AppSidebar() {
  const { setOpen } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader className='p-3 relative'>
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute right-2 top-2"
          onClick={() => setOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>
        <Image src={"/download (2).png"} alt="logo" width={70} height={70} />
        <Button className="mt-5 w-full">
          <MessageCircleCode className="mr-2" />
          Start New Chat
        </Button>
      </SidebarHeader>
      <SidebarContent className={'p-5'}>
        <SidebarGroup>
          <WorkspaceHistory/>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SideBarFooter/>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar