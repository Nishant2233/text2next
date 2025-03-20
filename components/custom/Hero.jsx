"use client"

import React, { useContext, useState } from 'react';
import Lookup from '../../data/Lookup';
import { ArrowRight, Link } from 'lucide-react';
import Colors from '@/data/Colors';
import { MessagesContext } from '@/contex/MessagesContext';
import { Content } from 'next/font/google';
import { UserDetailContext } from '@/contex/UserDetailContext';
import SignInDialog from './SignInDialog';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';



function Hero() {
  const [userInput, setuserInput] = useState('');
  const { messages, setMessages } = useContext(MessagesContext)
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false)
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();

  const onGenerate = async (input) => {
    if (!userDetail?.name) {
      setOpenDialog(true);

      return;

    }
    const msg = {
      role: 'user',
      Content: input
    }

    setMessages([msg]);
    ;

    const workspaceID = await CreateWorkspace({
      user: userDetail._id,
      message: [msg]
    });
    console.log(workspaceID);
    router.push(`/workspace/` + workspaceID);

  }

  return (
    <div className='flex flex-col justify-center items-center h-full w-full px-4 text-center'>

      <h2 className='font-bold text-4xl'>{Lookup.HERO_HEADING}</h2>
      <p className='text-gray-300 font-medium'>{Lookup.HERO_DESC}</p>
      <div className='p-5 border rounded-xl max-w-xl w-full mt-3'
        style={{ backgroundColor: Colors.BACKGROUND }}>
        <div className='flex gap-2'>
          <textarea placeholder={Lookup.INPUT_PLACEHOLDER}
            onChange={(event) => setuserInput(event.target.value)}
            className='outline-none bg-transparent w-full h-32 max-h-56 resize' />

          {userInput && <ArrowRight
            onClick={() => onGenerate(userInput)}
            className='bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer' />}

        </div>
        <div>
          <Link className='h-5 w-5' />
        </div>

      </div>
      <div className='flex mt-6 flex-wrap max-w-2xl items-center justify-center gap-3'>
        {Lookup?.SUGGSTIONS.map((suggesion, index) => (
          <h2
            onClick={() => onGenerate(suggesion)}
            className='p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer'
            key={index}>{suggesion}</h2>
        ))}
      </div>
      <SignInDialog openDialog={openDialog} closeDialog={(v) => setOpenDialog(v)} />

    </div>
  )
}

export default Hero