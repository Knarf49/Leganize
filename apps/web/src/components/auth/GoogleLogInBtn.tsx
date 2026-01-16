"use client";

import { googleLogin } from "@/lib/auth/actions";

import Image from "next/image";

const GoogleLogInBtn = () => {
  return (
    <button
      onClick={() => googleLogin()}
      className="flex items-center justify-center w-full border py-2 rounded-lg shadow-md cursor-pointer hover:opacity-60 transition-all duration-200"
    >
      <Image
        src="/icons8-google.svg"
        width={32}
        height={32}
        alt="google-icon"
        className="mr-2"
      />
      Continue With Google
    </button>
  );
};

export default GoogleLogInBtn;
