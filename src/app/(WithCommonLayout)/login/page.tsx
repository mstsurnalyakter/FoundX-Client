"use client";
import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginVaridationSchema } from "@/src/schema/login.schema";
import { useUserLogin } from "@/src/hooks/auth.hook";
import Loading from "@/src/components/UI/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/src/context/user.provider";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Search, Users, Shield, Zap } from "lucide-react";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const { setIsLoading: userLoading } = useUser();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const { mutate: handleLogin, isPending, isSuccess } = useUserLogin();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

  return (
    <>
      {isPending && <Loading />}
      <div className="min-h-screen  flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Branding & Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Search className="w-6 h-6" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FoundX
                </h1>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-3xl font-bold ">
                  Welcome back to your
                </h2>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Lost & Found Journey
                </h2>
                <p className=" text-lg leading-relaxed">
                  Reuniting people with their belongings through the power of community.
                  Sign in to continue helping others find what they've lost.
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start space-x-4"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Search className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold ">Smart Search</h3>
                  <p className=" text-sm">Advanced filtering to find items quickly</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start space-x-4"
              >
                <div className="w-10 h-10  rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold ">Community Driven</h3>
                  <p className=" text-sm">Connect with helpful community members</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-start space-x-4"
              >
                <div className="w-10 h-10  rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Secure & Private</h3>
                  <p className=" text-sm">Your data is protected with enterprise-grade security</p>
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t "
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">10K+</div>
                <div className="text-sm ">Items Found</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">5K+</div>
                <div className="text-sm ">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">98%</div>
                <div className="text-sm ">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md mx-auto lg:mx-0"
          >
            <div className="shadow-none">
              <div className="p-8">
                {/* Mobile Header */}
                <div className="lg:hidden text-center mb-8">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <Search className="w-5 h-5 " />
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      FoundX
                    </h1>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold  mb-2">Welcome Back!</h2>
                  <p className="">Sign in to your account to continue</p>
                </div>

                <FXForm
                  defaultValues={{
                    email: "mir@gmail.com",
                    password: "123456",
                  }}
                  onSubmit={onSubmit}
                  resolver={zodResolver(loginVaridationSchema)}
                >
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                     <FXInput label="Email" name="email" size="sm" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <FXInput 
                        name="password" 
                        label="Password" 
                    
                        size="sm"
                        type={showPassword ? "text" : "password"}
                      />
                    </motion.div>

             

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] text-lg"
                        size="lg"
                        type="submit"
                        disabled={isPending}
                        endContent={!isPending && <ArrowRight className="w-5 h-5" />}
                      >
                        {isPending ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Signing In...</span>
                          </div>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </FXForm>

                {/* Divider */}
                <div className="my-8 flex items-center">
                  <div className="flex-1 border-t"></div>
                  <span className="px-4 text-sm ">or</span>
                  <div className="flex-1 border-t"></div>
                </div>

           

                {/* Sign Up Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center "
                >
                  <p className="">
                    Don't have an account?{" "}
                    <Link 
                      href="/register" 
                      className="text-blue-600 hover:text-blue-800 font-semibold transition-colors hover:underline"
                    >
                      Create one now
                    </Link>
                  </p>
                </motion.div>

                {/* Demo Credentials Notice */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/50"
                >
                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-blue-800">Quick Demo Access</h4>
                      <p className="text-xs text-blue-600 mt-1">
                        Use the pre-filled credentials to quickly explore the platform
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;