import React, { useContext } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { UserDetailContext } from '@/contex/UserDetailContext'; // 
function Header() {
    const { userDetail, setUserDetail } = useContext(UserDetailContext); 

    return (
        <div className='p-4 flex justify-between items-center'>
            <Image src={"/download (2).png"} alt="logo" width={70} height={70} />
            {!userDetail?.name && ( 
                <div className='flex gap-5'>
                    <Button variant={"ghost"}>Sign In</Button>
                    <Button
                        variant={"outline"}
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
        </div>
    )
}

export default Header;
