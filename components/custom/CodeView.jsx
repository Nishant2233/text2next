"use client"

import React, { useEffect } from 'react'
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFileExplorer
} from "@codesandbox/sandpack-react";
import { useState } from 'react';
import Lookup from '../../data/Lookup';
import { MessagesContext } from '@/contex/MessagesContext';
import Prompt from '../../data/Prompt';
import {useContext} from 'react';

import axios from 'axios';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { useConvex } from 'convex/react';
import { Loader2Icon } from 'lucide-react';


function CodeView() {
    const { id } = useParams();
    const [activeTab, setActiveTab] =useState("code");

    const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
 const {messages, setMessages } = useContext(MessagesContext);
 const UpdateFiles= useMutation(api.workspace.UpdateFiles);
const convex=useConvex();
const [loading,setLoading]=useState(false);



useEffect(() => {
    id&&GetFiles();
    
}, [id])


const GetFiles=async()=>{
    setLoading(true)
    const result = await convex.query(api.workspace.GetWorkspace, { workspaceID: id });
    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...result?.fileDatat };


  setFiles(mergedFiles);
  setLoading(false)
}

 useEffect(() => {
        
             if(messages?.length>0){
                 const role=messages[messages?.length-1]?.role;
                 if(role=='user'){
                     GenerateAiCode();
                 }
             }
         },[messages])


   const GenerateAiCode=async()=>{
    setLoading(true);
    const PROMPT=JSON.stringify(messages) +" "+Prompt.CODE_GEN_PROMPT;
    const result=await axios.post('/api/gen-ai-code',{prompt:PROMPT});

    console.log(result.data);
    const aiResp=result.data
    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResp?.files };


  setFiles(mergedFiles);
  
  await UpdateFiles({
      workspaceID:id,
      files:aiResp.files

  });

  setLoading(false);
   
}









    return (
    
            
        
        <div className='relative'>
        <div className='bg-[#181818] w-full p-1 border'>
        <div className='flex items-center bg-black p-1 rounded-md w-max gap-1'>
  <h2
    onClick={() => setActiveTab("code")}
    className={`text-sm cursor-pointer px-4 py-2 rounded-md transition-all duration-300 ${
      activeTab === "code"
        ? "text-blue-300 bg-blue-800 bg-opacity-55"
        : "text-white"
    }`}
  >
    Code
  </h2>
  <h2
    onClick={() => setActiveTab("preview")}
    className={`text-sm cursor-pointer px-4 py-2 rounded-md transition-all duration-300 ${
      activeTab === "preview"
        ? "text-blue-300 bg-blue-800 bg-opacity-55"
        : "text-white"
    }`}
  >
    Preview
  </h2>
</div>

</div>

            
            <SandpackProvider
            files={files}
            template="react" theme={"dark"}
            customSetup={{
                dependencies: {
                    ...Lookup.DEPENDANCY
                }
            }}

            options={{
                externalResources: ['https://cdn.tailwindcss.com'],
              }}
              
                >
            <SandpackLayout >
                {activeTab =='code'?<>
                    <SandpackFileExplorer style={{ height: "80vh" }} />
                <SandpackCodeEditor style={{ height: "80vh" }} />
                
                </>:
                <>
                <SandpackPreview style={{ height: "80vh" }} showNavigator={true}/>
                </>}
            </SandpackLayout>
        </SandpackProvider>
       {loading&& <div className='p-10 bg-gray-900 opacity-80 absolute top-0 rounded-lg w-full h-full flex items-center justify-center'>
            <Loader2Icon className='animate-spin h-10 w-10 text-white' />
            <h2 className='text-white'>Generating files...</h2>
        </div>}
        </div>
    )
}

export default CodeView