import React, { useContext } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { UserDetailContext } from '@/contex/UserDetailContext';
import SignInDialog from './SignInDialog';
import { useState } from 'react';

function Header() {
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <div className='p-4 flex justify-between items-center'>
            <Image src={"/download (2).png"} alt="logo" width={70} height={70} />
            {!userDetail?.name && (
                <div className='flex gap-5'>
                    <Button variant={"ghost"} onClick={() => setOpenDialog(true)}>Sign In</Button>
                    <Button
                        variant={"outline"}
                        onClick={() => setOpenDialog(true)}
                        style={{
                            marginLeft: "10px",
                            backgroundColor: "darkblue",
                            color: "white"
                        }}
                    >
                        Get Started
                    </Button>
                </div>
            )}
            <SignInDialog openDialog={openDialog} closeDialog={(v) => setOpenDialog(v)} />
        </div>
    )
}

export default Header;
