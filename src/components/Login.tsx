import { Button } from "@/components/ui/button";
import PageCard from "@/components/shared/PageCard";
import Logo from "@/components/shared/logo";
import VideoPlayer from "@/components/VideoPlayer";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <PageCard
      title={<Logo />}
      footer={
        <Button
          className="w-full bg-[#FF4500] hover:bg-[#FF5722] text-white font-semibold py-2 px-4 rounded-full"
          onClick={() => signIn("reddit")}
        >
          Login with Reddit
        </Button>
      }
    >
      <VideoPlayer />
      <p className="text-lg text-gray-600 mb-6">
        Connect with your Reddit account to start earning good karma!
      </p>
    </PageCard>
    // <div className="px-4 sm:px-0">
    //   {" "}
    //   {/* Add padding on small screens */}
    //   <Card className="w-full max-w-md mx-auto">
    //     <CardHeader>
    //       <CardTitle className="text-4xl font-bold text-center">
    //         <Logo />
    //       </CardTitle>
    //     </CardHeader>
    //     <CardContent className="text-center">
    //       <p className="text-lg text-gray-600 mb-6">
    //         Connect with your Reddit account to start earning good karma!
    //       </p>
    //     </CardContent>
    //     <CardFooter className="flex justify-center">
    //       <Button
    //         className="w-full bg-[#FF4500] hover:bg-[#FF5722] text-white font-semibold py-2 px-4 rounded-full"
    //         onClick={() => signIn("reddit")}
    //       >
    //         Login with Reddit
    //       </Button>
    //     </CardFooter>
    //   </Card>
    // </div>
  );
}
