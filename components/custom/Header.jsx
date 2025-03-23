import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { UserDetailContext } from '@/contex/UserDetailContext';
import SignInDialog from './SignInDialog';

function Header() {
    const { userDetail } = useContext(UserDetailContext);
    const [openDialog, setOpenDialog] = useState(false);

    const handleSignInClick = () => {
        setOpenDialog(true);
    };

    return (
        <div className='p-4 flex justify-between items-center'>
            <Image src={"/download (2).png"} alt="logo" width={70} height={70} />
            {!userDetail?.name && (
                <div className='flex gap-5'>
                    <Button 
                        variant="ghost" 
                        onClick={handleSignInClick}
                        className="text-white hover:text-gray-200"
                    >
                        Sign In
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleSignInClick}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Get Started
                    </Button>
                </div>
            )}
            <SignInDialog 
                openDialog={openDialog} 
                closeDialog={(v) => setOpenDialog(v)} 
            />
        </div>
    )
}

export default Header;
