import React, { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { setCanvasSize, drawBackground } from "@/app/utils/canvasUtils";
import { animateShineEffect } from "@/app/utils/shineUtils";

interface ScratchCardProps {
  onScratchComplete: () => void;
  message: string;
}

export default function ScratchCard({
  onScratchComplete,
  message,
}: ScratchCardProps) {
  // Refs for the canvas elements (main and shine layers)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shineCanvasRef = useRef<HTMLCanvasElement>(null);

  // State to hold the canvas dimensions, initially set to default values
  const [dimensions, setDimensions] = useState({ width: 300, height: 150 });

  // Ref to track the number of scratched pixels
  const scratchedPixelsRef = useRef(0);

  // State to store the total number of pixels on the canvas
  const [totalPixels, setTotalPixels] = useState(0);

  // Effect to update canvas dimensions when the window is resized
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const { width } = canvasRef.current.getBoundingClientRect();
        setDimensions({ width, height: width / 2 }); // Maintain 2:1 aspect ratio
      }
    };

    // Initial dimensions setup
    updateDimensions();

    // Add event listener to update dimensions on window resize
    window.addEventListener("resize", updateDimensions);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Effect to initialize canvas drawing and shine animation logic
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const shineCanvas = shineCanvasRef.current;
    const shineCtx = shineCanvas?.getContext("2d");

    if (ctx && shineCtx) {
      const { width, height } = dimensions;
      // Set canvas sizes using the utility function
      if (canvas) {
        setCanvasSize(canvas, width, height);
      }
      if (shineCanvas) {
        setCanvasSize(shineCanvas, width, height);
      }

      // Store total number of pixels for scratch tracking
      setTotalPixels(width * height);

      // Draw the gold background using the utility function
      drawBackground(ctx, width, height);

      // Shine animation setup
      let shinePosition = 0;
      let isAnimating = false;

      const startShineAnimation = () => {
        shinePosition = 0;
        isAnimating = true;
        animateShineEffect(
          shineCtx,
          shinePosition,
          width,
          height,
          isAnimating,
          startShineAnimation
        );
      };

      // Start the shine animation
      startShineAnimation();
    }
  }, [dimensions]);

  // Handle mouse or touch events to scratch the canvas
  const handleScratch = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width; // Scale factor for X axis
      const scaleY = canvas.height / rect.height; // Scale factor for Y axis

      // Determine the x and y position of the scratch event (mouse or touch)
      let x, y;
      if (e.type === "mousemove" || e.type === "mousedown") {
        const mouseEvent = e as React.MouseEvent<HTMLCanvasElement>;
        x = (mouseEvent.clientX - rect.left) * scaleX;
        y = (mouseEvent.clientY - rect.top) * scaleY;
      } else {
        const touchEvent = e as React.TouchEvent<HTMLCanvasElement>;
        x = (touchEvent.touches[0].clientX - rect.left) * scaleX;
        y = (touchEvent.touches[0].clientY - rect.top) * scaleY;
      }

      // Scratch the canvas (make pixels transparent)
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, dimensions.width / 20, 0, Math.PI * 2);
      ctx.fill();

      // Track the scratched area by checking how many pixels are transparent
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const scratchedPixelsCount = imageData.data.reduce(
        (count, value, index) => {
          if (index % 4 === 3 && value === 0) count++; // Check alpha channel for transparency
          return count;
        },
        0
      );

      scratchedPixelsRef.current = scratchedPixelsCount;

      // If more than 30% of the area is scratched, trigger the completion callback
      if (scratchedPixelsCount / totalPixels > 0.3) {
        onScratchComplete();
      }
    }
  };

  // Prevent default behavior for touchmove events to avoid scrolling
  const preventDefault = (e: Event) => e.preventDefault();

  return (
    <Card
      className="w-full relative overflow-hidden bg-gray-300"
      style={{ aspectRatio: "2 / 1" }}
    >
      {/* Text to display when the scratch is complete */}
      <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-700">
        {message}
      </div>

      {/* Scratchable canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={() => {
          canvasRef.current?.addEventListener(
            "mousemove",
            handleScratch as unknown as (e: MouseEvent) => void
          );
          document.addEventListener("touchmove", preventDefault, {
            passive: false,
          });
        }}
        onMouseUp={() => {
          canvasRef.current?.removeEventListener(
            "mousemove",
            handleScratch as unknown as (e: MouseEvent) => void
          );
          document.removeEventListener("touchmove", preventDefault);
        }}
        onMouseLeave={() => {
          canvasRef.current?.removeEventListener(
            "mousemove",
            handleScratch as unknown as (e: MouseEvent) => void
          );
          document.removeEventListener("touchmove", preventDefault);
        }}
        onTouchStart={() => {
          canvasRef.current?.addEventListener(
            "touchmove",
            handleScratch as unknown as (e: TouchEvent) => void
          );
          document.addEventListener("touchmove", preventDefault, {
            passive: false,
          });
        }}
        onTouchEnd={() => {
          canvasRef.current?.removeEventListener(
            "touchmove",
            handleScratch as unknown as (e: TouchEvent) => void
          );
          document.removeEventListener("touchmove", preventDefault);
        }}
        className="absolute inset-0 w-full h-full cursor-pointer"
      />

      {/* Shine canvas layer */}
      <canvas
        ref={shineCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </Card>
  );
}
