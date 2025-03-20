import ChatView from '@/components/custom/ChatView'
import { Code } from 'lucide-react'
import CodeView from '@/components/custom/CodeView'
import React from 'react'

function workspace() {
  return (
    <div className='p-3 pr-5 mt-3'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
    <ChatView/>
    <div className='col-span-2'>
    <CodeView/>
    </div>

    </div>
</div>
  )
}

export default workspace