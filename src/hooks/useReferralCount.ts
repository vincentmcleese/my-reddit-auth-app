"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";

export function useReferralCount() {
  const { data: session, status } = useSession();
  const [referralCount, setReferralCount] = useState(0);

  useEffect(() => {
    const fetchReferralCount = async () => {
      if (status === "authenticated" && session?.user?.id) {
        try {
          const count = await actions.getReferralCount(session.user.id);
          setReferralCount(count);
        } catch (error) {
          console.error("Error fetching referral count:", error);
        }
      }
    };

    fetchReferralCount();
  }, [status, session?.user?.id]);

  return referralCount;
}
