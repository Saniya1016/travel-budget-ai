"use client";
import Link from 'next/link';
import React, {useRef} from 'react';
import { auth } from '@/lib/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Page() {

  const router = useRouter();
  const email = useRef(null);
  const pwd = useRef(null);
  const confirmPwd = useRef(null);

  const handleSignUp = (e) => {
      e.preventDefault(); //prevent page reload
      const email_ = email.current.value;
      const pwd_ = pwd.current.value;
      const confirmPwd_ = confirmPwd.current.value;

      if(!email_ || !pwd_){
        toast.error("Please fill in all fields");
        return;
      }

      if(pwd_ !== confirmPwd_){
        toast.error("Passwords do not match");
        return;
      }

      if(pwd_.length < 6){
        toast.error("Password must be at least 6 characters long");
        return;
      }

      createUserWithEmailAndPassword(auth, email_, pwd_)
      .then((userCredentials) => {
        toast.success("Account created successfully!");
        router.push('/login');

      })
      .catch((error) => {
          const errorCode = error.code;
          switch (errorCode) {
            case 'auth/email-already-in-use':
              toast.error("Email is already registered");
              break;
            case 'auth/invalid-email':
              toast.error("Invalid email address");
              break;
            case 'auth/weak-password':
              toast.error("Password is too weak");
              break;
            default:
              toast.error("Sign up failed. Please try again.");
              console.error("Signup error:", error);
          }
        });

  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className="bg-white p-8 sm:p-10 md:p-12 rounded-lg shadow-lg w-full max-w-md">
          <form onSubmit={handleSignUp} className='flex flex-col gap-6 text-black'>
              <h1 className='text-2xl sm:text-3xl font-semibold text-center text-gray-800'>Sign Up!</h1>
              <input ref={email} type='email' placeholder='Enter email' className='p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400'/>
              <input ref={pwd} type='password' placeholder='Enter password' className='p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400'/>
              <input ref={confirmPwd} type='password' placeholder='Confirm password' className='p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400'/>
              <button type='submit' className='p-3 bg-green-500 rounded-2xl hover:bg-green-600 transition duration-300'>Create</button>
              <div className='text-center'>
                <p>
                  Already have an account? {' '}
                  <Link 
                    href="/login" 
                    className='text-green-600 hover:underline'
                  >
                    Log In
                  </Link>
                </p>
              </div>
          </form>
        </div>
    </div>
  )
}
