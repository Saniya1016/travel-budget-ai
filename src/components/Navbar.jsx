"use client";
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase-config';
import { useState, useEffect } from 'react';
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState((auth && auth.currentUser) || null); // Get the current user state
  const router = useRouter();

  const handleLogout = async () => {
    try {

        const idToken = await auth.currentUser.getIdToken();
        // console.log('current user token', idToken);
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/logout`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken }),
        });

        await signOut(auth);
        router.push("/login");

      } catch (error) {
        console.error("Error signing out:", error);
      }
  };

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((user) => {

        if(user){
            setUser(user);
        }else{
            console.log("signed out effect hook");
            setUser(null);
        }

    });

    return () => unsubscribe(); //unMount | cleanUp

}, []); //onMount

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex gap-4">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        {user ? (
          <>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><button onClick={handleLogout}>Log Out</button></li>
          </>
        ) : (
          <>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Sign Up</a></li>
          </>
        )}
      </ul>
    </nav>
  );
}
