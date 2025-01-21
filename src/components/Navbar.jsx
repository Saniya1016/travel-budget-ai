"use client";
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase-config';
import { useState, useEffect } from 'react';
import { signOut } from "firebase/auth";
import { api } from '@/lib/services/api';
import Link from 'next/link';

export default function Navbar() {
  const [user, setUser] = useState((auth && auth.currentUser) || null); // Get the current user state
  const router = useRouter();

  const handleLogout = async () => {
    try {
        const idToken = await auth.currentUser.getIdToken();

        await api.logoutUser({idToken});

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
        } else {
            console.log("signed out effect hook");
            setUser(null);
        }
    });

    return () => unsubscribe(); // Clean up on unmount
  }, []); // onMount

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex gap-4">
        <li><Link href="/">Home</Link></li> {/* Replace <a> with <Link> */}
        <li><Link href="/">About</Link></li> {/* Replace <a> with <Link> */}
        {user ? (
          <>
            <li><Link href="/dashboard">Dashboard</Link></li> {/* Replace <a> with <Link> */}
            <li><button onClick={handleLogout}>Log Out</button></li>
          </>
        ) : (
          <>
            <li><Link href="/login">Login</Link></li> {/* Replace <a> with <Link> */}
            <li><Link href="/signup">Sign Up</Link></li> {/* Replace <a> with <Link> */}
          </>
        )}
      </ul>
    </nav>
  );
}
