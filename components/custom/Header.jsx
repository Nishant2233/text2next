import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { UserDetailContext } from '@/contex/UserDetailContext';
import SignInDialog from './SignInDialog';

function Header() {
    const { userDetail } = useContext(UserDetailContext);
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <div className='p-4 flex justify-between items-center'>
            <Image src={"/download (2).png"} alt="logo" width={70} height={70} />
            {/* Buttons removed */}
            <SignInDialog 
                openDialog={openDialog} 
                closeDialog={(v) => setOpenDialog(v)} 
            />
        </div>
    )
}

export default Header;
