import StorkaLogo from "@/app/ui/storkaLogo";
import LoginForm from "@/app/ui/login-form";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="relative flex items-center justify-center md:h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/line.png')" }}
      />
      <div className="absolute inset-0 bg-white/70" />{" "}
      <div className="relative z-10 mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-slate-800 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <StorkaLogo />
          </div>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
