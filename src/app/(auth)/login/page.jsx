"use client";
import Link from 'next/link';
import React, {useRef, useState} from 'react';
import { auth } from '@/lib/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/services/api';


export default function Page() {

  const router = useRouter();
  const email = useRef(null);
  const pwd = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        email.current.value, 
        pwd.current.value
      );

      const user = userCredential.user;

      //make call to login api to set cookies/token
      
      const response = await api.loginUser({
            idToken: await user.getIdToken(),
            uid: user.uid
          })

      if (!response.success) {
        throw new Error('Server authentication failed');
      }

      router.push('/dashboard');

    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Login failed');
    } finally{
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className='flex justify-center items-center min-h-screen'>
      <div className="bg-white p-8 sm:p-10 md:p-12 rounded-lg shadow-lg w-full max-w-md">
          <form onSubmit={handleLogin} className='flex flex-col gap-6 text-black'>
              <h1 className='text-2xl sm:text-3xl font-semibold text-center text-gray-800'>LogIn!</h1>
              <input ref={email} type='email' placeholder='Enter email' className='p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400'/>
              <input ref={pwd} type='password' placeholder='Enter password' className='p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400'/>
              <button type='submit' 
                  className={`p-3 rounded-2xl transition duration-300 ${
                    isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                  }`}
                  disabled={isLoading}
              >
              {isLoading? "Logging In ... " : "Log In" } 
              </button>
              <div className='text-center'>
                <p>
                  Don&#39;t have an account? {' '}
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
};
