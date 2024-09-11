import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RedIcon } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-4xl font-bold text-center text-orange-600">
          Karm-a
          <span className="text-5xl">h</span>
          <span className="text-6xl">h</span>
          <span className="text-7xl">h</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-lg text-gray-600 mb-6">
          Connect with your Reddit account to start earning good karma!
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white"
          size="lg"
          onClick={() => signIn("reddit")}
        >
          {/* <RedditIcon className="mr-2 h-5 w-5" /> */}
          Login with Reddit
        </Button>
      </CardFooter>
    </Card>
  );
}
