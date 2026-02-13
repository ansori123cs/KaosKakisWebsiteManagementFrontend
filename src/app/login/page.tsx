"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import Button from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulasi login - dalam production, ini akan ke API
    setTimeout(() => {
      if (username && password) {
        // Simpan fake auth state
        localStorage.setItem(
          "user",
          JSON.stringify({ username, name: username }),
        );
        router.push("/dashboard");
      } else {
        setError("username dan password harus diisi");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F4F7] px-4">
      <Card className="mb-6 w-full max-w-2xl bg-white rounded-2xl p-3">
        <CardContent className="pt-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-40 h-40 rounded-2xl my-4 ">
              <Image
                src="/logo-small.png"
                width={800}
                height={800}
                alt="logo-persebaya"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
          </div>

          {/* Login Card */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {/* Username Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="block text-base font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="username"
                      type="text"
                      placeholder="demo123cs"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persebaya-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-base font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persebaya-primary focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                    <span className="text-gray-600">Ingat saya</span>
                  </label>
                  <Link
                    href="#"
                    className="text-persebaya-link hover:text-blue-700 font-medium"
                  >
                    Lupa password?
                  </Link>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-gray-600 text-sm">
                      Belum punya akun?{" "}
                      <Link
                        href="/register"
                        className="text-persebaya-link hover:text-blue-700 font-semibold underline"
                      >
                        Daftar di sini
                      </Link>
                    </p>
                  </div>
                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    loading={isLoading}
                    className="md:w-1/2 "
                  >
                    Masuk
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Demo Account */}
          <div className="mt-8 p-4 bg-persebaya-bg rounded-lg border border-gray-300">
            <p className="text-xs font-semibold text-persebaya-text mb-2">
              Demo Account:
            </p>
            <p className="text-xs text-persebaya-text">username: faisal123cs</p>
            <p className="text-xs text-persebaya-text">Password: faisal123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
