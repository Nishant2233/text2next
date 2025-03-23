"use client";

import React, { useContext, useState } from "react";
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
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";
import { Loader2 } from "lucide-react";
import { useConvex } from "convex/react";

function SignInDialog({ openDialog, closeDialog }) {
  const { setUserDetail } = useContext(UserDetailContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const createUser = useMutation(api.users.createUser);
  const convex = useConvex();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsLoading(true);
        setError("");
        
        // Get user info from Google
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse?.access_token}` },
          }
        );

        const user = userInfo.data;

        // Try to get existing user first
        const existingUser = await convex.query(api.users.GetUser, { 
          email: user.email 
        });

        let finalUser;
        if (existingUser) {
          // Use existing user
          finalUser = existingUser;
        } else {
          // Create new user in Convex
          finalUser = await createUser({
            name: user?.name,
            email: user?.email,
            picture: user?.picture,
            uid: uuid4(),
          });
        }

        if (!finalUser) {
          throw new Error("Failed to get user data");
        }

        // Store user in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem('user', JSON.stringify(finalUser));
        }

        // Update context
        setUserDetail(finalUser);
        closeDialog(false);
      } catch (error) {
        console.error("Google Login Error:", error);
        setError("Failed to sign in. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.error("Google Auth Failed:", errorResponse);
      setError("Failed to authenticate with Google. Please try again.");
      setIsLoading(false);
    },
  });

  return (
    <Dialog open={openDialog} onOpenChange={(open) => !isLoading && closeDialog(open)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-center">Sign In</DialogTitle>
          <DialogDescription className="text-center">
            {Lookup?.SIGNIN_AGREEMENT_TEXT}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center gap-6 py-4">
          <div className="text-center space-y-2">
            <h2 className="font-bold text-xl sm:text-2xl text-white">
              {Lookup.SIGNIN_HEADING}
            </h2>
            <p className="text-sm text-gray-400">
              {Lookup.SIGNIN_SUBHEADING}
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          <Button
            className="w-full max-w-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            onClick={() => !isLoading && googleLogin()}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In With Google"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
