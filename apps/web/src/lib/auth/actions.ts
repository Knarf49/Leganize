"use server";

import { signIn, signOut } from "./auth-node";

export const googleLogin = async () => {
  await signIn("google", { redirectTo: "/" });
};
export const facebookLogin = async () => {
  await signIn("facebook", { redirectTo: "/" });
};
export const logOut = async () => {
  await signOut({ redirectTo: "/" });
};
