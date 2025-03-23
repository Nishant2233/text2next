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

    const workspaceID = await CreateWorkspace({
      user: userDetail._id,
      message: [msg]
    });
    console.log(workspaceID);
    router.push(`/workspace/` + workspaceID);
  }

  return (
    <div className='absolute inset-0 flex flex-col justify-center items-center w-full overflow-y-auto py-8 md:py-12'>
      <div className='w-full max-w-[90%] md:max-w-[80%] lg:max-w-[1200px] mx-auto flex flex-col items-center px-4'>
        <div className='w-full text-center mb-8 md:mb-12'>
          <h2 className='font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-3 md:mb-4'>{Lookup.HERO_HEADING}</h2>
          <p className='text-gray-400 font-medium text-sm md:text-base'>{Lookup.HERO_DESC}</p>
        </div>

        <div className='w-full max-w-[800px] mx-auto'>
          <div className='p-3 md:p-4 border border-gray-800 rounded-xl w-full bg-[#111111]'>
            <div className='flex gap-2 items-start'>
              <textarea 
                placeholder={Lookup.INPUT_PLACEHOLDER}
                onChange={(event) => setuserInput(event.target.value)}
                value={userInput}
                className='outline-none bg-transparent w-full h-24 md:h-32 max-h-56 resize-none text-gray-300 placeholder:text-gray-500 text-sm md:text-base' 
              />
              {userInput && (
                <button 
                  onClick={() => onGenerate(userInput)}
                  className='bg-blue-600 hover:bg-blue-700 transition-colors p-2 rounded-md cursor-pointer mt-1 flex-shrink-0'
                >
                  <ArrowRight className='h-4 w-4 md:h-5 md:w-5' />
                </button>
              )}
            </div>
            <div className='flex items-center mt-2'>
              <Link className='h-4 w-4 text-gray-500' />
            </div>
          </div>
        </div>
        
        <div className='w-full mt-6 md:mt-8'>
          <div className='flex flex-wrap items-center justify-center gap-2 px-2 md:px-4'>
            {Lookup?.SUGGSTIONS.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onGenerate(suggestion)}
                className='px-2.5 md:px-3 py-1 md:py-1.5 bg-[#111111] border border-gray-800 rounded-full text-xs md:text-sm text-gray-400 hover:text-white hover:border-gray-700 transition-colors cursor-pointer whitespace-nowrap'
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
      <SignInDialog openDialog={openDialog} closeDialog={(v) => setOpenDialog(v)} />
    </div>
  )
}

export default Hero