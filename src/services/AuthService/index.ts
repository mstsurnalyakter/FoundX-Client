"use server";

import axiosInstance from "@/src/lib/axiosInstance";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { IDecodedToken, IUser } from "@/src/types";


export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData);

    if (data?.success) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", data?.data?.accessToken);
      cookieStore.set("refreshToken", data?.data?.refreshToken);
    }
    return data
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data?.success) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", data?.data?.accessToken);
      cookieStore.set("refreshToken", data?.data?.refreshToken);
    }
    return data
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = async () =>{
  const cookieStore = await cookies()
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}




export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  console.log(accessToken)
  let decodedToken: IDecodedToken | null = null;
  if (accessToken) {
    decodedToken = await jwtDecode<IDecodedToken>(accessToken);
    console.log(decodedToken);
    return {
      _id: decodedToken?._id,
      name: decodedToken?.name,
      email: decodedToken?.email,
      mobileNumber: decodedToken?.mobileNumber,
      profilePhoto: decodedToken?.profilePhoto,
      role: decodedToken?.role,
      status: decodedToken?.status
    };
  }
  return decodedToken;
}



