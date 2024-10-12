import { useState } from "react";
import { useSession } from "next-auth/react";

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
      <div className="flex items-center bg-white rounded-full overflow-hidden shadow-inner">
        <input
          type="text"
          value={referralUrl}
          readOnly
          className="flex-grow p-3 text-gray-700 focus:outline-none"
        />
        <button
          onClick={copyToClipboard}
          className="bg-[#0079D3] text-white px-6 py-3 font-semibold hover:bg-[#0056b3] transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
