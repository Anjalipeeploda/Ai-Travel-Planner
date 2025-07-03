import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${codeResp.access_token}`,
        },
      })
        .then((res) => {
          localStorage.setItem('user', JSON.stringify(res.data));
          setOpenDialog(false);
          window.location.reload();
        })
        .catch((err) => console.error("Failed to fetch user profile", err));
    },
    onError: (error) => console.error("Login Failed:", error),
  });

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      {/* Left: Logo + Brand Name */}
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
        <span className="text-xl font-bold text-blue-600">TravelGenie</span>
      </div>
      <div className="flex items-center gap-3">
        {user ? (
          <div >
            <a href='/create-trip'>
              <Button variant="outline" className="rounded-full">+ Create Trip</Button>
            </a>
            <a href='/my-trips'>
              <Button variant="outline" className="rounded-full">My Trips</Button>
            </a>

            <Popover>
              <PopoverTrigger> <img
                src={user?.picture}
                alt="Profile"
                className="h-[35px] w-[35px] rounded-full"
              /></PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="w-3/4 max-w-sm rounded-xl shadow-xl p-4">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">Login Required</DialogTitle>
            <DialogDescription className="mt-3 text-center">
              <div className="flex justify-center mb-3">
                <div className="flex items-center gap-2">
                  <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
                  <span className="text-xl font-bold text-blue-600">TravelGenie</span>
                </div>
              </div>
              <div className='text-center'>
                <h2 className="font-bold text-lg mb-1">Sign In With Google</h2>
                <p className="text-sm text-gray-600 mb-4">Sign in to the app securely using your Google account.</p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={login}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex gap-2 items-center"
                >
                  <FcGoogle className='h-[1.5rem] w-[1.5rem]' />
                  Sign In With Google
                </button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;


