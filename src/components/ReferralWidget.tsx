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
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h3 className="text-lg font-semibold mb-2">Get a referral boost:</h3>
      <div className="flex items-center">
        <input
          type="text"
          value={referralUrl}
          readOnly
          className="flex-grow p-2 border rounded-l-md"
        />
        <button
          onClick={copyToClipboard}
          className="bg-[#007AFF] text-white p-2 rounded-r-md hover:bg-[#0056b3] transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
