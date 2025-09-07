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


const NavbarDropdown = () => {
  const router = useRouter()
  const handleNavigateion = (pathname:string) =>{
    router.push(pathname)
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

        <DropdownItem key="delete" className="text-danger" color="danger">
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropdown;
