"use client";

import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { UserDetailContext } from "@/contex/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";

function SignInDialog({ openDialog, closeDialog }) {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const createUser = useMutation(api.users.createUser);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log("Google Token Response:", tokenResponse);
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse?.access_token}` },
          }
        );

        console.log("Google User Info:", userInfo.data);
        const user = userInfo.data;

        await createUser({
          name: user?.name,
          email: user?.email,
          picture: user?.picture,
          uid: uuid4(),
        });

        if (typeof window !== "undefined") {
          localStorage.setItem('user', JSON.stringify(user));
; // ✅ fixed typo
        }

        setUserDetail(userInfo?.data);
        closeDialog(false); // Close dialog after login success
      } catch (error) {
        console.error("Google Login Error:", error);
      }
    },
    onError: (errorResponse) =>
      console.error("Google Auth Failed:", errorResponse),
  });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            {Lookup?.SIGNIN_AGREEMENT_TEXT} {/* ✅ only text inside */}
          </DialogDescription>
        </DialogHeader>

        {/* ✅ Moved div OUTSIDE DialogDescription */}
        <div className="flex flex-col items-center justify-center gap-3 mt-4">
          <div className="text-center">
            <h2 className="font-bold text-2xl text-white">
              {Lookup.SIGNIN_HEADING}
            </h2>
            <p className="mt-2">{Lookup.SIGNIN_SUBHEADING}</p>
          </div>

          <Button
            className="bg-blue-500 text-white hover:bg-blue-400 mt-3"
            onClick={googleLogin}
          >
            Sign In With Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
