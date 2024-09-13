import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/logo";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-4xl font-bold text-center">
          <Logo />
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-lg text-gray-600 mb-6">
          Connect with your Reddit account to start earning good karma!
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          className="w-full bg-[#FF4500] hover:bg-[#FF5722] text-white font-semibold py-2 px-4 rounded-full"
          onClick={() => signIn("reddit")}
        >
          Login with Reddit
        </Button>
        {/* <Button
          className="bg-reddit-orange hover:bg-orange-600 text-white"
          size="lg"
          onClick={() => signIn("reddit")}
        > */}
        {/* <RedditIcon className="mr-2 h-5 w-5" />
          Login with Reddit
        </Button> */}
      </CardFooter>
    </Card>
  );
}
