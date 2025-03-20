"use client"
import React, { useEffect, useContext, use } from 'react' 

import { useParams } from 'next/navigation'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { MessagesContext } from '@/contex/MessagesContext'
import Colors from '@/data/Colors'
import Image from 'next/image'
import { UserDetailContext } from '@/contex/UserDetailContext'
import {ArrowRight, Link, Loader2Icon } from 'lucide-react'
import Lookup from '../../data/Lookup';
import { useState } from 'react'
import axios from 'axios'
import Prompt from '../../data/Prompt'

import { useMutation } from 'convex/react'
import { useSidebar } from '../ui/sidebar'




function ChatView() {

    const{id}=useParams();
    const convex=useConvex();
    const {userDetail,setUserDetail}=useContext(UserDetailContext);
    const {messages, setMessages } = useContext(MessagesContext);
    const [userInput, setuserInput]=useState("");
    const [loading,setLoading]=useState(false);
   const UpdateMessages=useMutation(api.workspace.UpdateMessages);
   const{toggleSidebar}=useSidebar();
  


    useEffect(() => {
       id&&GetWorkspaceData();
      }, [id])


   const GetWorkspaceData=async()=>{
    const result = await convex.query(api.workspace.GetWorkspace, { workspaceID: id });

    setMessages(result?.message);
      console.log(result);
    
    }
    useEffect(() => {
        if(messages?.length>0){
            const role=messages[messages?.length-1]?.role;
            if(role=='user'){
                GetAiResponse();
            }
        }
    },[messages])


   const GetAiResponse=async()=>{
    setLoading(true);
    const PROMPT=JSON.stringify(messages)+Prompt.CHAT_PROMPT;
    const result=await axios.post('/api/ai-chat',{prompt:PROMPT});

    console.log(result.data.result);
    const aiResp={
        role:'ai',
        Content:result.data.result
    }
    setMessages(prev=>[...prev,aiResp])
    await UpdateMessages({
        message:[...messages,aiResp],
        workspaceID:id
    })
    setLoading(false);
   }

  const onGenerate= (input)=>{
    setMessages(prev=>[...prev,{
        role:'user',
        Content:input
    }])
    setuserInput('');
  }




   useEffect(() => {
      
   }, [messages])

  return (
    <div className='relative h-[85vh] flex flex-col'>
        <div className='flex-1 overflow-y-scroll [&::-webkit-scrollbar]:hidden scrollbar-hide pl-5'>

        {messages?.map((msg, index) => (
  <div key={index}
  className='p-3 rounded-lg mb-2 flex gap-2 items-start'
  style={{backgroundColor:Colors.CHAT_BACKGROUND}}>
    {msg?.role=='user'&&
    <Image src={userDetail?.picture} alt='userImage' width={30} height={30} className='rounded-full' />}
    <h2>{msg.Content}</h2>
  
  </div>
))}
 {loading&&<div className='p-3 rounded-lg mb-2 flex gap-2 items-center leading-7'
 style={{
    backgroundColor:Colors.CHAT_BACKGROUND
 }}>
        <Loader2Icon className='animate-spin'/>
        <h2>Generating response...</h2>
    </div>}
</div>











<div className='flex gap-2 items-end'>
 {userDetail&&<Image src={userDetail?.picture}
 onClick={toggleSidebar}
 alt='userImage' width={30} height={30} className='rounded-md cursor-pointer'
 />}

<div className='p-5 border rounded-xl max-w-xl w-full mt-3'
style={{backgroundColor:Colors.BACKGROUND}}>
  <div className='flex gap-2'>
    <textarea placeholder={Lookup.INPUT_PLACEHOLDER}
    value={userInput}
    onChange={(event)=>setuserInput(event.target.value)}
    className='outline-none bg-transparent w-full h-32 max-h-56 resize'/>

 {userInput&& <ArrowRight 
 onClick={()=>onGenerate(userInput)}
 className='bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer'/>}

  </div>
  <div>
    <Link className='h-5 w-5'/>
  </div>
  </div>
</div>


    </div>

    


  )
}

export default ChatView