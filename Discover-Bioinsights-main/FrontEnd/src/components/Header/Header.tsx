// components/Header.js
import { User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import { clearToken } from '../../utils/auth';

export default function Header() {
    
  const { auth, setAuth } = useContext(AuthContext);
    const handleLogout = () => {
        setAuth(null);
        clearToken();
      }

  return (
    <header className="bg-white text-primary p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EWDrWFrC0S3ROjuzh3YGYo38ztAk4i.png" 
            alt="Premier Hospital Logo" 
            width={300} 
            height={50} 
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>{`${auth?.username.charAt(0).toUpperCase() + auth?.username.slice(1).toLowerCase()} ( ${auth?.role.charAt(0).toUpperCase() + auth?.role.slice(1).toLowerCase()} )`}</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}