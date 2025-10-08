"use client";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import Loading from "@/src/components/UI/Loading";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import registerValidationSchema from "@/src/types/register";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { motion } from "framer-motion";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { User, Mail, Phone, Lock, ArrowRight, UserPlus, Shield, Zap, CheckCircle2, Search } from "lucide-react";

export default function RegisterPage() {
  const { mutate: handleUserRegistraion, isPending } = useUserRegistration();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
      profilePhoto: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    };
    handleUserRegistraion(userData);
  };

  return (
    <>
      {isPending && <Loading />}
      
      <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Branding & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FoundX
                </h1>
              </div>
              
              <div className="space-y-3">
                <h2 className="text-3xl font-bold ">
                  Join Our Community of
                </h2>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Helpful Finders
                </h2>
                <p className=" text-lg leading-relaxed">
                  Be part of a community that helps reunite people with their lost belongings. 
                  Every item found brings joy back to someone's life.
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start space-x-4"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold ">Free to Join</h3>
                  <p className=" text-sm">No hidden fees, completely free community service</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start space-x-4"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold ">Secure & Private</h3>
                  <p className=" text-sm">Your personal information is protected and secure</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-start space-x-4"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Instant Notifications</h3>
                  <p className="text-sm">Get notified when items matching your search are found</p>
                </div>
              </motion.div>
            </div>

            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t "
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">10K+</div>
                <div className="text-sm">Items Reunited</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">5K+</div>
                <div className="text-sm">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">98%</div>
                <div className="text-sm">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md mx-auto lg:mx-0"
          >
            <div className="shadow-none">
              <div className="p-8">
                {/* Mobile Header */}
                <div className="lg:hidden text-center mb-6">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <Search className="w-5 h-5" />
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      FoundX
                    </h1>
                  </div>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                      <UserPlus className="w-8 h-8" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Join FoundX</h3>
                  <p className="">Help Lost Items Find Their Way Home</p>
                </div>

                <FXForm
                  defaultValues={{
                    name: "Mir Hussain",
                    email: "mir@gmail.com",
                    mobileNumber: "01711223344",
                    password: "123456",
                  }}
                  resolver={zodResolver(registerValidationSchema)}
                  onSubmit={onSubmit}
                >
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="relative"
                    >
                      
                      <FXInput 
                        label="Full Name" 
                        name="name" 
                        size="sm"
                      
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="relative"
                    >
                    
                      <FXInput 
                        label="Email Address" 
                        name="email" 
                        size="sm"
                       
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="relative"
                    >
                 
                      <FXInput 
                        label="Mobile Number" 
                        name="mobileNumber" 
                        size="sm"
                  
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="relative"
                    >
                 
                      <FXInput
                        label="Password"
                        name="password"
                        size="sm"
                        type="password"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                        size="lg"
                        type="submit"
                        disabled={isPending}
                        endContent={!isPending && <ArrowRight className="w-4 h-4" />}
                      >
                        {isPending ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2  border-t-transparent rounded-full animate-spin"></div>
                            <span>Creating Account...</span>
                          </div>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </FXForm>

                {/* Divider */}
                <div className="my-6 flex items-center">
                  <div className="flex-1 border-t "></div>
                  <span className="px-4 text-sm ">or</span>
                  <div className="flex-1 border-t"></div>
                </div>

            

                {/* Login Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center "
                >
                  <p className="">
                    Already have an account?{" "}
                    <Link 
                      href="/login" 
                      className="text-blue-600 hover:text-blue-800 font-semibold transition-colors hover:underline"
                    >
                      Sign In
                    </Link>
                  </p>
                </motion.div>

                {/* Terms Notice */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border "
                >
                  <p className="text-xs text-gray-600 text-center leading-relaxed">
                    By creating an account, you agree to our{" "}
                    <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
                    {" "}and{" "}
                    <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}