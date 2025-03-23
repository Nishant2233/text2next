"use client"

import React, { useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { MessagesContext } from '@/contex/MessagesContext'
import Header from '@/components/custom/Header'
import { UserDetailContext } from '@/contex/UserDetailContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { SidebarProvider } from '@/components/ui/sidebar'
import AppSideBar from '@/components/custom/AppSideBar'

function Provider({ children }) {
  const [messages, setMessages] = useState([]);
  const [userDetail, setUserDetail] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const convex = useConvex();

  useEffect(() => {
    IsAuthenicated();
  }, [])

  // Close sidebar when user signs out
  useEffect(() => {
    if (!userDetail) {
      setSidebarOpen(false);
    }
  }, [userDetail]);

  const IsAuthenicated = async () => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.email) {
        try {
          const result = await convex.query(api.users.GetUser, {
            email: user.email
          });
          if (result) {
            setUserDetail(result);
            // Keep sidebar closed by default
            setSidebarOpen(false);
          } else {
            // If user not found in database, clear local storage
            localStorage.removeItem('user');
            setUserDetail(null);
            setSidebarOpen(false);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          localStorage.removeItem('user');
          setUserDetail(null);
          setSidebarOpen(false);
        }
      }
    }
  };

  return (
    <div>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <MessagesContext.Provider value={{ messages, setMessages }}>
            <NextThemesProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange>
              <Header />
              <SidebarProvider 
                defaultOpen={false} 
                open={sidebarOpen}
                onOpenChange={setSidebarOpen}
              >
                <AppSideBar />
                {children}
              </SidebarProvider>
            </NextThemesProvider>
          </MessagesContext.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </div>
  )
}

export default Provider