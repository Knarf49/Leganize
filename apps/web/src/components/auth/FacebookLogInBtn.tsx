"use client";

import { facebookLogin } from "@/lib/auth/actions";
import Image from "next/image";

const FacebookLogInBtn = () => {
  return (
    <button
      onClick={() => facebookLogin()}
      className="flex items-center bg-[#1877f2] justify-center w-full border py-2 rounded-lg shadow-md cursor-pointer hover:opacity-60 transition-all duration-200 text-secondary"
    >
      <Image
        src="/icons8-facebook.png"
        width={32}
        height={32}
        alt="google-icon"
        className="mr-2"
      />
      Continue With Facebook
    </button>
  );
};

export default FacebookLogInBtn;
