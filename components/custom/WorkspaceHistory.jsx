"use client"


import React, { useEffect } from 'react'
import { useContext } from 'react'  
import { useConvex } from 'convex/react'
import { UserDetailContext } from '@/contex/UserDetailContext'
import { api } from '@/convex/_generated/api'
import { useState } from 'react'

import { useSidebar } from '../ui/sidebar'
import Link from 'next/link'

function WorkspaceHistory() {
    const{userDetail,setUserDetail}=useContext(UserDetailContext);
    const convex=useConvex();
    const [workspaceList,setWorkspaceList]=useState([]);
    const {toggleSidebar}=useSidebar

    useEffect(()=>{
        userDetail&&GetAllWorkspace();
    },[userDetail])
    const GetAllWorkspace=async()=>{
        const result = await convex.query(api.workspace.GetAllWorkspace, { userId: userDetail?._id });
        setWorkspaceList(result);
        console.log(result);
    }

  return (
    <div>
        <h2 className='font-medium text-lg'>Your Chats</h2>
        <div>
        {workspaceList && workspaceList.map((workspace, index) => {
    return (
        <Link href={'/workspace/'+workspace?._id} key={index} >
        <h2  onClick={toggleSidebar} key={index} className='text-sm text-gray-400 mt-2 font-light hover:text-white cursor-pointer '>
            {workspace?.message[0]?.Content}
        </h2>
        </Link>
    )
})}



        </div>
    </div>
  )
}

export default WorkspaceHistory