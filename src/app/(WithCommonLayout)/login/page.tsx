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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
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
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FoundX
                </h1>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-gray-800">
                  Welcome back to your
                </h2>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Lost & Found Journey
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
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
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Search className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Smart Search</h3>
                  <p className="text-gray-600 text-sm">Advanced filtering to find items quickly</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start space-x-4"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Community Driven</h3>
                  <p className="text-gray-600 text-sm">Connect with helpful community members</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-start space-x-4"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Secure & Private</h3>
                  <p className="text-gray-600 text-sm">Your data is protected with enterprise-grade security</p>
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-gray-600">Items Found</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">5K+</div>
                <div className="text-sm text-gray-600">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
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
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardBody className="p-8">
                {/* Mobile Header */}
                <div className="lg:hidden text-center mb-8">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <Search className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      FoundX
                    </h1>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
                  <p className="text-gray-600">Sign in to your account to continue</p>
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
                      <FXInput 
                        name="email" 
                        label="Email Address" 
                        type="email"
                        placeholder="Enter your email"
                        variant="bordered"
                        size="lg"
                        radius="lg"
                        classNames={{
                          input: "text-lg",
                          inputWrapper: "h-14 bg-gray-50/50 border-2 border-gray-200 hover:border-blue-400 focus-within:border-blue-500 transition-all duration-200",
                          label: "text-gray-700 font-medium"
                        }}
                        startContent={
                          <Mail className="w-5 h-5 text-gray-400 pointer-events-none flex-shrink-0" />
                        }
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <FXInput 
                        name="password" 
                        label="Password" 
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        variant="bordered"
                        size="lg"
                        radius="lg"
                        classNames={{
                          input: "text-lg",
                          inputWrapper: "h-14 bg-gray-50/50 border-2 border-gray-200 hover:border-blue-400 focus-within:border-blue-500 transition-all duration-200",
                          label: "text-gray-700 font-medium"
                        }}
                        startContent={
                          <Lock className="w-5 h-5 text-gray-400 pointer-events-none flex-shrink-0" />
                        }
                        endContent={
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-400 hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-gray-100"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        }
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center justify-between text-sm"
                    >
                      <label className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                          />
                        </div>
                        <span className="text-gray-600 group-hover:text-gray-800 transition-colors">Remember me</span>
                      </label>
                      <Link 
                        href="/forgot-password" 
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors hover:underline"
                      >
                        Forgot password?
                      </Link>
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
                  <div className="flex-1 border-t border-gray-200"></div>
                  <span className="px-4 text-sm text-gray-500 bg-white">or</span>
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-3">
                  <Button
                    variant="bordered"
                    className="w-full h-12 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 text-gray-700 font-medium"
                    startContent={
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    }
                  >
                    Continue with Google
                  </Button>

                  <Button
                    variant="bordered"
                    className="w-full h-12 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 text-gray-700 font-medium"
                    startContent={
                      <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    }
                  >
                    Continue with Facebook
                  </Button>
                </div>

                {/* Sign Up Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center mt-8 pt-6 border-t border-gray-100"
                >
                  <p className="text-gray-600">
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
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;