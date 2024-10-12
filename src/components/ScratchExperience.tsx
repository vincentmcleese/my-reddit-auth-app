import { useState, useEffect } from "react";
import ScratchCard from "./ScratchCard";
import ScratchComplete from "./ScratchComplete";
import Confetti from "react-confetti";

export default function ScratchExperience({
  onComplete,
}: {
  onComplete: (didWin: boolean) => void;
}) {
  const [isScratched, setIsScratched] = useState<boolean>(false);
  const [winMessage, setWinMessage] = useState<string>("");
  const [didWin, setDidWin] = useState<boolean>(false);

  useEffect(() => {
    const winStatus = Math.random() < 0.5; // 50% chance of winning
    setDidWin(winStatus);
    setWinMessage(winStatus ? "YOU WIN" : "TRY AGAIN TOMORROW");
  }, []);

  const handleScratchComplete = () => {
    setIsScratched(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg max-w-md w-full">
        {isScratched && didWin && (
          <Confetti recycle={false} numberOfPieces={500} tweenDuration={2000} />
        )}
        <ScratchCard
          message={winMessage}
          onScratchComplete={handleScratchComplete}
        />
        {isScratched && (
          <div>
            <ScratchComplete outcome={didWin} />
            <button
              className="mt-4 w-full bg-[#FF4500] hover:bg-[#FF5722] text-white font-semibold py-2 px-4 rounded-full"
              onClick={() => onComplete(didWin)}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
