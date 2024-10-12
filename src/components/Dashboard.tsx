import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import PageCard from "@/components/shared/PageCard";
import Logo from "@/components/shared/logo";

import { ReferralWidget } from "@/components/ReferralWidget";
import { Button } from "@/components/ui/button";
import { ScratchResult } from "@/hooks/useScratchCard";
import { format } from "date-fns";
import { BoostBreakdown } from "@/components/shared/BoostBreakdwon";

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
  nextAvailableTime,
  streak,
  referralCount,
  karma,
}: DashboardProps) {
  const { data: session } = useSession();

  return (
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
          <div className="text-2xl font-semibold text-center">
            {isAvailable ? "Ready to Scratch" : "Next Scratch"}
          </div>
          <div className="text-center text-gray-600">
            {isAvailable
              ? "Your card is ready to be scratched!"
              : `Available at ${format(nextAvailableTime, "h:mm a")}`}
          </div>
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
  );
}
