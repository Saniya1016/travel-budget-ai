"use client";
import Link from 'next/link';
import React, {useRef} from 'react';
import { auth } from '@/lib/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function page() {

  const email = useRef(null);
  const pwd = useRef(null);

  const handleLogin = (e) => {

    e.preventDefault();

    const email_ = email.current.value;
    const pwd_ = pwd.current.value;

    signInWithEmailAndPassword(auth, email_, pwd_)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, errorCode);
    });

  }

  return (
    <div>
      <div className='flex justify-center items-center min-h-screen'>
      <div className="bg-white p-8 sm:p-10 md:p-12 rounded-lg shadow-lg w-full max-w-md">
          <form onSubmit={handleLogin} className='flex flex-col gap-6 text-black'>
              <h1 className='text-2xl sm:text-3xl font-semibold text-center text-gray-800'>LogIn!</h1>
              <input ref={email} type='email' placeholder='Enter email' className='p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400'/>
              <input ref={pwd} type='password' placeholder='Enter password' className='p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400'/>
              <button type='submit' className='p-3 bg-green-500 rounded-2xl hover:bg-green-600 transition duration-300'>LogIn</button>
              <div className='text-center'>
                <p>
                  Don't have an account? {' '}
                  <Link 
                    href="/signup" 
                    className='text-green-600 hover:underline'
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
          </form>
        </div>
    </div>
    </div>
  )
}
