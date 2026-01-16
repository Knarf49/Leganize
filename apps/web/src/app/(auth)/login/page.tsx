"use client";
import GoogleLogInBtn from "@/components/auth/GoogleLogInBtn";
import FacebookeLogInBtn from "@/components/auth/FacebookLogInBtn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            Login
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <GoogleLogInBtn />
          <FacebookeLogInBtn />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;