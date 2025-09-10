"use client";
import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { useRouter } from "next/navigation";
import { logout } from "@/src/services/AuthService";
import { useUser } from "@/src/context/user.provider";


const NavbarDropdown = () => {
  const router = useRouter()
   const {setIsLoading:userLoading} = useUser()
 
  const handleNavigateion = (pathname:string) =>{
    router.push(pathname)
  }

  const handleLogout = () =>{
    logout();
    userLoading(true)
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" name="John" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={()=>handleNavigateion("/profile")} key="profile">Profile</DropdownItem>

        <DropdownItem onClick={()=>handleNavigateion("/profile/create-post")} key="create-profile">Create Profile</DropdownItem>

        <DropdownItem onClick={()=>handleNavigateion("/profile/settings")} key="settings">Settings</DropdownItem>

        <DropdownItem key="logout" onClick={()=>handleLogout()} className="text-danger" color="danger">
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropdown;
