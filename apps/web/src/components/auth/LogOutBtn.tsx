"use client";
import { logOut } from "@/lib/auth/actions";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export default function LogOutBtn() {
  return (
    <Button className="flex p-4! rounded-lg" onClick={() => logOut()}>
      <LogOut /> LogOut
    </Button>
  );
}
