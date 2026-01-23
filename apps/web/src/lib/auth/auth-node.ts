import { authConfig } from "./auth.config";
import NextAuth, { type NextAuthResult } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const adapter = PrismaAdapter(prisma);

const result = NextAuth({
  ...authConfig,
  adapter: adapter,
  session: { strategy: "jwt" },
});

export const handlers: NextAuthResult["handlers"] = result.handlers;
export const auth: NextAuthResult["auth"] = result.auth;
export const signIn: NextAuthResult["signIn"] = result.signIn;
export const signOut: NextAuthResult["signOut"] = result.signOut;
