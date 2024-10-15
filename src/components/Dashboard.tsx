import Image from "next/image";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import PageCard from "@/components/shared/PageCard";
import Logo from "@/components/shared/logo";

import { ReferralWidget } from "@/components/ReferralWidget";
import { Button } from "@/components/ui/button";
import { ScratchResult } from "@/hooks/useScratchCard";

import { BoostBreakdown } from "@/components/shared/BoostBreakdwon";
import CountdownClock from "./CountdownClock";
import Link from "next/link";

interface DashboardProps {
  onScratch: () => void;
  isAvailable: boolean;
  nextAvailableTime: Date;
  todayScratchResults: ScratchResult[];
  streak: number;
  referralCount: number;
  karma: number;
}

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Dashboard({
  onScratch,
  isAvailable,

  streak,
  referralCount,
  karma,
}: DashboardProps) {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center w-full">
      <PageCard title={<Logo />} footer={`r/${session?.user?.name}`}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ReferralWidget />
        </motion.div>
        <div className="space-y-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-2xl font-semibold text-center text-black">
              {isAvailable ? "Ready to Scratch" : "Next Scratch"}
            </div>
            <div className="text-center text-black">
              {isAvailable ? (
                "Scratch to win a $100 Bitrefill Giftcard."
              ) : (
                <CountdownClock />
              )}
            </div>
          </motion.div>

          {/* Add the prize image here */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center"
          >
            <Image
              src="/prizes.png"
              alt="Prizes you can win"
              width={300}
              height={200}
              className="rounded-lg shadow-md"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={onScratch}
              disabled={!isAvailable}
            >
              {isAvailable ? "Scratch Now" : "Scratch Unavailable"}
            </Button>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <BoostBreakdown
              referralCount={referralCount}
              streak={streak}
              karma={karma}
            />
          </motion.div>
        </div>
      </PageCard>

      {/* Footer links */}
      <div className="mt-4 mb-4 text-white text-sm">
        <Link href="/privacy-policy" className="hover:underline">
          Privacy Policy
        </Link>
        <span className="mx-2">|</span>
        <Link href="/about" className="hover:underline">
          About 6degrees
        </Link>
        <span className="mx-2">|</span>
        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
      </div>
    </div>
  );
}
