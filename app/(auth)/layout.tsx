import HeaderAuth from "@/components/Auth/HeaderAuth";
import Image from "next/image";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <HeaderAuth />
      <div className="flex min-h-screen gap-3xl bg-beige-100 px-md sm-490:p-lg">
        <section className="relative hidden w-[420px] lg:block xl:w-[520px]">
          <Image
            src="/assets/images/illustration-authentication.svg"
            alt="Authentication Illustration"
            fill
            className="rounded-xl object-cover object-top"
            priority
          />
        </section>
        <section className="mt-[70px] flex flex-1 items-center justify-center lg:mt-0">
          {children}
        </section>
      </div>
    </div>
  );
};

export default Layout;
