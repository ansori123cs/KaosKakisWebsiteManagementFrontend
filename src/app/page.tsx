import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";

export default function Home() {
  const redirectToLogin = () => {
    redirect("/login");
  };
  redirectToLogin();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-persebaya-bg via-white to-purple-50 px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-persebaya-primary to-persebaya-primary-hover rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            FP
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-persebaya-primary to-persebaya-primary-hover bg-clip-text text-transparent">
            FaiSal
          </span>
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          A modern, production-ready dashboard template built with Next.js,
          TypeScript, and Tailwind CSS. Featuring responsive layouts, reusable
          components, and best practices for modern web development.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <Link href="/login">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Masuk
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="secondary" size="lg">
              Daftar
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-2">Fast & Modern</h3>
            <p className="text-gray-600 text-sm">
              Built with Next.js App Router for optimal performance and modern
              development experience.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="text-3xl mb-2">🎨</div>
            <h3 className="font-semibold text-gray-900 mb-2">Beautiful UI</h3>
            <p className="text-gray-600 text-sm">
              Tailwind CSS with custom components for a consistent and
              professional appearance.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="text-3xl mb-2">🔧</div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Developer Friendly
            </h3>
            <p className="text-gray-600 text-sm">
              TypeScript, modular architecture, and reusable components for easy
              customization.
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Made with ❤️ for developers who care about quality and best
            practices.
          </p>
        </div>
      </div>
    </div>
  );
}
