"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  SquareUser,
  Dock,
  StretchVertical,
  HouseHeart,
} from "lucide-react";
import Button from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    nik: "",
    email: "",
    username: "",
    phone: "",
    password: "",
    telp: "",
    alamat: "",
    agreeTerms: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    if (e.target instanceof HTMLInputElement && type === "checkbox") {
      const checked = e.target.checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validasi
    if (
      !formData.fullName ||
      !formData.nik ||
      !formData.telp ||
      !formData.username ||
      !formData.password ||
      !formData.alamat
    ) {
      setError("Semua field harus diisi");
      return;
    }

    // if (formData.password !== formData.confirmPassword) {
    //   setError("Password tidak cocok");
    //   return;
    // }

    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    if (!formData.agreeTerms) {
      setError("Anda harus setuju dengan syarat dan ketentuan");
      return;
    }

    setIsLoading(true);

    // Simulasi register - dalam production, ini akan ke API
    setTimeout(() => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: formData.username,
          name: formData.fullName,
        }),
      );
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F4F7] px-4">
      <Card className="mb-6 w-full max-w-2xl bg-white rounded-2xl p-1 mt-2">
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Registrasi
            </h1>
          </div>

          {/* Register Card */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {/* Baris 1: Full Name & NIK */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <SquareUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Maulana Faisal Fardani"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persebaya-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* NIK Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="nik"
                      className="block text-sm font-medium text-gray-700"
                    >
                      NIK
                    </label>
                    <div className="relative">
                      <Dock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="nik"
                        name="nik"
                        type="text"
                        placeholder="3572456653766352"
                        value={formData.nik}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persebaya-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Baris 2: Username & Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Username Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="faisal123cs"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persebaya-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
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
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persebaya-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nomor HP
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+62 812-3456-7890"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persebaya-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Address Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="alamat"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Alamat
                  </label>
                  <div className="relative">
                    <HouseHeart className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      id="alamat"
                      name="alamat"
                      placeholder="Masukkan alamat lengkap"
                      value={formData.alamat}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persebaya-primary focus:border-transparent"
                      rows={4}
                    />
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start gap-2">
                  <input
                    id="agreeTerms"
                    name="agreeTerms"
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-1 rounded border-gray-300"
                  />
                  <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                    Saya setuju dengan{" "}
                    <Link
                      href="#"
                      className="text-persebaya-link underline hover:text-blue-700 font-medium"
                    >
                      Syarat & Ketentuan
                    </Link>{" "}
                    dan{" "}
                    <Link
                      href="#"
                      className="text-persebaya-link underline hover:text-blue-700 font-medium"
                    >
                      Kebijakan Privasi
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isLoading}
                  className="w-full mt-6"
                >
                  Daftar
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-start">
            <p className="text-gray-600 text-sm">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="text-persebaya-link underline hover:text-blue-700 font-semibold"
              >
                Masuk di sini
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
