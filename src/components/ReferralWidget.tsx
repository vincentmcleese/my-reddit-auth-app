import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ReferralWidget() {
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);

  const referralUrl = session?.user?.id
    ? `${window.location.origin}?ref=${session.user.id}`
    : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-[#FF4500] to-[#FF5722] p-6 rounded-2xl shadow-lg mb-6">
      <h3 className="text-xl font-bold mb-4 text-white">
        Get a referral boost:
      </h3>
      <div className="flex items-stretch">
        <Input
          type="text"
          value={referralUrl}
          readOnly
          className="flex-grow bg-white text-gray-700 focus:outline-none rounded-l-full border-r-0"
        />
        <Button
          onClick={copyToClipboard}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-r-full transition-all duration-300 ease-in-out transform hover:scale-105 border-l-0"
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  );
}
